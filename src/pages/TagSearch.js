import React from 'react';
import axios from 'axios';
import DisplayComponent from '../components/DisplayComponent';

export default function TagSearch({ tag, signedIn }) {
  const [taggedComps, setTaggedComps] = React.useState([]);

  React.useEffect(() => {
    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const result = await axios.post(
          'http://localhost:4000/get-components-by-tags',
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
    <div>
      {taggedComps &&
        taggedComps.map((component) => (
          <DisplayComponent component={component} signedIn={signedIn} />
        ))}
    </div>
  );
}
