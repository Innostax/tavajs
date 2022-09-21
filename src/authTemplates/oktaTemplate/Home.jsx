import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import Button from "../components/atoms/Button";

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
    <Button
      onClick={() => {
        oktaAuth.signOut();
      }}
      variant="white"
      name={userInfo?.given_name + ' - Logout'}
    />
  ) : (
    <Button
      onClick={() => {
        history.push("/login");
      }}
      variant="white"
      name="Login"
    />
  );

  return <>{button}</>
};
export default Home;
