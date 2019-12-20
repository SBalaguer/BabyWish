import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signOut } from "./../../services/user-functions";

import "./style.css";

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.signOutUser = this.signOutUser.bind(this);
    this.checkAmountInShoppingCart = this.checkAmountInShoppingCart.bind(this);
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

  checkAmountInShoppingCart() {
    if (
      this.props.amountInShoppingCart !== 0 &&
      this.props.amountInShoppingCart
    ) {
      return (
        <div className="shop-cart-counter">
          {this.props.amountInShoppingCart}
        </div>
      );
    } else {
      return;
    }
  }

  render() {
    const userId = this.props.user._id;
    const userRole = this.props.user.role;
    const wishListID = this.props.wishlistId;
    // console.log(this.props.amountInShoppingCart);

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
            {userRole === "admin" && <Link to="/admin">Users List</Link>}
            {userRole === "gifter" && (
              <div className="shopping-cart-navbar">
                <Link
                  to={{
                    pathname: `/shopping-cart/${userId}`,
                    state: {
                      wishListId: wishListID
                    }
                  }}
                >
                  Shopping Cart
                </Link>
                {this.checkAmountInShoppingCart()}
              </div>
            )}
            {userRole === "expecting" && <Link to="/wishlist">Wishlist</Link>}
            {userRole === "parent" && <Link to="/wishlist">Wishlist</Link>}
            <Link to={`/user/${userId}`}>Profile</Link>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Navbar;
