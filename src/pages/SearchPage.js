import React from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import '../styles/searchPage.css';
import DisplayComponent from '../components/DisplayComponent';

export default function SearchPage({ search, signedIn, setSignedIn }) {
  const [searchComps, setSearchComps] = React.useState([]);
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
        setS3Url(avatar.data);
        const results = await axios.post('http://localhost:4000/search', {
          token,
          search,
        });
        setSearchComps(results.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [search]);
  console.log('search comps', searchComps);

  return (
    <div className="search-main">
      <div className="search-left">
        <div className="search-img">
          <img width="80px" src={s3Url} alt="avatar" />
          <h2>{currentUser && currentUser.name}</h2>
        </div>
        <hr style={{ backgroundColor: 'red' }} />
        <div>
          <Navbar setSignedIn={setSignedIn} />
        </div>
      </div>
      <div className="search-middle">
        {searchComps[0] ? (
          searchComps.map((comp) => (
            <DisplayComponent signedIn={signedIn} component={comp} />
          ))
        ) : (
          <div>Sorry, none found</div>
        )}
      </div>
      <div className="search-right">
        <SearchBar />
      </div>
    </div>
  );
}
