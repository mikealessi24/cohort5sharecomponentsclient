import React from "react";
import "../styles/landing-page.css";
// import { useStore } from 'react-redux';

export default function Landing() {
  //   const store = useStore();
  return (
    <div className="landing-page-content">
      <div>
        <h1>Title</h1>
        {/* //logo could be centered in top */}
      </div>
      <div>
        <h2>About</h2>
        <p>
          The standard Lorem Ipsum passage, used since the 1500s "Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum."
        </p>
      </div>
      <div className="example-img-container">
        <img src="../images/code-snippet.png" alt="code snippet" />
      </div>
      <div>
        <img src="../images/button-component.png" alt="component image" />
      </div>
      <div>SignIn or SignUp</div>
      {/* {store.getState()} */}
    </div>
  );
}

//signup route available
//code snippet of the useEffect?
