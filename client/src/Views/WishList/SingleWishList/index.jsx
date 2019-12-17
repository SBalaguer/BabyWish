import React, { Component } from "react";
import { getWishlistById } from "../../../services/wishlist-functions";
import Navbar from "./../../../Components/Navbar";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import TopNavbar from "./../../../Components/TopNavbar";

import ProductComp from "./../../../Components/ProductComp";
import { removeProductInWishlist } from "./../../../services/wishlist-functions";
import { addProductToWishlist } from "./../../../services/wishlist-functions";

import "./style.css";

// ATTENTION = WILL HAVE TO CHANGE THE WAY THIS GETS A SINGLE WISHLIST

export class SingleWishList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wishListToRender: {},
      wishlistId: this.props.match.params.id
    };
    this.addUsertoUserState = this.addUsertoUserState.bind(this);
    this.removeProductFromWishlist = this.removeProductFromWishlist.bind(this);
  }

  async componentDidMount() {
    const id = this.state.wishlistId;
    try {
      const wishListToRender = await getWishlistById(id);
      this.setState({
        wishListToRender
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  addUsertoUserState(user) {
    this.props.addUsertoUserState(user);
  }

  // async handdleAddProduct(productId) {
  //   const wishlistId = this.state.wishlistId;
  //   const amountWanted = 1;
  //   try {
  //     await addProductToWishlist(wishlistId, productId, amountWanted);
  //     const wishListToRender = await getWishlistById(wishlistId);
  //     this.setState({
  //       wishListToRender
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async removeProductFromWishlist(productId) {
    try {
      const wishlistId = this.props.match.params.id;
      //first we update
      await removeProductInWishlist(wishlistId, productId);
      //then we get it again
      const wishListToRender = await getWishlistById(wishlistId);
      this.setState({
        wishListToRender
      });
    } catch (error) {
      throw error;
    }
  }

  render() {
    const user = this.props.userState;
    const NavbarWithRouter = withRouter(Navbar);
    const wishList = this.state.wishListToRender;
    const products = wishList.products;
    return (
      <React.Fragment>
        <TopNavbar />
        <div className="app-container">
          <div className="view-title-wishlist">
            <h1>
              <span className="hi"> {wishList.name}</span>
            </h1>
            <Link
              to={{
                pathname: "/products",
                state: {
                  wishListId: wishList._id
                }
              }}
            >
              <img
                className="add-prod-button"
                src="../../diaper-add-product.png"
                alt=""
              />
            </Link>
          </div>

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
                      deleteId={product._id}
                      userRole={user.role}
                      wanted={product.amountWanted}
                      bought={user.amountBought}
                      path="wishlist"
                      removeProduct={productId => {
                        this.removeProductFromWishlist(productId);
                      }}
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
      </React.Fragment>
    );
  }
}

export default SingleWishList;
