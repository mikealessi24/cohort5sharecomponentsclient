import React from 'react';
import { Link } from '@reach/router';
import { Auth } from 'aws-amplify';
import { navigate } from '@reach/router';
import axios from 'axios';
import DisplayComponent from '../components/DisplayComponent';
import '../styles/layout.css';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
// import ToggleTheme from "../components/ToggleTheme";

// import { useStore } from 'react-redux';

export default function Home({ signedIn, setSignedIn }) {
  console.log('home');
  //   const store = useStore();
  const [s3Url, setS3Url] = React.useState(undefined);
  const [currentUser, setCurrentUser] = React.useState(undefined);
  const [allComps, setAllComps] = React.useState(undefined);

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
        const comps = await axios.post(
          'https://adp34fqnm5.execute-api.us-east-1.amazonaws.com/dev/get-all-comps',
          {
            token,
          },
        );
        setAllComps(comps.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
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
        {allComps &&
          allComps.map((comp) => (
            <div className="display-component-container">
              <DisplayComponent signedIn={signedIn} component={comp} />
            </div>
          ))}
      </div>
      <div className="right">
        <SearchBar />
      </div>
    </div>
  );
}
