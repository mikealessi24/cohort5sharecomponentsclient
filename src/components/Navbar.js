import React from "react";
import { Link, navigate } from "@reach/router";
import { Auth } from "aws-amplify";
// import "../styles/navbar.css";

export default function Navbar({ setSignedIn }) {
  return (
    <div className="profile-navs">
      <Link to="/home">
        <button>Home</button>
      </Link>
      <Link to="/profile">
        <button>Profile</button>
      </Link>
      <button
        onClick={() => {
          (async function () {
            try {
              await Auth.signOut({ global: true });
              setSignedIn(undefined);
              navigate("/signin");
            } catch (error) {
              console.log(error);
            }
          })();
        }}
      >
        Sign Out
      </button>
    </div>
  );
}
