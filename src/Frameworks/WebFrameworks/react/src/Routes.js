import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Users from './screens/Users'

const Routes = () => {
	return (
		<div className='App'>
			<Switch>
				<Route exact path='/users' component={Users} />
			</Switch>
		</div>
	)
}

export default Routes;
