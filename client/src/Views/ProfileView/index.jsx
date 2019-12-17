import React, { Component } from "react";
import Navbar from "./../../Components/Navbar";
import TopNavbar from "./../../Components/TopNavbar";
import { withRouter } from "react-router-dom";
import { getWishlistByUserId } from "./../../services/wishlist-functions";

import "./index.css";

class ProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      daysToGo: null,
      numberOfWishlists: "",
      numberOfGifts: "",
      numberOfAdded: ""
    };
    this.addUsertoUserState = this.addUsertoUserState.bind(this);
    this.calcUserData = this.calcUserData.bind(this);
  }

  calcDaysToGo() {
    if (this.props.userState.role === "expecting") {
      const dueDate = new Date(this.props.userState.dueDate);
      const today = Date.now();
      return Math.round((dueDate - today) / (1000 * 60 * 60 * 24));
    }
  }

  async calcUserData() {
    const userId = this.props.userState._id;
    let numberOfGifts = 0;
    let numberOfAdded = 0;
    const wishLists = await getWishlistByUserId(userId);
    const numberOfWishlists = wishLists.length;
    wishLists.map(wishlist => {
      const products = wishlist.products;
      products.map(product => {
        numberOfGifts += product.amountBought;
        numberOfAdded += product.amountWanted;
      });
    });
    this.setState({
      numberOfWishlists,
      numberOfAdded,
      numberOfGifts
    });
  }

  addUsertoUserState(user) {
    this.props.addUsertoUserState(user);
  }
  render() {
    const user = this.props.userState;
    const NavbarWithRouter = withRouter(Navbar);
    this.calcUserData();
    return (
      <React.Fragment>
        <TopNavbar />
        <div className="app-container">
          <div className="profile-container">
            <div className="profile-name-container">
              <h1 className="profile-name">
                <span className="hi">Hi,</span>{" "}
                <span className="user-name">{user.name}!</span>
              </h1>
              <div>
                <span className="days">{this.calcDaysToGo()}</span>
                <span className="days-to-go"> days to go!</span>
              </div>
            </div>
            <div className="profile-pic-container">
              <img className="profile-pic" src={user.pictureUrl} alt="..." />
            </div>
          </div>
          <div>
            <div className="counters-container">
              <div className="counter-container">
                <span className="counter-number">
                  {this.state.numberOfWishlists}
                </span>
                <span className="counter-description">Wishlists</span>
              </div>
              <div className="counter-container">
                <span className="counter-number">
                  {this.state.numberOfGifts}
                </span>
                <span className="counter-description">Gifts Recieved</span>
              </div>
              <div className="counter-container">
                <span className="counter-number">
                  {this.state.numberOfAdded}
                </span>
                <span className="counter-description">Gifts Added</span>
              </div>
            </div>
          </div>
          <NavbarWithRouter
            user={user}
            addUsertoUserState={this.addUsertoUserState}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default ProfileView;
