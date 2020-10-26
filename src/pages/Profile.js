import React from "react";
import S3ImageUpload from "../components/S3ImageUpload";
import axios from "axios";
import S3ComponentUpload from "../components/S3ComponentUpload";
import DisplayedComponent from "../components/DisplayedComponent";
import "../styles/profile.css";
import ModalUpload from "../components/ModalUpload";
import ProfileEdit from "../components/ProfileEdit";
import DisplayComponent from "../components/DisplayComponent";
import ModalUpdate from "../components/ModalUpdate";
import Navbar from "../components/Navbar";
import AddTag from "../components/AddTag";

import Paper from "@material-ui/core/Paper";

export default function Profile({ signedIn, setSignedIn }) {
  const [s3Url, setS3Url] = React.useState(undefined);
  const [currentUser, setCurrentUser] = React.useState(undefined);
  const [userComps, setUserComps] = React.useState(undefined);
  const [isExpanded, setIsExpanded] = React.useState(false);

  React.useEffect(() => {
    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const response = await axios.post("http://localhost:4000/user", {
          token,
        });
        setCurrentUser(response.data);
        // console.log("this is the response", response);
        // console.log('current user log', currentUser);
        const avatar = await axios.post("http://localhost:4000/get-s3-pic", {
          token,
        });
        console.log("the avatar:", avatar);
        setS3Url(avatar.data);
        console.log("avatar url", s3Url);

        getUserComps(token);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  console.log(userComps);

  async function getUserComps(token) {
    const comps = await axios.post("http://localhost:4000/get-user-comps", {
      token,
    });
    setUserComps(comps.data);
  }

  async function deleteComp(id) {
    try {
      await axios.post("http://localhost:4000/delete-component", {
        token: signedIn.signInUserSession.idToken.jwtToken,
        componentId: id,
      });
      getUserComps(signedIn.signInUserSession.idToken.jwtToken);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="profile-container">
      <div className="profile-left">
        <div className="profile-img">
          <img width="80px" src={s3Url} alt="avatar" />
        </div>
        <hr style={{ backgroundColor: "red" }} />
        <h2>Name: {currentUser && currentUser.name}</h2>
        <h3>About: {currentUser && currentUser.about}</h3>
        <h3>Github: {currentUser && currentUser.githubLink}</h3>
        <hr style={{ backgroundColor: "red" }} />
        <button onClick={() => setIsExpanded(true)}>Edit</button>
        {isExpanded ? (
          <div className="profile-edit-container">
            <ProfileEdit signedIn={signedIn} setIsExpanded={setIsExpanded} />
          </div>
        ) : (
          <Navbar setSignedIn={setSignedIn} />
        )}
      </div>
      <div className="profile-components-container">
        {userComps &&
          userComps.map((comp) => (
            <div className="display-component-container">
              <DisplayComponent component={comp} signedIn={signedIn} />
              <button onClick={() => deleteComp(comp.componentId)}>
                delete
              </button>
              <ModalUpdate component={comp} signedIn={signedIn} />
              <AddTag component={comp} signedIn={signedIn} />
            </div>
          ))}
        {/* {userComps && <DisplayComponent component={userComps[2]} />} */}
      </div>
      <div className="profile-right">
        <ModalUpload signedIn={signedIn} />
      </div>
    </div>
  );
}
