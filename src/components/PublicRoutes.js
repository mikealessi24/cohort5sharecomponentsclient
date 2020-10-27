import React from "react";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ConfirmSignUp from "../pages/ConfirmSignUp";
import { Router } from "@reach/router";
import Landing from "../pages/Landing";
import NotFound from "../pages/NotFound";

export default function PublicRoutes({ setSignedIn }) {
  const [username, setUsername] = React.useState(undefined);
  const [password, setPassword] = React.useState(undefined);
  // const [openSnack, setOpenSnack] = React.useState(false);
  return (
    <Router>
      <SignIn setSignedIn={setSignedIn} path="/signin" />
      <SignUp
        setUsername={setUsername}
        setPassword={setPassword}
        path="/signup"
      />
      <ConfirmSignUp
        username={username}
        password={password}
        setSignedIn={setSignedIn}
        path="/confirm"
      />
      <Landing path="/" />
      <NotFound default />
    </Router>
  );
}
