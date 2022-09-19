import React from "react";
import { useHistory } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import Button from "../components/atoms/Button";

const Home = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const history = useHistory();

  if (!authState) {
    return <div>Loading...</div>;
  }

	const button = authState.isAuthenticated ? (
    <Button
      onClick={() => {
        oktaAuth.signOut();
      }}
      variant="white"
      name="Logout"
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
