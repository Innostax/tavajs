import React from 'react'
import { Redirect } from 'react-router-dom'
import SignInForm from './SignInForm'
import { useOktaAuth } from '@okta/okta-react'

const SignIn = () => {
	const { authState } = useOktaAuth()

	return authState ? (
		authState.isAuthenticated ? (
			<Redirect to={{ pathname: '/' }} />
		) : (
			<SignInForm />
		)
	) : (
		<div>Loading...</div>
	)
}

export default SignIn
