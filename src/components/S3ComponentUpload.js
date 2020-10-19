import React from 'react';
import uuid from 'uuid/dist/v4';
import { Storage } from 'aws-amplify';
import axios from 'axios';

export default function S3ComponentUpload({ signedIn }) {
  // const [filename, setFilename] = React.useState(undefined);
  // const [s3data, setS3Data] = React.useState('');

  // React.useEffect(() => {
  //   (async function () {
  //     try {
  //       const respOne = await axios.get(
  //         'http://localhost:4000/s3-component-url',
  //       );
  //       const respTwo = await axios.get(respOne.data);
  //       setS3Data(respTwo.data);
  //       console.log(respTwo.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, []);
  //   async function updateComponents(avatar) {
  //     try {
  //       const token = signedIn.signInUserSession.idToken.jwtToken;
  //       const resp = await axios.put("http://localhost:4000/upload-component", {
  //         token,
  //         avatar,
  //       });
  //       console.log("SUCCESS UPLOAD", resp);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  // function onClick() {
  //   // const file = e.target.files[0];
  //   const myUuid = uuid();
  //   Storage.put(`${signedIn.username}/components/${myUuid}.js`, filename, {
  //     contentType: 'text/javascript',
  //   })
  //     .then((result) => {
  //       console.log(result);
  //       // updateProfilePic(result.key);
  //     })
  //     .catch((err) => console.log(err));
  // }

  // function onChange(e) {
  //   console.log(e.target.files[0]);
  //   setFilename(e.target.files[0]);
  // }

  async function uploadComponent(e) {
    try {
      e.preventDefault();
      // console.log(e.target.elements.files);
      // console.log(e.target.elements.mainFile.files[0]);
      const title = e.target.elements.title.value;
      const mainFile = e.target.elements.mainFile.files[0];
      const screenshot = e.target.elements.screenshot.files[0];
      const readMe = e.target.elements.readMe.value;

      if (title && mainFile && screenshot && readMe) {
        const componentUuid = uuid();
        const mainFileUrl = await Storage.put(
          `${signedIn.username}/components/${componentUuid}/${title}.js`,
          mainFile,
          {
            contentType: 'text/javascript',
          },
        );
        const screenshotUrl = await Storage.put(
          `${signedIn.username}/components/${componentUuid}/${title}.png`,
          screenshot,
          {
            contentType: 'image/png',
          },
        );
        const readMeUrl = await Storage.put(
          `${signedIn.username}/components/${componentUuid}/${title}.txt`,
          readMe,
          {
            contentType: 'text/plain',
          },
        );
        const resp = await axios.post(
          'http://localhost:4000/create-component',
          {
            componentUuid,
            title,
            token: signedIn.signInUserSession.idToken.jwtToken,
            mainFileUrl,
            readMeUrl,
            screenshotUrl,
          },
        );
        console.log(resp);
        window.alert('Successful upload! WOHOOO!!');
      } else {
        window.alert('WOOOOPS!! You are missing a required field!!!');
        //one of the fields was undefined
      }

      //get all form data
      //check if all form data was entered
      //enter data into s3
      //enter result data in sql table
    } catch (error) {
      console.log(error);
    }
  }

  //add onsubmit to form
  //add to sql table
  return (
    <>
      <form onSubmit={(e) => uploadComponent(e)}>
        <input type="text" id="title" />
        <input type="file" accept="text/javascript" id="mainFile" />

        {/* <button onClick={onClick}>Upload JS</button> */}
        {/* <pre>{s3data}</pre> */}
        <input type="file" accept="image/*" id="screenshot" />
        {/* <button onClick={onClick}>Upload ScreenShot</button> */}
        <textarea placeholder="Enter ReadMe content" id="readMe"></textarea>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
