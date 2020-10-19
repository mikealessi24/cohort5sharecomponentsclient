import React from "react";
import uuid from "uuid/dist/v4";
import { Storage } from "aws-amplify";
import axios from "axios";

export default function S3ComponentUpload({ signedIn }) {
  const [filename, setFilename] = React.useState(undefined);
  const [s3data, setS3Data] = React.useState("");

  React.useEffect(() => {
    (async function () {
      try {
        const respOne = await axios.get(
          "http://localhost:4000/s3-component-url"
        );
        const respTwo = await axios.get(respOne.data);
        setS3Data(respTwo.data);
        console.log(respTwo.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
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

  function onClick() {
    // const file = e.target.files[0];
    const myUuid = uuid();
    Storage.put(`${signedIn.username}/components/${myUuid}.js`, filename, {
      contentType: "text/javascript",
    })
      .then((result) => {
        console.log(result);
        // updateProfilePic(result.key);
      })
      .catch((err) => console.log(err));
  }

  function onChange(e) {
    setFilename(e.target.files[0]);
  }

  return (
    <>
      <form>
        <input type="text" />
        <input
          type="file"
          accept="text/javascript"
          onChange={(evt) => onChange(evt)}
        />

        {/* <button onClick={onClick}>Upload JS</button> */}
        {/* <pre>{s3data}</pre> */}
        <input type="file" accept="image/*" onChange={(evt) => onChange(evt)} />
        {/* <button onClick={onClick}>Upload ScreenShot</button> */}
        <textarea placeholder="Enter ReadMe content"></textarea>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
