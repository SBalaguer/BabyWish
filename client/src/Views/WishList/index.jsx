import React, { Component } from "react";
import {
  getWishlistByUserId,
  createWishlist
} from "./../../services/wishlist-functions";
import { Link } from "react-router-dom";
import Navbar from "./../../Components/Navbar";
import { withRouter } from "react-router-dom";

import WishlistComp from "./../../Components/WishlistComp";

export class AllWishList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wishLists: [],
      wishListName: "",
      showInput: false,
      userId: this.props.userState._id
    };
    this.toggleInput = this.toggleInput.bind(this);
    this.updateName = this.updateName.bind(this);
    this.createNewWishList = this.createNewWishList.bind(this);
    this.addUsertoUserState = this.addUsertoUserState.bind(this);
  }

  async componentDidMount() {
    try {
      const userId = this.state.userId;
      const addWishListToState = await getWishlistByUserId(userId);
      this.setState({
        wishLists: addWishListToState
      });
    } catch (error) {
      throw error;
    }
  }

  updateName(event) {
    const value = event.target.value;
    this.setState({
      wishListName: value
    });
  }

  toggleInput() {
    this.setState({
      showInput: !this.state.showInput
    });
  }

  async createNewWishList(event) {
    event.preventDefault();
    const id = this.props.userState._id;
    const name = this.state.wishListName;
    try {
      const newWishlist = await createWishlist(id, name);
      const wishLists = [...this.state.wishLists, newWishlist];
      const wishListName = "";
      const showInput = false;
      this.setState({ wishLists, wishListName, showInput });
    } catch (error) {
      throw error;
    }
  }

  addUsertoUserState(user) {
    this.props.addUsertoUserState(user);
  }

  render() {
    const user = this.props.userState;
    const NavbarWithRouter = withRouter(Navbar);
    return (
      <div>
        <div>
          <div className="wish-list-container">
            <h1>this is all wishlists view</h1>
            {this.state.wishLists.map(item => {
              return <WishlistComp key={item._id} {...item} />;
            })}
            <div>
              <button
                className="btn"
                onClick={() => {
                  this.toggleInput();
                }}
              >
                new Wishlist
              </button>
            </div>
            {this.state.showInput && (
              <form onSubmit={this.createNewWishList}>
                <input
                  type="text"
                  onChange={this.updateName}
                  value={this.state.wishListName}
                  name="name"
                  placeholder="your new wishlist name"
                />
                <button className="btn">Create</button>
              </form>
            )}
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

export default AllWishList;
