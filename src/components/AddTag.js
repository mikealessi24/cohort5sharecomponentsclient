import React from 'react';
import axios from 'axios';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import '../styles/component.css';

export default function AddTag({ signedIn, component }) {
  const [tag, setTag] = React.useState(undefined);

  async function tagAComponent() {
    try {
      const token = signedIn.signInUserSession.idToken.jwtToken;
      const componentId = component.componentId;
      await axios.post(
        'https://adp34fqnm5.execute-api.us-east-1.amazonaws.com/dev/addtag',
        {
          token,
          componentId,
          tag,
        },
      );
      window.alert('Tag Added!!');
      //Add a snackbar here from Material UI
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="tag-comp-section">
      <input
        className="tag-input"
        onChange={(e) => setTag(e.target.value)}
        placeholder="#Add A Tag"
      ></input>
      <div className="tag-icon-container">
        <Tooltip title="Add Tag" placement="top">
          <LocalOfferOutlinedIcon
            className="add-tag-btn"
            onClick={() => tagAComponent()}
          ></LocalOfferOutlinedIcon>
        </Tooltip>
      </div>
    </div>
  );
}
