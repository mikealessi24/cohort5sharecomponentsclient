import React from "react";
import axios from "axios";
import "../styles/component.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { navigate } from "@reach/router";
import SnackBarAlert from "../components/SnackBarAlert";
import CodeIcon from "@material-ui/icons/Code";
import BookOutlinedIcon from "@material-ui/icons/BookOutlined";
import AddShoppingCartOutlinedIcon from "@material-ui/icons/AddShoppingCartOutlined";
import Tooltip from "@material-ui/core/Tooltip";

export default function DisplayComponent({ component, signedIn }) {
  const [screenshotUrl, setScreenshotUrl] = React.useState(undefined);
  const [jsFile, setJsFile] = React.useState(undefined);
  const [textFile, setTextFile] = React.useState(undefined);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [tags, setTags] = React.useState([]);
  const [status, setStatus] = React.useState(undefined);

  React.useEffect(() => {
    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const path = component.screenshot;
        const resultUrl = await axios.post(
          "https://adp34fqnm5.execute-api.us-east-1.amazonaws.com/dev/get-s3-component-screenshot2",
          {
            path,
          }
        );
        setScreenshotUrl(resultUrl.data);

        const result = await axios.post(
          "https://adp34fqnm5.execute-api.us-east-1.amazonaws.com/dev/get-component-tags",
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
          "https://adp34fqnm5.execute-api.us-east-1.amazonaws.com/dev/get-s3-component-js2",
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
          "https://adp34fqnm5.execute-api.us-east-1.amazonaws.com/dev/get-s3-component-readme2",
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
    <div className="component-main">
      {status ? <SnackBarAlert status={status} setStatus={setStatus} /> : null}
      <h3>{component.title}</h3>
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
        <Tooltip title="Show Source" placement="top">
          <CodeIcon
            style={{ fontSize: "40px" }}
            className="view-source-code"
            onClick={() => getSource()}
          ></CodeIcon>
        </Tooltip>
        {"  "}
        <Tooltip title="Read Me" placement="top">
          <BookOutlinedIcon
            style={{ fontSize: "40px" }}
            className="view-read-me"
            onClick={() => getReadMe()}
          ></BookOutlinedIcon>
        </Tooltip>
        {"  "}
        {jsFile && (
          <Tooltip title="Kopy File" placement="top">
            <CopyToClipboard text={jsFile}>
              <AddShoppingCartOutlinedIcon
                style={{ fontSize: "40px" }}
                className="file-copy"
                onClick={() => window.alert("Code was copied!")}
                disabled={!isExpanded}
              ></AddShoppingCartOutlinedIcon>
            </CopyToClipboard>
          </Tooltip>
        )}
      </div>

      {jsFile && <pre style={{ textAlign: "left" }}>{jsFile}</pre>}
      {textFile && <pre className="readme-container">{textFile}</pre>}
      <div className="tag-container">
        {tags.map((tag) => (
          <div
            className="specific-tag"
            onClick={() => navigate(`/tag/${tag.attribute}`)}
          >
            {"#" + tag.attribute}
          </div>
        ))}
      </div>
    </div>
  );
}
