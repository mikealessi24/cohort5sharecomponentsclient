import React from "react";
import uuid from "uuid/dist/v4";
import { Storage } from "aws-amplify";
import axios from "axios";
import "../styles/component.css";
import SnackBarAlert from "../components/SnackBarAlert";

export default function S3ComponentUpload({ signedIn, setStatus, setOpen }) {
  const [jsFile, setJsFile] = React.useState(undefined);
  const [screenshot, setScreenshot] = React.useState(undefined);
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
          "https://adp34fqnm5.execute-api.us-east-1.amazonaws.com/dev/create-component",
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
        setStatus({ message: "Successfully Uploaded!", type: "success" });
        setOpen(false);
      } else {
        setStatus({
          message: "Error Upoloading, make sure all fields are defined",
          type: "error",
        });
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
        <label className="jsUpload" for="mainFile">
          {jsFile ? jsFile.name : "Upload a Javascript file"}
        </label>
        <input
          type="file"
          accept="text/javascript"
          id="mainFile"
          name="mainFile"
          style={{ display: "none" }}
          className="jsinput"
          onChange={(e) => {
            setJsFile(e.target.files[0]);
          }}
        />

        {/* <button onClick={onClick}>Upload JS</button> */}
        {/* <pre>{s3data}</pre> */}
        <label className="jsUpload" for="screenshot">
          {screenshot ? screenshot.name : "Upload a screenshot"}
        </label>
        <input
          type="file"
          accept="image/*"
          id="screenshot"
          name="screenshot"
          style={{ display: "none" }}
          className="inputfile"
          onChange={(e) => {
            setScreenshot(e.target.files[0]);
          }}
        />
        {/* <button onClick={onClick}>Upload ScreenShot</button> */}
        <textarea placeholder="Enter ReadMe content" id="readMe"></textarea>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
