import React from "react";
import { Router } from "@reach/router";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
// import Navbar from "./Navbar";
// import Navbar2 from "./Navbar2";
import ViewUser from "../pages/ViewUser";
import SearchPage from "../pages/SearchPage";
import TagSearch from "../pages/TagSearch";

export default function PrivateRoutes({ signedIn, setSignedIn }) {
  console.log(signedIn);
  return (
    <>
      {/* <Navbar setSignedIn={setSignedIn} /> */}
      {/* <Navbar2 setSignedIn={setSignedIn} /> */}
      <Router>
        <Home path="/home" signedIn={signedIn} setSignedIn={setSignedIn} />
        <Profile
          path="/profile"
          signedIn={signedIn}
          setSignedIn={setSignedIn}
        />
        <ViewUser path="/viewuser/:creator" signedIn={signedIn} />
        <SearchPage path="/search/:search" signedIn={signedIn} />
        <TagSearch path="/tag/:tag" signedIn={signedIn} />
        <NotFound default />
      </Router>
    </>
  );
}
