import React ,{useEffect} from 'react'
import './App.css'
import { useAuth0 } from &#39;./react-spa&#39;

const App = () => {
  const { loginWithRedirect,isUserAuthenticated } = useAuth0()
         useEffect(() =&gt; {
        if (isUserAuthenticated === false) {
        loginWithRedirect({ appState: { target: window.location.pathname } })
          }
       }, [isUserAuthenticated, loginWithRedirect])
  
	return (
		<>
			{ isUserAuthenticated&amp;&amp;(<p>MADE IN INDIA</p>
			)}
		</>
	)
}

export default App
