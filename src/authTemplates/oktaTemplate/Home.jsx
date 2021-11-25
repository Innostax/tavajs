import React from 'react'
import { useHistory } from 'react-router-dom'
import { useOktaAuth } from '@okta/okta-react'
import NavBar from '../components/organisms/NavBar'
const Home = () => {
	const { authState, oktaAuth } = useOktaAuth()
	const history = useHistory()

	const button = authState ? (
		authState.isAuthenticated ? (
			<button
				onClick={() => {
					oktaAuth.signOut()
				}}
			>
				Logout
			</button>
		) : (
			<button
				onClick={() => {
					history.push('/login')
				}}
			>
				Login
			</button>
		)
	) : (
		<div>Loading...</div>
	)

	return (
		<div>
			{
				<NavBar
					brand='Made in India'
					links={[
						{ href: '/home', label: 'Home' },
						{ href: '/users', label: 'Users' },
					]}
					oktaLoginButton={button}
				/>
			}
			
		</div>
	)
}
export default Home
