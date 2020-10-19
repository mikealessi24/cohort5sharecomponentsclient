import React from "react";
import { Router } from "@reach/router";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import Navbar from "./Navbar";

export default function PrivateRoutes({ signedIn, setSignedIn }) {
  console.log(signedIn);
  return (
    <>
      <Navbar setSignedIn={setSignedIn} />
      <Router>
        <Home path="/home" signedIn={signedIn} setSignedIn={setSignedIn} />
        <Profile path="/profile" signedIn={signedIn} />
        <NotFound default />
      </Router>
    </>
  );
}
