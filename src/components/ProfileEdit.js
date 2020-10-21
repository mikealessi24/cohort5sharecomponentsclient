import React from "react";
import S3ImageUpload from "./S3ImageUpload";
import axios from "axios";

export default function ProfileEdit({ setIsExpanded, signedIn }) {
  async function updateProfile(e) {
    e.preventDefault();
    try {
      const name = e.target.elements.name.value;
      const aboutMe = e.target.elements.aboutMe.value;
      const resp = await axios.post("http://localhost:4000/update-user", {
        token: signedIn.signInUserSession.idToken.jwtToken,
        name,
        aboutMe,
      });
      console.log(resp);
      window.alert("succesfully update profile");
      setIsExpanded(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form onSubmit={(e) => updateProfile(e)}>
        <div>
          <label>Name: </label>
          <input type="text" id="name"></input>
        </div>
        <div>
          <label>About Me: </label>
          <textarea id="aboutMe"></textarea>
        </div>
        <S3ImageUpload signedIn={signedIn} />
        <div>
          <button type="submit">Save</button>
          <button onClick={() => setIsExpanded(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
