import React from "react";
import { Router } from "@reach/router";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
// import Navbar from "./Navbar";
import Navbar2 from "./Navbar2";
import ViewUser from "../pages/ViewUser";

export default function PrivateRoutes({ signedIn, setSignedIn }) {
  console.log(signedIn);
  return (
    <>
      {/* <Navbar setSignedIn={setSignedIn} /> */}
      <Navbar2 setSignedIn={setSignedIn} />
      <Router>
        <Home path="/home" signedIn={signedIn} setSignedIn={setSignedIn} />
        <Profile path="/profile" signedIn={signedIn} />
        <ViewUser path="/viewuser/:creator" signedIn={signedIn} />
        <NotFound default />
      </Router>
    </>
  );
}
