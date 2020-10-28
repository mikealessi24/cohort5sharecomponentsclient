import React from "react";
import uuid from "uuid/dist/v4";
import { Storage } from "aws-amplify";
import axios from "axios";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { Tooltip } from "@material-ui/core";
import "../styles/component.css";

export default function S3ImageUpload({ signedIn }) {
  const [filename, setFilename] = React.useState(undefined);
  async function updateProfilePic(avatar) {
    try {
      const token = signedIn.signInUserSession.idToken.jwtToken;
      const resp = await axios.put("http://localhost:4000/update-pic", {
        token,
        avatar,
      });
      console.log("SUCCESS UPLOAD", resp);
    } catch (error) {
      console.log(error);
    }
  }

  function onClick() {
    // const file = e.target.files[0];
    const myUuid = uuid();
    console.log(filename);
    Storage.put(`${signedIn.username}/avatar/${myUuid}.png`, filename, {
      contentType: "image/png",
    })
      .then((result) => {
        console.log(result);
        updateProfilePic(result.key);
        window.alert("updated pic");
      })
      .catch((err) => console.log(err));
  }

  function onChange(e) {
    console.log("in on change", e.target.files[0]);
    setFilename(e.target.files[0]);
  }

  return (
    <div
      style={{ width: "80%", display: "flex", justifyContent: "space-evenly" }}
    >
      <label className="jsUpload" for="image">
        {filename ? filename.name : "Choose Avatar"}
      </label>
      <input
        style={{ display: "none" }}
        id="image"
        name="image"
        type="file"
        accept="image/png"
        onChange={(evt) => onChange(evt)}
      />
      <Tooltip title="Upload Image" placement="top-end">
        <AddAPhotoIcon
          className="jsUpload"
          onClick={() => onClick()}
        ></AddAPhotoIcon>
      </Tooltip>
    </div>
  );
}
