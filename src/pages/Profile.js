import React from "react";
import S3ImageUpload from "../components/S3ImageUpload";
import axios from "axios";
import S3ComponentUpload from "../components/S3ComponentUpload";
import DisplayedComponent from "../components/DisplayedComponent";
import "../styles/profile.css";
import "../styles/layout.css";
import ModalUpload from "../components/ModalUpload";
import ProfileEdit from "../components/ProfileEdit";
import DisplayComponent from "../components/DisplayComponent";
import ModalUpdate from "../components/ModalUpdate";
import Navbar from "../components/Navbar";
import AddTag from "../components/AddTag";
import SnackBarAlert from "../components/SnackBarAlert";
import Logo from "../assets/facebook_profile_image.png";

import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import GitHubIcon from "@material-ui/icons/GitHub";

export default function Profile({ signedIn, setSignedIn }) {
  const [s3Url, setS3Url] = React.useState(undefined);
  const [currentUser, setCurrentUser] = React.useState(undefined);
  const [userComps, setUserComps] = React.useState(undefined);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [status, setStatus] = React.useState(undefined);

  React.useEffect(() => {
    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const response = await axios.post(
          "https://adp34fqnm5.execute-api.us-east-1.amazonaws.com/dev/user",
          {
            token,
          }
        );
        setCurrentUser(response.data);
        // console.log("this is the response", response);
        // console.log('current user log', currentUser);
        const avatar = await axios.post(
          "https://adp34fqnm5.execute-api.us-east-1.amazonaws.com/dev/get-s3-pic",
          {
            token,
          }
        );
        console.log("the avatar:", avatar);
        setS3Url(avatar.data);

        getUserComps(token);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  console.log(userComps);
  console.log("avatar url", s3Url);

  async function getUserComps(token) {
    const comps = await axios.post(
      "https://adp34fqnm5.execute-api.us-east-1.amazonaws.com/dev/get-user-comps",
      {
        token,
      }
    );
    setUserComps(comps.data);
  }

  async function deleteComp(id) {
    const foo = window.confirm("Are you sure you want to delete this?");
    if (foo) {
      try {
        await axios.post(
          "https://adp34fqnm5.execute-api.us-east-1.amazonaws.com/dev/delete-component",
          {
            token: signedIn.signInUserSession.idToken.jwtToken,
            componentId: id,
          }
        );
        getUserComps(signedIn.signInUserSession.idToken.jwtToken);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="main">
      <div className="left">
        <div className="profile-img">
          <img width="80px" src={s3Url} alt="avatar" />
        </div>
        <hr style={{ backgroundColor: "red" }} />
        <div className="about-user">
          <h2>{currentUser && currentUser.name}</h2>
          <p>{currentUser && currentUser.about}</p>
          <Tooltip
            title={currentUser && currentUser.githubLink}
            placement="right"
          >
            <GitHubIcon
              style={{ fontSize: "50px" }}
              onClick={() => (window.location.href = currentUser.githubLink)}
            ></GitHubIcon>
          </Tooltip>
        </div>

        <hr style={{ backgroundColor: "red" }} />
        <Tooltip title="Edit Profile" placement="right">
          <EditOutlinedIcon
            style={{ fontSize: "50px" }}
            className="profile-edit-button"
            onClick={() => setIsExpanded(!isExpanded)}
          ></EditOutlinedIcon>
        </Tooltip>
        {isExpanded ? (
          <div className="profile-edit-container">
            <ProfileEdit signedIn={signedIn} setIsExpanded={setIsExpanded} />
          </div>
        ) : (
          <Navbar setSignedIn={setSignedIn} />
        )}
      </div>
      <div className="middle">
        {userComps &&
          userComps.map((comp) => (
            <div className="display-component-container">
              <DisplayComponent component={comp} signedIn={signedIn} />
              <AddTag component={comp} signedIn={signedIn} />
              <div className="display-component-edit-delete-btn">
                <Tooltip title="Delete" placement="left">
                  <DeleteOutlineOutlinedIcon
                    style={{ fontSize: "40px" }}
                    className="profile-delete-button"
                    onClick={() => deleteComp(comp.componentId)}
                  ></DeleteOutlineOutlinedIcon>
                </Tooltip>
                <ModalUpdate
                  component={comp}
                  signedIn={signedIn}
                  setStatus={setStatus}
                />
              </div>
            </div>
          ))}
        {/* {userComps && <DisplayComponent component={userComps[2]} />} */}
      </div>
      <div className="right">
        <div style={{ position: "relative", top: "20px" }}>
          <ModalUpload signedIn={signedIn} setStatus={setStatus} />
        </div>
        <img
          src={Logo}
          alt="logo"
          style={{ height: "200px", position: "relative", bottom: "20px" }}
        />
      </div>
      {status ? <SnackBarAlert status={status} setStatus={setStatus} /> : null}
    </div>
  );
}
