import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signOut } from "./../../services/user-functions";

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.signOutUser = this.signOutUser.bind(this);
  }

  async signOutUser() {
    try {
      const signOutUser = await signOut();
      //console.log(signOutUser);
      this.props.addUsertoUserState(signOutUser);
      this.props.history.push(`/`);
    } catch (error) {
      throw error;
    }
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
