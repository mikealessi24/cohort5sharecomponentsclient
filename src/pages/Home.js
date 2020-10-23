import React from "react";
import { Link } from "@reach/router";
import { Auth } from "aws-amplify";
import { navigate } from "@reach/router";
import axios from "axios";
import DisplayComponent from "../components/DisplayComponent";
import "../styles/newHome.css";
// import "../styles/navbar.css";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";

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
    <div className="home-container2">
      <div className="home-left2">
        <div className="profile-img2">
          <img width="80px" src={s3Url} alt="avatar" />
          <h2>{currentUser && currentUser.name}</h2>
        </div>

        <Navbar />
      </div>

      <div className="home-components-container2">
        {/* {store.getState()} */}
        {allComps &&
          allComps.map((comp) => (
            <DisplayComponent signedIn={signedIn} component={comp} />
          ))}
      </div>
      <div className="search">
        <SearchBar />
      </div>
    </div>
  );
}
