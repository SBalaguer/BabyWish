import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Navbar extends Component {
  render() {
    return (
      <div>
        <Link to="/sign-up">Sign Up</Link>
        <br />
        <Link to="/sign-in">Sign In</Link>
        <br />
        <Link to="/sign-out">Sign Out</Link>
        <br />
      </div>
    );
  }
}

export default Navbar;
