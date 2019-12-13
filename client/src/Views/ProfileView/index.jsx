import React, { Component } from "react";
import Navbar from "./../../Components/Navbar";
import { withRouter } from "react-router-dom";

import "./index.css";

class ProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      daysToGo: null
    };
    this.addUsertoUserState = this.addUsertoUserState.bind(this);
  }
  componentDidMount() {}

  calcDaysToGo() {
    if (this.props.userState) {
      const dueDate = new Date(this.props.userState.dueDate);
      const today = Date.now();
      return Math.round((dueDate - today) / (1000 * 60 * 60 * 24));
    }
  }

  addUsertoUserState(user) {
    this.props.addUsertoUserState(user);
  }

  render() {
    const user = this.props.userState;
    const NavbarWithRouter = withRouter(Navbar);
    return (
      <div className="profile">
        <div>Here goes our Logo</div>
        <div className="profile-name">
          <div>
            <h1>
              Hi <strong>{user.name}</strong>!
            </h1>
            <h5>{this.calcDaysToGo()} Days to go!</h5>
          </div>
          <img src={user.pictureUrl} alt="" />
        </div>
        <div>
          <p>Wishlist</p>
          <div>
            <small>10</small>
            <small>Gifts</small>
          </div>
          <div>
            <small>82</small>
            <small>Items</small>
          </div>
        </div>
        <NavbarWithRouter
          user={user}
          addUsertoUserState={this.addUsertoUserState}
        />
      </div>
    );
  }
}

export default ProfileView;
