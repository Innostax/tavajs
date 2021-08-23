import React,{useEffect} from 'react'
import './App.css'
import { useAuth0 } from './react-spa'

const App = () => {
	const { loginWithRedirect,isUserAuthenticated } = useAuth0()

	useEffect(() => {
		if (isUserAuthenticated === false) {
			loginWithRedirect({ appState: { target: window.location.pathname } })
		}
	}, [isUserAuthenticated, loginWithRedirect])

	return (
		<>
			{ isUserAuthenticated&&(<p>MADE IN INDIA</p>
			)}
		</>
	)
}

export default App