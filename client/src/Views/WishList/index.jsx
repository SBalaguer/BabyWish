import React, { Component } from "react";
import {
  getWishlistByUserId,
  createWishlist,
  deleteWishlist
} from "./../../services/wishlist-functions";
import TopNavbar from "./../../Components/TopNavbar";
// import { Link } from "react-router-dom";
import Navbar from "./../../Components/Navbar";
import { withRouter } from "react-router-dom";

import WishlistComp from "./../../Components/WishlistComp";

import "./style.css";

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
    this.deleteWishlist = this.deleteWishlist.bind(this);
  }

  async componentDidMount() {
    try {
      const userId = this.state.userId;
      const addWishListToState = await getWishlistByUserId(userId);
      this.setState({
        wishLists: addWishListToState,
        userId
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteWishlist(id) {
    //console.log("Wishlist to Delete:", id);
    const userId = this.state.userId;
    try {
      await deleteWishlist(id);
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
    const wishLists = this.state.wishLists;
    return (
      <React.Fragment>
        <TopNavbar />
        <div className="app-container">
          <div className="wish-list-container">
            <div className="view-title">
              <h1>
                <span className="hi"> Wishlists</span>
              </h1>

              <div
                onClick={() => {
                  this.toggleInput();
                }}
              >
                <img className="add-button" src="../../add-blue.png" alt="" />
              </div>
            </div>
            {wishLists.map(wishList => {
              if (wishList) {
                return (
                  <WishlistComp
                    key={wishList._id}
                    {...wishList}
                    delete={wishListId => this.deleteWishlist(wishListId)}
                  />
                );
              } else {
                return null;
              }
            })}
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
      </React.Fragment>
    );
  }
}

export default AllWishList;
