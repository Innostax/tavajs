import React, { useState, useEffect, useContext } from 'react'
import createAuth0Client from '@auth0/auth0-spa-js'

const DEFAULT_REDIRECT_CALLBACK = () =>
	window.history.replaceState({}, document.title, window.location.pathname)

export const Auth0Context = React.createContext()
export const useAuth0 = () => useContext(Auth0Context)

export const Auth0Provider = ({
	children,
	onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
	...initOptions
}) => {
	const [auth0Client, setAuth0] = useState()

	useEffect(() => {
		const initAuth0 = async () => {
			/* isTestAuthenticated:
			 *	Condition checks for a testing JWT access token from local storage.
			 *	This would be set by Cypress.
			 */
			const isTestAuthenticated = !!localStorage.getItem('testJwtToken')
			if (isTestAuthenticated) {
				initOptions.issuer = localStorage.getItem('testJwtIss')
				initOptions.audience = localStorage.getItem('testJwtAud')
				initOptions.client_id = localStorage.getItem('testJwdClientId')
			}
			const auth0FromHook = await createAuth0Client(initOptions)
			setAuth0(auth0FromHook)
			if (
				window.location.search.includes('code=') &&
				window.location.search.includes('state=')
			) {
				const { appState } = await auth0FromHook.handleRedirectCallback()
				onRedirectCallback(appState)
			}

			const isAuthenticated =
				(await auth0FromHook.isAuthenticated()) || isTestAuthenticated
			// dispatch(setIsAuthenticated(isAuthenticated))
			if (isAuthenticated) {
				let token, user
				/* Check if this is a test environment and override typical auth0 token with the Cypress one. */
				if (isTestAuthenticated) {
					user = auth0FromHook._verifyIdToken(
						localStorage.getItem('testJwtIdToken')
					).user
					token = localStorage.getItem('testJwtToken')
				} else {
					user = await auth0FromHook.getUser()
					token = await auth0FromHook.getTokenSilently()
                    console.log(user,token)
				}
			}
		}
		initAuth0()
		// eslint-disable-next-line
	}, [])

	const handleRedirectCallback = async () => {
		await auth0Client.handleRedirectCallback()
	}

	return (
		<Auth0Context.Provider
			value={{    
				handleRedirectCallback,
				getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
				loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
				getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
				getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
				logout: (...p) => auth0Client.logout(...p),
			}}
		>
			{children}
		</Auth0Context.Provider>
	)
}