import React, { Component } from "react";
import { getWishlistById } from "../../../services/wishlist-functions";
import Navbar from "./../../../Components/Navbar";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
//import ProductComp from "./../../Components/ProductComp";
import ProductComp from "./../../../Components/ProductComp";

// ATTENTION = WILL HAVE TO CHANGE THE WAY THIS GETS A SINGLE WISHLIST

export class SingleWishList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wishListToRender: []
    };
    // console.log(props);
    this.addUsertoUserState = this.addUsertoUserState.bind(this);
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
              {
                /* return <p key={product._id}>{product.productId}</p>; */
              }
              const productData = product.productId;
              if (productData) {
                return (
                  <ProductComp
                    key={product._id}
                    {...productData}
                    userId={user._id}
                    userRole={user.role}
                    wanted={product.amountWanted}
                    bought={user.amountBought}
                    path="wishlist"
                  />
                );
              }
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
