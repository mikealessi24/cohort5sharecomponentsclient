import React from "react";
import S3ImageUpload from "../components/S3ImageUpload";
import axios from "axios";
import S3ComponentUpload from "../components/S3ComponentUpload";
import DisplayedComponent from "../components/DisplayedComponent";
import "../styles/viewUser.css";
import ModalUpload from "../components/ModalUpload";
import ProfileEdit from "../components/ProfileEdit";
import DisplayComponent from "../components/DisplayComponent";
import Navbar from "../components/Navbar";

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
        const response = await axios.post("http://localhost:4000/creator", {
          token,
          creator,
        });
        setCurrentUser(response.data);
        // console.log("this is the response", response);
        // console.log('current user log', currentUser);
        const avatar = await axios.post(
          "http://localhost:4000/get-creator-s3-pic",
          {
            token,
            creator,
          }
        );
        // console.log(avatar);
        setS3Url(avatar.data);

        const comps = await axios.post(
          "http://localhost:4000/get-creator-comps",
          {
            token,
            creator,
          }
        );
        setUserComps(comps.data);

        const following = await axios.post(
          "http://localhost:4000/get-followed-user",
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
      await axios.post("http://localhost:4000/follow-user", {
        followedUser: creator,
        token: signedIn.signInUserSession.idToken.jwtToken,
      });
      setIsFollowed(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function unfollowUser() {
    try {
      await axios.post("http://localhost:4000/delete-followed-user", {
        followedUser: creator,
        token: signedIn.signInUserSession.idToken.jwtToken,
      });
      setIsFollowed(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="user-container">
      <div className="user-left">
        <div className="user-img">
          <img width="80px" src={s3Url} alt="avatar" />
        </div>
        <h2>Name: {currentUser && currentUser.name}</h2>
        <h3>About: {currentUser && currentUser.about}</h3>
        <h3>Github: {currentUser && currentUser.githubLink}</h3>

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

      <div className="user-components-container">
        {userComps &&
          userComps.map((comp) => (
            <div className="user-component">
              <DisplayComponent component={comp} signedIn={signedIn} />
            </div>
          ))}
        {/* {userComps && <DisplayComponent component={userComps[2]} />} */}
      </div>
    </div>
  );
}
