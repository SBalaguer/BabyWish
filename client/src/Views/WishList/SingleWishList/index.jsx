import React, { Component } from "react";
import { getWishlistById } from "../../../services/wishlist-functions";
import Navbar from "./../../../Components/Navbar";
import { withRouter } from "react-router-dom";

// ATTENTION = WILL HAVE TO CHANGE THE WAY THIS GETS A SINGLE WISHLIST

export class SingleWishList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wishListToRender: [],
      productsToBuy: [],
      productsToRemove: []
    };
    // console.log(props);
  }

  async componentDidMount() {
    const id = this.props.match.params.id;
    console.log("componentDidMount ran before try and the params is:\n" + id);
    try {
      let addWishListToState = await getWishlistById(id);
      console.log(
        "componendDidMount ran on wishlist view and addWishListToState is: \n" +
          addWishListToState
      );
      console.dir(addWishListToState);
      // addWishListToState = addWishListToState.data.wholeWishList.products;
      console.dir(addWishListToState);

      this.setState({
        wishListToRender: addWishListToState
      });
    } catch (error) {
      throw error;
    }
  }

  addUsertoUserState(user) {
    this.props.addUsertoUserState(user);
  }

  // ATTENTION LEO YOU'RE HERE RIGHTNOW

  render() {
    const user = this.props.userState;
    const NavbarWithRouter = withRouter(Navbar);
    return (
      <div>
        <div className="wish-list-container">
          {this.state.wishListToRender.map(item => {
            return (
              <div key={item._id} className="single-item">
                <h3>{item.productId}</h3>
              </div>
            );
          })}
        </div>
        <NavbarWithRouter
          user={user}
          addUsertoUserState={this.addUsertoUserState}
        />
      </div>
    );
  }
}

export default SingleWishList;

// {this.state.wishListToRender.map(item => {
//   return (
//     <div className="single-item">
//     <img src={item.pictureUrl} />
//     <h3>{item.name}</h3>
//     </div>
//   )

// })}
