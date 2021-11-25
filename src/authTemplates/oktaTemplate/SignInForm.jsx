import React, { useState } from 'react'
import { useOktaAuth } from '@okta/okta-react'

const SignInForm = () => {
	const { oktaAuth } = useOktaAuth()
	const [sessionToken, setSessionToken] = useState()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()

		oktaAuth
			.signInWithCredentials({ username, password })
			.then((res) => {
				const sessionToken = res.sessionToken
				setSessionToken(sessionToken)
				// sessionToken is a one-use token, so make sure this is only called once
				oktaAuth.signInWithRedirect({ sessionToken })
			})
			.catch((err) => console.log('Found an error', err))
	}

	const handleUsernameChange = (e) => {
		setUsername(e.target.value)
	}

	const handlePasswordChange = (e) => {
		setPassword(e.target.value)
	}

	if (sessionToken) {
		return null
	}

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Username:
				<input
					id='username'
					type='text'
					value={username}
					onChange={handleUsernameChange}
				/>
			</label>
			<label>
				Password:
				<input
					id='password'
					type='password'
					value={password}
					onChange={handlePasswordChange}
				/>
			</label>
			<input id='submit' type='submit' value='Submit' />
		</form>
	)
}
export default SignInForm
