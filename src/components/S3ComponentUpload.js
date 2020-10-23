import React from "react";
import uuid from "uuid/dist/v4";
import { Storage } from "aws-amplify";
import axios from "axios";
import "../styles/component.css";

export default function S3ComponentUpload({ signedIn }) {
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
            contentType: "text/javascript",
          }
        );
        const screenshotUrl = await Storage.put(
          `${signedIn.username}/components/${componentUuid}/${title}.png`,
          screenshot,
          {
            contentType: "image/png",
          }
        );
        const readMeUrl = await Storage.put(
          `${signedIn.username}/components/${componentUuid}/${title}.txt`,
          readMe,
          {
            contentType: "text/plain",
          }
        );
        const resp = await axios.post(
          "http://localhost:4000/create-component",
          {
            componentUuid,
            title,
            token: signedIn.signInUserSession.idToken.jwtToken,
            mainFileUrl,
            readMeUrl,
            screenshotUrl,
          }
        );
        console.log(resp);
        window.alert("Successful upload! WOHOOO!!");
      } else {
        window.alert("WOOOOPS!! You are missing a required field!!!");
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
      <form className="modal-container" onSubmit={(e) => uploadComponent(e)}>
        <label>
          {" "}
          Title:
          <input type="text" id="title" />
        </label>
        <label for="mainFile">Upload JS File</label>
        <input
          type="file"
          accept="text/javascript"
          id="mainFile"
          name="mainFile"
          style={{ display: "none" }}
          className="jsinput"
        />

        {/* <button onClick={onClick}>Upload JS</button> */}
        {/* <pre>{s3data}</pre> */}
        <label for="screenshot">Upload Screenshot</label>
        <input
          type="file"
          accept="image/*"
          id="screenshot"
          name="screenshot"
          style={{ display: "none" }}
          className="inputfile"
        />
        {/* <button onClick={onClick}>Upload ScreenShot</button> */}
        <textarea placeholder="Enter ReadMe content" id="readMe"></textarea>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
