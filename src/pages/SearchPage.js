import React from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import '../styles/layout.css';
import DisplayComponent from '../components/DisplayComponent';

export default function SearchPage({ search, signedIn, setSignedIn }) {
  const [searchComps, setSearchComps] = React.useState([]);
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
        setS3Url(avatar.data);
        const results = await axios.post(
          'https://adp34fqnm5.execute-api.us-east-1.amazonaws.com/dev/search',
          {
            token,
            search,
          },
        );
        setSearchComps(results.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [search]);
  console.log('search comps', searchComps);

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
        {searchComps[0] ? (
          searchComps.map((comp) => (
            <div className="display-component-container">
              <DisplayComponent signedIn={signedIn} component={comp} />
            </div>
          ))
        ) : (
          <div>Sorry, none found</div>
        )}
      </div>
      <div className="right">
        <SearchBar />
      </div>
    </div>
  );
}
