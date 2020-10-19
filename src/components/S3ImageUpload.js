import React from 'react';
import uuid from 'uuid/dist/v4';
import { Storage } from 'aws-amplify';
import axios from 'axios';

export default function S3ImageUpload({ signedIn }) {
  const [filename, setFilename] = React.useState(undefined);
  async function updateProfilePic(avatar) {
    try {
      const token = signedIn.signInUserSession.idToken.jwtToken;
      const resp = await axios.put('http://localhost:4000/update-pic', {
        token,
        avatar,
      });
      console.log('SUCCESS UPLOAD', resp);
    } catch (error) {
      console.log(error);
    }
  }

  function onClick() {
    // const file = e.target.files[0];
    const myUuid = uuid();
    Storage.put(`${signedIn.username}/avatar/${myUuid}.png`, filename, {
      contentType: 'image/png',
    })
      .then((result) => {
        console.log(result);
        updateProfilePic(result.key);
      })
      .catch((err) => console.log(err));
  }

  function onChange(e) {
    setFilename(e.target.files[0]);
  }

  return (
    <>
      <input type="file" accept="image/png" onChange={(evt) => onChange(evt)} />
      <button onClick={onClick}>Upload</button>
    </>
  );
}
