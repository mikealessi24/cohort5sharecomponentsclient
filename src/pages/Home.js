import React from "react";
import { Link } from "@reach/router";
import { Auth } from "aws-amplify";
import { navigate } from "@reach/router";
import axios from "axios";

// import { useStore } from 'react-redux';

export default function Home({ signedIn, setSignedIn }) {
  console.log("home");
  //   const store = useStore();
  const [s3Url, setS3Url] = React.useState(undefined);
  const [currentUser, setCurrentUser] = React.useState(undefined);
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
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div style={style.home}>
      {/* {store.getState()} */}
      <div className="profile-left">
        <img width="80px" src={s3Url} alt="avatar" />
        <h2>Name</h2>
      </div>
      <div>Content</div>
    </div>
  );
}
const style = {
  home: {
    display: "flex",
  },
};
