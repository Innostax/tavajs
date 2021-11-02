<% if(!isOkta){%>
import React<% if(isAuth0){%>,{ useEffect }<%}%> from "react";
import "./App.css";
import NavBar from "./widgets/NavBar";
<% if(isAuth0){%>import { useAuth0 } from './react-spa'<%}%>
const App = () => {
  
  <% if(isAuth0){%> const { loginWithRedirect,isUserAuthenticated } = useAuth0()
  useEffect(() => {
 if (isUserAuthenticated === false) {
 loginWithRedirect({ appState: { target: window.location.pathname } })
   }
}, [isUserAuthenticated, loginWithRedirect]) <%}%>
  return (
    <>
            { <% if(isAuth0) {%>isUserAuthenticated&&<%}%>(<NavBar/>)}
    </>
  );
};

export default App;
<%}%>
<% if(isOkta){%>  
	import React, { Component } from 'react'
	import { BrowserRouter as Router, Route } from 'react-router-dom'
	import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react'
	
	import './App.css'
	import Routes from './Routes'
	import Login from './Screens/auth/Login'
	

function onAuthRequired({ history }) {
	history.push('/login')
}

class App extends Component {
	render() {
		return (
			<Router>
				<Security
					issuer='https://dev-88623998.okta.com/oauth2/default'
					client_id='0oa29ztpc9t8uawED5d7'
					redirect_uri={window.location.origin + '/implicit/callback'}
					onAuthRequired={onAuthRequired}
				>
					<div className='App'>
						<div className=''>
							<Routes />
							<Route
								path='/login'
								render={() => <Login baseUrl='https://dev-88623998.okta.com' />}
							/>
							<Route path='/implicit/callback' component={ImplicitCallback} />
						</div>
					</div>
				</Security>
			</Router>
		)
	}
}

export default App
 <%}%>