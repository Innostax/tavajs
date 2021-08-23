import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Auth0Provider } from './react-spa'

const {
	REACT_APP_AUTH0_DOMAIN,
	REACT_APP_AUTH0_CLIENT_ID,
	// REACT_APP_AUTH0_AUDIENCE,
} = process.env
ReactDOM.render(
	<React.StrictMode>
			<Auth0Provider
				domain={REACT_APP_AUTH0_DOMAIN}
				client_id={REACT_APP_AUTH0_CLIENT_ID}
				redirect_uri={window.location.origin}
				// audience={REACT_APP_AUTH0_AUDIENCE}
			>
				<App />
			</Auth0Provider>
	</React.StrictMode>,
	document.getElementById('root')
)
