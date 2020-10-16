import React from "react";
import axios from "axios";
import aws from "aws-sdk";

aws.config.setPromisesDependency();
aws.config.update({
  accessKeyId: "",
  secretAccessKey: "",
  region: "us-east-1",
});
const s3 = new aws.S3();

export default function DisplayedComponent() {
  const [screenshotUrl, setScreenshotUrl] = React.useState(undefined);
  const [jsFile, setJsFile] = React.useState(undefined);
  const [textFile, setTextFile] = React.useState(undefined);

  async function getFileContent(path) {
    // let resultUrl = undefined;
    const params = {
      Bucket: "cohortgroupbucket135153-cohortfive",
      Key: path,
      Expires: 30,
    };

    s3.getSignedUrlPromise("getObject", params)
      .then(async (url) => {
        console.log(url);
        const response = await axios.get(url);
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  }

  //   async function getFileContent(path) {
  //     const tempUrl = getUrl(path);

  //   }

  async function getSource() {
    const source = await getFileContent(
      "public/mike/components/TestComponent/recursion.js"
    );
    console.log(source);
    setJsFile(source);
  }

  async function getReadMe() {
    const readMe = await getFileContent(
      "public/mike/components/TestComponent/private.txt"
    );
    console.log(readMe);
    setTextFile(readMe);
  }

  React.useEffect(() => {
    (async function () {
      try {
        const screenshotPath =
          "public/mike/components/TestComponent/Itachi Uchiha.jpg";
        console.log("file path:", screenshotPath);
        setScreenshotUrl(getFileContent(screenshotPath));

        // const jsfilePath = "public/mike/components/TestComponent/recursion.js";
        // console.log("file path:", jsfilePath);
        // setJsFile(getUrl(jsfilePath));

        // const textPath = "public/mike/components/TestComponent/private.txt";
        // console.log("file path:", textPath);
        // setTextFile(getUrl(textPath));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div>
      <img src={screenshotUrl} alt="Our Hopeful Screenshot" />
      <button onClick={() => getSource()}>Source</button>
      <button onClick={() => getReadMe()}>Read Me</button>
    </div>
  );
}
