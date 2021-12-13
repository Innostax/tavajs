import React from 'react'
import { Route, useHistory } from 'react-router-dom'
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react'
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js'
import Home from './Home'
import SignIn from './SignIn'

const AppWithRouterAccess = () => {
	const history = useHistory()
	const onAuthRequired = () => {
		history.push('/login')
	}
	console.log('enviorment ', process.env)
	const clientId = process.env.REACT_APP_OKTA_CLIENT_ID
	const issuer = process.env.REACT_APP_OKTA_ISSUER
	if (!clientId || !issuer) {
		throw new Error('All environment variables must be set')
	}
	const locationOrigin = window.location.origin
	const oktaAuth = new OktaAuth({
		issuer,
		clientId,
		redirectUri: locationOrigin + '/login/callback',
		onAuthRequired: onAuthRequired,
		pkce: true,
	})

	const restoreOriginalUri = async (_oktaAuth, originalUri) => {
		history.replace(toRelativeUrl(originalUri || '/', window.location.origin))
	}

	return (
		<Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
			<SecureRoute path='/' component={Home} />
			<Route path='/login' render={() => <SignIn />} />
			<Route path='/login/callback' component={LoginCallback} />
		</Security>
	)
}
export default AppWithRouterAccess
