import React from "react";
import Logo from "../assets/facebook_profile_image.png";
import "../styles/logo.css";

export default function LogoCube() {
  return (
    <div className="container">
      <div className="cube">
        <div className="logo side-front">
          <img className="img" src={Logo} alt="logo image" />
        </div>
        <div className="logo side-left">
          <img className="img2" src={Logo} alt="logo image" />
        </div>
        <div className="logo side-right">
          <img className="img2" src={Logo} alt="logo image" />
        </div>
        <div className="logo side-back">
          <img className="img" src={Logo} alt="logo image" />
        </div>
        <div className="logo side-top">
          <img className="img2" src={Logo} alt="logo image" />
        </div>
        <div className="logo side-bottom">
          <img className="img2" src={Logo} alt="logo image" />
        </div>
      </div>
    </div>
  );
}
