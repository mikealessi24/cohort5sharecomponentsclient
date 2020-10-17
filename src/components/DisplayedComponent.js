import React from 'react';
import axios from 'axios';
import '../styles/component.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function DisplayedComponent() {
  const [screenshotUrl, setScreenshotUrl] = React.useState(undefined);
  const [jsFile, setJsFile] = React.useState(undefined);
  const [textFile, setTextFile] = React.useState(undefined);
  const [isExpanded, setIsExpanded] = React.useState(false);

  React.useEffect(() => {
    (async function () {
      try {
        const resultUrl = await axios.post(
          'http://localhost:4000/get-s3-component-screenshot',
        );
        setScreenshotUrl(resultUrl.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  async function getSource() {
    try {
      if (jsFile) {
        setIsExpanded(false);
        setJsFile(undefined);
        //set width to 40%
      } else {
        const resultUrl = await axios.post(
          'http://localhost:4000/get-s3-component-js',
        );
        const fileContent = await axios.get(resultUrl.data);
        console.log('file content: ', fileContent);
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
          'http://localhost:4000/get-s3-component-readme',
        );
        const fileContent = await axios.get(resultUrl.data);
        console.log('file content: ', fileContent);
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
    <div className={isExpanded ? 'component-main-expanded' : 'component-main'}>
      <div>Test Component</div>
      <img src={screenshotUrl} alt="Our Hopeful Screenshot" width="100%" />
      <div className="component-buttons">
        <button onClick={() => getSource()}>Source Code</button>
        <button onClick={() => getReadMe()}>Read Me</button>
        <CopyToClipboard text={jsFile}>
          <button
            onClick={() => window.alert('Code was copied!')}
            disabled={!isExpanded}
          >
            Copy Source
          </button>
        </CopyToClipboard>
      </div>
      <pre className="code-container">{jsFile ? jsFile : <></>}</pre>
      <pre className="readme-container">{textFile ? textFile : <></>}</pre>
    </div>
  );
}
