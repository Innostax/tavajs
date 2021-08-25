import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Security } from '@okta/okta-react';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

function onAuthRequired({ history }) {
  history.push('/login');
}
const {
    REACT_APP_OKTA_ISSUER,
    REACT_APP_OKTA_CLIENT_ID
} = process.env

ReactDOM.render(
  <Router>
    <Security
      issuer={REACT_APP_OKTA_ISSUER}
      client_id={REACT_APP_OKTA_CLIENT_ID}
      redirect_uri={window.location.origin + '/implicit/callback'}
      onAuthRequired={onAuthRequired}
    >
      <App />
    </Security>
  </Router>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();