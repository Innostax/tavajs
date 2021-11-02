<% if(!isOkta){%>
import React from "react";
import { Route, Switch } from "react-router-dom";
import Users from "./Screens/Users";

export default function Routes() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/users" component={Users}></Route>
      </Switch>
    </div>
  );
}
<%}%>
<% if(isOkta){%>
  
  import React from 'react'
import Users from './Screens/Users'
import Home from './Screens/Home/Home'

import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react'

export default function Routes() {
	return (
		<div className=''>
			<SecureRoute path='/' exact={true} component={Home} />
			<SecureRoute path='/Users' exact={true} component={Users} />
		</div>
	)
}

  <%}%>