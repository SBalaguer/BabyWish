import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

export default function topNavbar() {
  return (
    <div className="fixed-top logged-navbar">
      <Link to="/sign-in">
        <img className="logged-logo" src="../../babywishlogo.png" alt=".." />
      </Link>
    </div>
  );
}
