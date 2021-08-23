import React import { useAuth0 } from &#39;./react-spa&#39; from 'react'
import './App.css'
const { loginWithRedirect,isUserAuthenticated } = useAuth0()
         useEffect(() =&gt; {
        if (isUserAuthenticated === false) {
        loginWithRedirect({ appState: { target: window.location.pathname } })
          }
       }, [isUserAuthenticated, loginWithRedirect])

const App = () => {
  ,{useEffect}
  
	return (
		<>
			{ isUserAuthenticated&amp;&amp;(<p>MADE IN INDIA</p>
			)}
		</>
	)
}

export default App
