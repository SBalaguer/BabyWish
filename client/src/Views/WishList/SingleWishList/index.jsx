import React, { Component } from "react";
import { getWishlistById } from "../../../services/wishlist-functions";
import Navbar from "./../../../Components/Navbar";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import TopNavbar from "./../../../Components/TopNavbar";

import ProductComp from "./../../../Components/ProductComp";
import { removeProductInWishlist } from "./../../../services/wishlist-functions";
import { addProductToWishlist } from "./../../../services/wishlist-functions";
import {
  createShoppingCart,
  checkIfShoppingCart,
  addToShoppingCart
} from "./../../../services/shopping-cart";

import {
  FacebookShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  WhatsappIcon,
  EmailIcon
} from "react-share";

import "./style.css";

// ATTENTION = WILL HAVE TO CHANGE THE WAY THIS GETS A SINGLE WISHLIST

export class SingleWishList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wishListToRender: {},
      wishlistId: this.props.match.params.id,
      amountInShoppingCart: 0
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

  async addToShoppingCart(productId, amountToBuy) {
    try {
      const productID = productId;
      const wishlistID = this.props.match.params.id;
      const gifterID = this.props.userState._id;
      const amountBought = amountToBuy;
      const amountInShoppingCart =
        this.state.amountInShoppingCart + amountBought;

      this.setState({ amountInShoppingCart });
      if (amountBought === 0) {
        throw new Error("Cant add 0 to the shopping cart");
      }
      //const amountBought = 1;
      // console.log("this is the product to be added", productID);
      // console.log("this is the gifter", gifterID);
      // console.log("this is the wishlist", wishlistID);
      //FIRST I'M GOING TO CHECK IF THERE IS A SHOPPING CART FOR THIS USER AND WISHLIST
      const existingShoppingCart = await checkIfShoppingCart(
        wishlistID,
        gifterID
      );
      //console.log("want to buy: ", amountBought);

      if (existingShoppingCart) {
        const shoppingCartID = existingShoppingCart._id;
        const shoppingCartUpdated = await addToShoppingCart(
          shoppingCartID,
          productID,
          amountBought
        );
        //here we will be patching the existing shopping cart
        //console.log("this is the updated ShoppingCart!", shoppingCartUpdated);
      } else {
        const newShoppingCart = await createShoppingCart(
          wishlistID,
          gifterID,
          productID,
          amountBought
        );
        //console.log(newShoppingCart);
      }
    } catch (error) {
      console.log(error);
    }
  }

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
          <div className="view-wl-heading">
            <div className="view-wl-title">
              <h1>
                <span className="hi"> {wishList.name}</span>
              </h1>
              {user.role !== "gifter" && (
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
              )}
            </div>
            {user.role !== "gifter" && (
              <div className="share-wl">
                <h3>
                  <span className="share-text">Share your WL</span>
                </h3>
                <div className="share-methods">
                  <div>
                    <span>
                      <span className="baby-text-wl">Baby</span>
                      <span className="wish-text-wl">Wish</span>{" "}
                      <span className="simple-text-wl">
                        Locator: {wishList.locator}
                      </span>
                    </span>
                  </div>
                  <div className="share-methods-social">
                    <FacebookShareButton
                      url={`http://babywish.herokuapp.com/wishlist/${wishList._id}`}
                      children="Hey check out the wishlist I've made for my baby!"
                    >
                      {" "}
                      <FacebookIcon size={32} round={true} />{" "}
                    </FacebookShareButton>
                    <WhatsappShareButton
                      url={`http://babywish.herokuapp.com/wishlist/${wishList._id}`}
                      children="Hey check out the wishlist I've made for my baby!"
                    >
                      {" "}
                      <WhatsappIcon size={32} round={true} />{" "}
                    </WhatsappShareButton>
                  </div>
                </div>
              </div>
            )}
          </div>

          {products && (
            <div className="wish-list-container">
              {products.map(product => {
                let done = false;
                const productData = product.productId;
                if (product.amountWanted === product.amountBought) {
                  done = true;
                }
                if (productData) {
                  return (
                    <ProductComp
                      key={product._id}
                      {...productData}
                      userId={user._id}
                      deleteId={product._id}
                      userRole={user.role}
                      wanted={product.amountWanted}
                      bought={product.amountBought}
                      path="wishlist"
                      removeProduct={productId => {
                        this.removeProductFromWishlist(productId);
                      }}
                      done={done}
                      addToShoppingCart={(productId, amountToBuy) => {
                        this.addToShoppingCart(productId, amountToBuy);
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
            wishlistId={this.state.wishlistId}
            amountInShoppingCart={this.state.amountInShoppingCart}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default SingleWishList;
