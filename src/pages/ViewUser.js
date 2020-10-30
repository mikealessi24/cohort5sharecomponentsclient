import React from "react";
import S3ImageUpload from "../components/S3ImageUpload";
import axios from "axios";
import S3ComponentUpload from "../components/S3ComponentUpload";
import DisplayedComponent from "../components/DisplayedComponent";
import "../styles/layout.css";
import ModalUpload from "../components/ModalUpload";
import ProfileEdit from "../components/ProfileEdit";
import DisplayComponent from "../components/DisplayComponent";
import Navbar from "../components/Navbar";
import Tooltip from "@material-ui/core/Tooltip";
import GitHubIcon from "@material-ui/icons/GitHub";
import SearchBar from "../components/SearchBar";
// import ToggleTheme from "../components/ToggleTheme";
import Logo from "../assets/facebook_profile_image.png";

//add a follow button
//get rid of the right side of the page
//actually render the user's components - completed!!!
//

export default function ViewUser({ creator, signedIn }) {
  console.log("We got the creator", creator);
  const [s3Url, setS3Url] = React.useState(undefined);
  const [currentUser, setCurrentUser] = React.useState(undefined);
  const [userComps, setUserComps] = React.useState(undefined);
  const [isFollowed, setIsFollowed] = React.useState(undefined);
  //   const [isExpanded, setIsExpanded] = React.useState(false);

  React.useEffect(() => {
    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const response = await axios.post(
          "https://adp34fqnm5.execute-api.us-east-1.amazonaws.com/dev/creator",
          {
            token,
            creator,
          }
        );
        setCurrentUser(response.data);
        // console.log("this is the response", response);
        // console.log('current user log', currentUser);
        const avatar = await axios.post(
          "https://adp34fqnm5.execute-api.us-east-1.amazonaws.com/dev/get-creator-s3-pic",
          {
            token,
            creator,
          }
        );
        // console.log(avatar);
        setS3Url(avatar.data);

        const comps = await axios.post(
          "https://adp34fqnm5.execute-api.us-east-1.amazonaws.com/dev/get-creator-comps",
          {
            token,
            creator,
          }
        );
        setUserComps(comps.data);

        const following = await axios.post(
          "https://adp34fqnm5.execute-api.us-east-1.amazonaws.com/dev/get-followed-user",
          { token }
        );
        const followed = following.data.map((el) => el.followedUser);
        setIsFollowed(followed.includes(creator));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  console.log(userComps);

  async function followUser() {
    try {
      await axios.post(
        "https://adp34fqnm5.execute-api.us-east-1.amazonaws.com/dev/follow-user",
        {
          followedUser: creator,
          token: signedIn.signInUserSession.idToken.jwtToken,
        }
      );
      setIsFollowed(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function unfollowUser() {
    try {
      await axios.post(
        "https://adp34fqnm5.execute-api.us-east-1.amazonaws.com/dev/delete-followed-user",
        {
          followedUser: creator,
          token: signedIn.signInUserSession.idToken.jwtToken,
        }
      );
      setIsFollowed(false);
    } catch (error) {
      console.log(error);
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

        {!isFollowed ? (
          <button className="button follow-button" onClick={() => followUser()}>
            Follow {currentUser && currentUser.username}
          </button>
        ) : (
          <button
            className="button unfollow-button"
            onClick={() => unfollowUser()}
          >
            Unfollow User
          </button>
        )}

        {/* <button onClick={() => setIsExpanded(true)}>Edit</button>
        {isExpanded ? (
          <div className="profile-edit-container">
            <ProfileEdit signedIn={signedIn} setIsExpanded={setIsExpanded} />
          </div>
        ) : (
          <></>
        )} */}
        <Navbar />
      </div>

      <div className="middle">
        {userComps &&
          userComps.map((comp) => (
            <div className="display-component-container">
              <DisplayComponent component={comp} signedIn={signedIn} />
            </div>
          ))}
        {/* {userComps && <DisplayComponent component={userComps[2]} />} */}
      </div>
      <div className="right">
        <div style={{ position: "relative", top: "20px" }}>
          <SearchBar />
        </div>

        <img
          src={Logo}
          alt="logo"
          style={{ height: "200px", position: "relative", bottom: "20px" }}
        />
      </div>
    </div>
  );
}
