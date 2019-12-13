import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.signOutUser = this.signOutUser.bind(this);
  }

  signOutUser() {
    console.log("hola");
  }

  render() {
    return (
      <div>
        <Link to="/sign-up">Sign Up</Link>
        <br />
        <Link to="/sign-in">Sign In</Link>
        <br />
        <Link to="/sign-out" onClick={this.signOutUser}>
          Sign Out
        </Link>
        <br />
      </div>
    );
  }
}

export default Navbar;
