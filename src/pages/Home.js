import React from "react";
import { Link } from "@reach/router";
import { Auth } from "aws-amplify";
import { navigate } from "@reach/router";
import axios from "axios";
import DisplayComponent from "../components/DisplayComponent";
import "../styles/home.css";
// import "../styles/navbar.css";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
// import ToggleTheme from "../components/ToggleTheme";

// import { useStore } from 'react-redux';

export default function Home({ signedIn, setSignedIn }) {
  console.log("home");
  //   const store = useStore();
  const [s3Url, setS3Url] = React.useState(undefined);
  const [currentUser, setCurrentUser] = React.useState(undefined);
  const [allComps, setAllComps] = React.useState(undefined);

  React.useEffect(() => {
    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const response = await axios.post("http://localhost:4000/user", {
          token,
        });
        setCurrentUser(response.data);
        console.log("this is the response", response);
        console.log("current user log", currentUser);
        const avatar = await axios.post("http://localhost:4000/get-s3-pic", {
          token,
        });
        console.log(avatar);
        setS3Url(avatar.data);
        const comps = await axios.post("http://localhost:4000/get-all-comps", {
          token,
        });
        setAllComps(comps.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div className="home-container">
      <div className="home-left">
        <div className="profile-img">
          <img width="80px" src={s3Url} alt="avatar" />
        </div>
        <h2>Name</h2>
        <div className="profile-navs">
          <Navbar />
        </div>
      </div>

      <div className="home-components-container">
        {/* {store.getState()} */}
        {allComps &&
          allComps.map((comp) => <DisplayComponent component={comp} />)}
      </div>
      <div className="home-right">
        <SearchBar />
      </div>
    </div>
  );
}
