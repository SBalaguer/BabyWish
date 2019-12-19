import React, { Component } from "react";
import ProductComp from "./../../Components/ProductComp";
import { listProducts } from "./../../services/product-functions";
import Navbar from "./../../Components/Navbar";
import { withRouter } from "react-router-dom";
import { addProductToWishlist } from "./../../services/wishlist-functions";
import TopNavbar from "./../../Components/TopNavbar";

import "./style.css";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      wishListFrom: ""
    };
    this.addUsertoUserState = this.addUsertoUserState.bind(this);
    this.handdleAddProduct = this.handdleAddProduct.bind(this);
  }

  async componentDidMount() {
    const wishListFrom = this.props.location.state.wishListId;
    try {
      const products = await listProducts();
      //console.log(products);
      this.setState({
        products,
        wishListFrom
      });
    } catch (error) {
      throw error;
    }
  }

  addUsertoUserState(user) {
    this.props.addUsertoUserState(user);
  }

  async handdleAddProduct(productId) {
    const wishlistId = this.state.wishListFrom;
    const amountWanted = 1;
    try {
      const updatedWishlist = await addProductToWishlist(
        wishlistId,
        productId,
        amountWanted
      );
      this.props.history.push(`/wishlist/${wishlistId}`);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const NavbarWithRouter = withRouter(Navbar);
    const user = this.props.userState;
    return (
      <React.Fragment>
        <TopNavbar />
        <div className="app-container">
          <div className="wish-list-container">
            <div className="view-title-products">
              <h1>
                <span className="hi"> Select Products</span>
              </h1>
              <form className="search-form">
                <input type="search" />
                <button className="btn-white">
                  <img
                    className="search-img"
                    src="../../search-icon.png"
                    alt=""
                  />
                </button>
              </form>
            </div>
            {this.state.products.map(product => (
              <ProductComp
                key={product._id}
                {...product}
                userId={user._id}
                userRole={user.role}
                addProduct={productId => {
                  this.handdleAddProduct(productId);
                }}
                wishListFrom={this.state.wishListFrom}
              />
            ))}
          </div>
          <NavbarWithRouter
            user={user}
            addUsertoUserState={this.addUsertoUserState}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Products;
