import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import Button from "../components/atoms/Button";
<% if (!isMaterialUI) { %>import Dropdown from 'react-bootstrap/Dropdown'; <% } %>

const Home = () => {
	const { authState, oktaAuth } = useOktaAuth();
	const [userInfo, setUserInfo] = useState(null);
	const history = useHistory();

	if (!authState) {
		return <div>Loading...</div>;
	}

	useEffect(() => {
		if (!authState || !authState.isAuthenticated) {
			// When user isn't authenticated, forget any user info
			setUserInfo(null)
		} else {
			setUserInfo(authState.idToken.claims)
			oktaAuth.getUser().then((info) => {
				setUserInfo(info)
			})
		}
	}, [authState, oktaAuth])

	const button = authState.isAuthenticated ? (
	<% if(!isMaterialUI) { %>
	<Dropdown>
			<Dropdown.Toggle variant='.me-2' id='dropdown-basic'>
				{userInfo?.name}
			</Dropdown.Toggle>
			<Dropdown.Menu>
				<Dropdown.Item href='#/action-1'>
					<Button
						onClick={() => {
							oktaAuth.signOut()
						}}
						variant='white'
						name='Logout'
					/>
				</Dropdown.Item>
			</Dropdown.Menu>
	</Dropdown>
	<% } %>
	<% if(isMaterialUI) { %>
	<Select value={age} onChange={handleChange} displayEmpty>
		<MenuItem value="">
			<em>{userInfo?.name}</em>
		</MenuItem>
		<MenuItem value={10}><Button onClick={() => { oktaAuth.signOut() }} variant='white' name='Logout' /></MenuItem>
	</Select>
	<% } %>
  ) : (
	<% if(!isMaterialUI) { %>
	<Dropdown>
			<Dropdown.Toggle variant='.me-2' id='dropdown-basic'>
				{userInfo?.name}
			</Dropdown.Toggle>
			<Dropdown.Menu>
				<Dropdown.Item href='#/action-1'>
					<Button
						onClick={() => {
							history.push('/login')
						}}
						variant='white'
						name='Login'
					/>
				</Dropdown.Item>
			</Dropdown.Menu>
	</Dropdown>
	<% } %>
	<% if(isMaterialUI) { %>
	<Select value={age} onChange={handleChange} displayEmpty>
	<MenuItem value="">
		<em>{userInfo?.name}</em>
	</MenuItem>
	<MenuItem value={10}><Button onClick={() => { oktaAuth.signOut() }} variant='white' name='Logout' /></MenuItem>
	</Select>
	<% } %>
  );

  return <>{button}</>
};
export default Home;
