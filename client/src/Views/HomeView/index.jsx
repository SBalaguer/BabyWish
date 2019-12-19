import React from "react";
import { Link } from "react-router-dom";

import "./style.css";
import { FacebookIcon, TwitterIcon } from "react-share";

export default function HomeView() {
  return (
    <div className="home-page">
      <img className="home-logo" src="../babywishlogo.png" alt=".." />
      <div className="home-page_buttons">
        <Link to="/sign-in" className="btn btn-start btn-block">
          Sign In
        </Link>
        <Link to="/sign-up" className="btn btn-start btn-block">
          Sign Up
        </Link>
      </div>
      <Link to="/supplier/sign-in">Are you a Supplier?</Link>
    </div>
  );
}
