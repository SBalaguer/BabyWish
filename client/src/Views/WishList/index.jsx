import React, { Component } from 'react';
import {
  getWishlistByUserId,
  createWishlist,
  deleteWishlist
} from './../../services/wishlist-functions';
import TopNavbar from './../../Components/TopNavbar';
// import { Link } from "react-router-dom";
import Navbar from './../../Components/Navbar';
import { withRouter } from 'react-router-dom';

import WishlistComp from './../../Components/WishlistComp';

import './style.css';

export class AllWishList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wishLists: [],
      wishListName: '',
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
      const wishListName = '';
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
          {this.state.wishLists.length > 0 && (
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
                <form
                  onSubmit={this.createNewWishList}
                  style={{ marginTop: '1em' }}
                >
                  <div className="form-row">
                    <div
                      className="form-group col-md-6"
                      style={{ marginBottom: '0.3em' }}
                    >
                      <input
                        type="text"
                        className="form-control"
                        id="wishlistName"
                        onChange={this.updateName}
                        value={this.state.wishListName}
                        name="name"
                        placeholder="Wishlist Name"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <button className="empty-btn"> Add</button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          )}
          {this.state.wishLists.length === 0 && (
            <React.Fragment>
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
                    <img
                      className="add-button"
                      src="../../add-blue.png"
                      alt=""
                    />
                  </div>
                </div>
                {!this.state.showInput && (
                  <div className="no-wishlist-div">
                    <h3>You don't have any wishlists yet.</h3>
                  </div>
                )}
                {this.state.showInput && (
                  <form
                    onSubmit={this.createNewWishList}
                    style={{ marginTop: '1em' }}
                  >
                    <div className="form-row">
                      <div
                        className="form-group col-md-6"
                        style={{ marginBottom: '0.3em' }}
                      >
                        <input
                          type="text"
                          className="form-control"
                          id="wishlistName"
                          onChange={this.updateName}
                          value={this.state.wishListName}
                          name="name"
                          placeholder="Wishlist Name"
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <button className="empty-btn"> Add</button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </React.Fragment>
          )}
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

{
  /* <form></form>; */
}

{
  /* <div className="form-row">
                  <div className="form-group col-md-6">
                    <input
                      className="form-control"
                      type="text"
                      onChange={this.updateName}
                      value={this.state.wishListName}
                      name="name"
                      placeholder="Wishlist Name"
                    />
                    <div className="form-group col-md-6">
                      <button></button>
                    </div>
                  </div>
                </div> */
}
