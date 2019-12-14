import React, { Component } from "react";
import { getWishlistById } from "../../../services/wishlist-functions";
import Navbar from "./../../../Components/Navbar";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

// ATTENTION = WILL HAVE TO CHANGE THE WAY THIS GETS A SINGLE WISHLIST

export class SingleWishList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wishListToRender: []
    };
    // console.log(props);
  }

  async componentDidMount() {
    const id = this.props.match.params.id;
    try {
      const wishListToRender = await getWishlistById(id);
      //console.log(wishListToRender);
      this.setState({
        wishListToRender
      });
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
    const wishList = this.state.wishListToRender;
    const products = wishList.products;
    //console.log(products);
    return (
      <div>
        <h1>Wishlist View </h1>
        <h3>{wishList.name}</h3>
        <Link
          to={{
            pathname: "/products",
            state: {
              wishListId: wishList._id
            }
          }}
        >
          Add Product!
        </Link>
        {products && (
          <div className="wish-list-container">
            {products.map(product => {
              return <p key={product._id}>{product._id}</p>;
            })}
          </div>
        )}
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
