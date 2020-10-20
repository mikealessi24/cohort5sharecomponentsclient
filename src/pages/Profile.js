import React from 'react';
import S3ImageUpload from '../components/S3ImageUpload';
import axios from 'axios';
import S3ComponentUpload from '../components/S3ComponentUpload';
import DisplayedComponent from '../components/DisplayedComponent';
import '../styles/profile.css';
import ModalUpload from '../components/ModalUpload';
import ProfileEdit from '../components/ProfileEdit';
import DisplayComponent from '../components/DisplayComponent';

export default function Profile({ signedIn }) {
  const [s3Url, setS3Url] = React.useState(undefined);
  const [currentUser, setCurrentUser] = React.useState(undefined);
  const [userComps, setUserComps] = React.useState(undefined);
  const [isExpanded, setIsExpanded] = React.useState(false);

  React.useEffect(() => {
    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const response = await axios.post('http://localhost:4000/user', {
          token,
        });
        setCurrentUser(response.data);
        // console.log("this is the response", response);
        // console.log('current user log', currentUser);
        const avatar = await axios.post('http://localhost:4000/get-s3-pic', {
          token,
        });
        // console.log(avatar);
        setS3Url(avatar.data);

        const comps = await axios.post('http://localhost:4000/get-user-comps', {
          token,
        });
        setUserComps(comps.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  console.log(userComps);
  return (
    <div className="profile-container">
      <div className="profile-left">
        <img width="80px" src={s3Url} alt="avatar" />
        <h2>Name: {currentUser && currentUser.name}</h2>
        <h3>About: {currentUser && currentUser.about}</h3>
        <h3>Github: {currentUser && currentUser.githubLink}</h3>

        <button onClick={() => setIsExpanded(true)}>Edit</button>
        {isExpanded ? (
          <div className="profile-edit-container">
            <ProfileEdit signedIn={signedIn} setIsExpanded={setIsExpanded} />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="profile-components-container">
        {userComps && <DisplayComponent component={userComps[2]} />}
        <DisplayedComponent />
        <DisplayedComponent />
        <DisplayedComponent />
        <DisplayedComponent />
      </div>
      <div className="profile-right">
        <ModalUpload signedIn={signedIn} />
      </div>
    </div>
  );
}
