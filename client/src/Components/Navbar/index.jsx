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
      this.props.addUsertoUserState(signOutUser);
      this.props.history.push(`/`);
    } catch (error) {
      throw error;
    }
  }

  render() {
    const userId = this.props.user._id;
    return (
      <div className="navbar fixed-bottom bg-light">
        {(!userId && (
          <React.Fragment>
            <Link to="/sign-up">Sign Up</Link>
            <br />
            <Link to="/sign-in">Sign In</Link>
            <br />
          </React.Fragment>
        )) || (
          <React.Fragment>
            <Link to="/sign-out" onClick={this.signOutUser}>
              Sign Out
            </Link>
            <br />
            <Link to="/products">Products</Link>
            <br />
            <Link to="/wishlist">Wishlist</Link>
            <br />
            <Link to={`/user/${userId}`}>Profile</Link>
            <br />
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Navbar;
