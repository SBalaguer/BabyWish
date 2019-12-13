import React, { Component } from "react";
import {
  getWishlistByUserId,
  createWishlist
} from "./../../services/wishlist-functions";
import { Link } from "react-router-dom";
import Navbar from "./../../Components/Navbar";
import { withRouter } from "react-router-dom";

export class AllWishList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wishLists: [],
      wishListName: "",
      showInput: false,
      usedProp: false
    };
    // console.log("this runs first", this.props.userState);
    this.toggleInput = this.toggleInput.bind(this);
    this.updateName = this.updateName.bind(this);
    this.createNewWishList = this.createNewWishList.bind(this);
    this.addUsertoUserState = this.addUsertoUserState.bind(this);
  }

  async componentDidUpdate() {
    // console.log("this runs forth", this.props.userState);
    if (this.props.userState !== {} && this.state.usedProp === false) {
      try {
        const id = this.props.userState._id;
        let addWishListToState = await getWishlistByUserId(id);
        // console.log("update state ran and result is: \n" + addWishListToState);
        this.setState({
          wishLists: addWishListToState,
          usedProp: true
        });
      } catch (error) {
        throw error;
      }
    }
  }

  addUsertoUserState(user) {
    this.props.addUsertoUserState(user);
  }

  updateName(event) {
    const value = event.target.value;
    this.setState({
      wishListName: value
    });
  }

  toggleInput(event) {
    this.setState({
      showInput: !this.state.showInput
    });
  }

  async createNewWishList(event) {
    const id = this.props.userState._id;
    const name = this.state.wishListName;
    // console.log("id:\n" + id + "\nname:\n" + name);
    try {
      const response = await createWishlist(id, name);
    } catch (error) {
      throw error;
    }
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
              return (
                <div key={item._id} className="single-item">
                  <Link to={`/wishlist/${item._id}`}>
                    <h3>{item.name}</h3>
                  </Link>
                  <p>something</p>
                </div>
              );
            })}
            <div>
              <a className="btn" onClick={this.toggleInput}>
                new Wishlist
              </a>
            </div>
            {this.state.showInput && (
              <form onSubmit={this.createNewWishList}>
                <input
                  onChange={this.updateName}
                  value={this.state.newWishListName}
                  name="name"
                  placeholder="your new wishlist name"
                />
                <button className="btn" type="submit">
                  create
                </button>
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
