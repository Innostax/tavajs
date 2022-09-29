import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import cogAuth from './cognito-tmp';



const {
    IDENTITYPOOLID,
    REGION,
    IDENTITYPOOLREGION,
    USERPOOLID,
    USERPOOLWEBCLIENT,
} = process.env;


ReactDOM.render(
	<React.StrictMode>
			<cogAuth
				identityPoolId= {IDENTITYPOOLID}
                region= {REGION}
                identityPoolRegion={IDENTITYPOOLREGION}
                userPoolId= {USERPOOLID}
                userPoolWebClientId= {USERPOOLWEBCLIENT}
				redirect_uri={window.location.origin}
			>
				<App />
			</cogAuth>
	</React.StrictMode>,
	document.getElementById('root')
)



export default CognitoAuth
