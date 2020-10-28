import React from 'react';
import axios from 'axios';
import DisplayComponent from '../components/DisplayComponent';
import Navbar from '../components/Navbar';
import '../styles/layout.css';

export default function TagSearch({ tag, signedIn, setSignedIn }) {
  const [taggedComps, setTaggedComps] = React.useState([]);
  const [s3Url, setS3Url] = React.useState(undefined);
  const [currentUser, setCurrentUser] = React.useState(undefined);

  React.useEffect(() => {
    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const response = await axios.post(
          'https://adp34fqnm5.execute-api.us-east-1.amazonaws.com/dev/user',
          {
            token,
          },
        );
        setCurrentUser(response.data);
        console.log('this is the response', response);
        console.log('current user log', currentUser);
        const avatar = await axios.post(
          'https://adp34fqnm5.execute-api.us-east-1.amazonaws.com/dev/get-s3-pic',
          {
            token,
          },
        );
        console.log(avatar);
        setS3Url(avatar.data);
        const result = await axios.post(
          'https://adp34fqnm5.execute-api.us-east-1.amazonaws.com/dev/get-components-by-tags',
          { tag, token },
        );
        setTaggedComps(result.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  console.log('these are the tags', taggedComps);

  return (
    <div className="main">
      <div className="left">
        <div className="profile-img">
          <img width="80px" src={s3Url} alt="avatar" />
          <h2>{currentUser && currentUser.name}</h2>
        </div>
        <hr style={{ backgroundColor: 'red' }} />
        <div>
          <Navbar setSignedIn={setSignedIn} />
        </div>
      </div>
      <div className="middle">
        {taggedComps &&
          taggedComps.map((component) => (
            <div className="display-component-container">
              <DisplayComponent component={component} signedIn={signedIn} />
            </div>
          ))}
      </div>
      <div className="right"></div>
    </div>
  );
}
