import React from "react";
import axios from "axios";
// import "../styles/component.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { navigate } from "@reach/router";

export default function DisplayedComponent({ component, signedIn }) {
  const [screenshotUrl, setScreenshotUrl] = React.useState(undefined);
  const [jsFile, setJsFile] = React.useState(undefined);
  const [textFile, setTextFile] = React.useState(undefined);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [tags, setTags] = React.useState([]);

  React.useEffect(() => {
    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const path = component.screenshot;
        const resultUrl = await axios.post(
          "http://localhost:4000/get-s3-component-screenshot2",
          {
            path,
          }
        );
        setScreenshotUrl(resultUrl.data);

        const result = await axios.post(
          "http://localhost:4000/get-component-tags",
          { token, componentId: component.componentId }
        );
        setTags(result.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  console.log(`component id: ${component.componentId}`, tags);
  async function getSource() {
    try {
      if (jsFile) {
        setIsExpanded(false);
        setJsFile(undefined);
        //set width to 40%
      } else {
        const resultUrl = await axios.post(
          "http://localhost:4000/get-s3-component-js2",
          { path: component.mainFile }
        );
        const fileContent = await axios.get(resultUrl.data);
        // console.log('file content: ', fileContent);
        setIsExpanded(true);
        //set width to 100%
        setTextFile(undefined);
        setJsFile(fileContent.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getReadMe() {
    try {
      if (textFile) {
        setTextFile(undefined);
        setIsExpanded(false);
        //set width to 40%
      } else {
        const resultUrl = await axios.post(
          "http://localhost:4000/get-s3-component-readme2",
          { path: component.readMe }
        );
        const fileContent = await axios.get(resultUrl.data);
        // console.log('file content: ', fileContent);
        setIsExpanded(true);
        //set width to 100%
        setJsFile(undefined);
        setTextFile(fileContent.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    // <div className="component-main">

    <div className="component-main">
      <div>{component.title}</div>
      <div
        className="creator-link"
        onClick={() => navigate(`/viewuser/${component.creator}`)}
      >
        {component.creator}
      </div>
      <div className="screenshot-cont">
        <img src={screenshotUrl} alt="Our Hopeful Screenshot" width="80%" />
      </div>

      <div className="component-buttons">
        <button onClick={() => getSource()}>Source Code</button>
        <button onClick={() => getReadMe()}>Read Me</button>
        <CopyToClipboard text={jsFile}>
          <button
            onClick={() => window.alert("Code was copied!")}
            disabled={!isExpanded}
          >
            Copy Source
          </button>
        </CopyToClipboard>
      </div>
      <div>
        {tags.map((tag) => (
          <div onClick={() => navigate(`/tag/${tag.attribute}`)}>
            {"#" + tag.attribute}
          </div>
        ))}
      </div>
      <pre className="code-container">{jsFile ? jsFile : <></>}</pre>
      <pre className="readme-container">{textFile ? textFile : <></>}</pre>
    </div>
  );
}
