import React from "react";
import { navigate } from "@reach/router";

export default function NotFound() {
  return (
    <div>
      404, Page Not Found! Enjoy this game instead.
      <button onClick={() => navigate("/home")}> Return Home </button>
      <iframe
        src="http://www.trex-game.skipser.com/"
        style={{
          height: "80vh",
          width: "80vw",
        }}
      ></iframe>
    </div>
  );
}
