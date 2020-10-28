import React from "react";
import uuid from "uuid/dist/v4";
import { Storage } from "aws-amplify";
import axios from "axios";
import "../styles/component.css";

export default function S3ComponentUpdater({
  signedIn,
  component,
  setStatus,
  setOpen,
}) {
  async function updateComp(e) {
    try {
      e.preventDefault();
      const componentUuid = component.componentUuid;
      // console.log(e.target.elements.files);
      // console.log(e.target.elements.mainFile.files[0]);
      let title;
      if (e.target.elements.title.value) {
        title = e.target.elements.title.value;
      } else {
        title = component.title;
      }
      const mainFile = e.target.elements.mainFile.files[0];
      const screenshot = e.target.elements.screenshot.files[0];
      const readMe = e.target.elements.readMe.value;
      let mainFileUrl;
      let screenshotUrl;
      let readMeUrl;
      if (mainFile) {
        const componentUuid = uuid();
        const foo = await Storage.put(
          `${signedIn.username}/components/${componentUuid}/${title}.js`,
          mainFile,
          {
            contentType: "text/javascript",
          }
        );
        mainFileUrl = foo.key;
      } else {
        mainFileUrl = component.mainFile;
      }
      if (screenshot) {
        const foo = await Storage.put(
          `${signedIn.username}/components/${componentUuid}/${title}.png`,
          screenshot,
          {
            contentType: "image/png",
          }
        );
        screenshotUrl = foo.key;
      } else {
        screenshotUrl = component.screenshot;
      }
      if (readMe) {
        const foo = await Storage.put(
          `${signedIn.username}/components/${componentUuid}/${title}.txt`,
          readMe,
          {
            contentType: "text/plain",
          }
        );
        readMeUrl = foo.key;
      } else {
        readMeUrl = component.readMe;
      }

      const resp = await axios.post("http://localhost:4000/update-component", {
        componentUuid,
        title,
        token: signedIn.signInUserSession.idToken.jwtToken,
        mainFileUrl,
        readMeUrl,
        screenshotUrl,
      });
      console.log(resp);
      setStatus({
        message: "Successfully Updated Component!",
        type: "success",
      });
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  //add onsubmit to form
  //add to sql table
  return (
    <>
      <form className="modal-container" onSubmit={(e) => updateComp(e)}>
        <input type="text" id="title" />
        <label className="jsUpload" for="mainFile">
          Upload JS File
        </label>
        <input
          type="file"
          accept="text/javascript"
          id="mainFile"
          name="mainFile"
          style={{ display: "none" }}
        />

        {/* <button onClick={onClick}>Upload JS</button> */}
        {/* <pre>{s3data}</pre> */}
        <label className="screenshotUpload" for="screenshot">
          Upload Screenshot
        </label>
        <input
          type="file"
          accept="image/*"
          id="screenshot"
          name="screenshot"
          style={{ display: "none" }}
        />
        {/* <button onClick={onClick}>Upload ScreenShot</button> */}
        <textarea placeholder="Enter ReadMe content" id="readMe"></textarea>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
