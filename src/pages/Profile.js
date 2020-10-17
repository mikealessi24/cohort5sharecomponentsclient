import React from 'react';
import S3ImageUpload from '../components/S3ImageUpload';
import axios from 'axios';
import S3ComponentUpload from '../components/S3ComponentUpload';
import DisplayedComponent from '../components/DisplayedComponent';
import '../styles/profile.css';

export default function Profile({ signedIn }) {
  const [s3Url, setS3Url] = React.useState(undefined);
  const [currentUser, setCurrentUser] = React.useState(undefined);
  React.useEffect(() => {
    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const response = await axios.post('http://localhost:4000/user', {
          token,
        });
        setCurrentUser(response.data);
        console.log('this is the response', response);
        console.log('current user log', currentUser);
        const avatar = await axios.post('http://localhost:4000/get-s3-pic', {
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
    <div className="profile-container">
      <div className="profile-left">
        <img width="80px" src={s3Url} alt="avatar" />
        <S3ImageUpload signedIn={signedIn} />
        <h2>Name</h2>
        <h3>About</h3>
        <button>Edit</button>
      </div>
      <div className="profile-components-container">
        <DisplayedComponent />
        <DisplayedComponent />
        <DisplayedComponent />
        <DisplayedComponent />
      </div>
      <div className="profile-right">
        <S3ComponentUpload signedIn={signedIn} />
      </div>
    </div>
  );
}
