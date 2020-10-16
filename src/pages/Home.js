import React from "react";
import { Link } from "@reach/router";
import { Auth } from "aws-amplify";
import { navigate } from "@reach/router";

// import { useStore } from 'react-redux';

export default function Home({ signedIn, setSignedIn }) {
  console.log("home");
  //   const store = useStore();
  return (
    <div>
      private home page
      <Link to="/profile">profile</Link>
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
        sign out
      </button>
      {/* {store.getState()} */}
    </div>
  );
}
