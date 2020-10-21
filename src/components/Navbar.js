import React from "react";
import { Link, navigate } from "@reach/router";
import { Auth } from "aws-amplify";

export default function Navbar({ setSignedIn }) {
  return (
    <div style={style.nav}>
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
const style = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    height: "35px",
    flexDirection: "column",
  },
};
