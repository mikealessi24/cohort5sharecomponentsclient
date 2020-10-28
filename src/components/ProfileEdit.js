import React from 'react';
import S3ImageUpload from './S3ImageUpload';
import axios from 'axios';
import '../styles/edit-form.css';
import SnackBarAlert from '../components/SnackBarAlert';

export default function ProfileEdit({ setIsExpanded, signedIn }) {
  const [status, setStatus] = React.useState(undefined);
  async function updateProfile(e) {
    e.preventDefault();
    try {
      const name = e.target.elements.name.value;
      const aboutMe = e.target.elements.aboutMe.value;
      const githubLink = e.target.elements.git.value;
      const resp = await axios.post(
        'https://adp34fqnm5.execute-api.us-east-1.amazonaws.com/dev/update-user',
        {
          token: signedIn.signInUserSession.idToken.jwtToken,
          name,
          aboutMe,
          githubLink,
        },
      );
      console.log(resp);
      setStatus({ message: 'Successfully Updated Profile!', type: 'success' });
      setIsExpanded(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {status ? <SnackBarAlert status={status} setStatus={setStatus} /> : null}
      <form className="edit-form" onSubmit={(e) => updateProfile(e)}>
        <div className="form-content">
          <div>
            <label>Name: </label>
            <input type="text" id="name"></input>
          </div>
          <div className="about-me-edit">
            <label>About: </label>
            <textarea id="aboutMe"></textarea>
          </div>
          <div>
            <label>Github:</label>
            <input type="text" id="git" />
          </div>
          <S3ImageUpload signedIn={signedIn} />
          <div>
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </div>
  );
}
