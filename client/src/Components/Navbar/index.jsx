import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signOut } from './../../services/user-functions';

import './style.css';

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
    const userRole = this.props.user.role;
    return (
      <div className="navbar-bottom fixed-bottom">
        {(!userId && (
          <React.Fragment>
            <Link to="/sign-up">Sign Up</Link>
            <Link to="/sign-in">Sign In</Link>
          </React.Fragment>
        )) || (
          <React.Fragment>
            <Link to="/sign-out" onClick={this.signOutUser}>
              Sign Out
            </Link>
            <Link to="/editprofile">Edit Profile</Link>
            {userRole === 'admin' && <Link to="/admin">Users List</Link>}
            {userRole === 'gifter' && <Link to="">Shopping Cart</Link>}
            {userRole === 'expecting' && <Link to="/wishlist">Wishlist</Link>}
            {userRole === 'parent' && <Link to="/wishlist">Wishlist</Link>}
            <Link to={`/user/${userId}`}>Profile</Link>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Navbar;
