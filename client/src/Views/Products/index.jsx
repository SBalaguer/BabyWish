import React, { Component } from "react";
import ProductComp from "./../../Components/ProductComp";
import { listProducts } from "./../../services/product-functions";
import Navbar from "./../../Components/Navbar";
import { withRouter } from "react-router-dom";
import { addProductToWishlist } from "./../../services/wishlist-functions";

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
      <div>
        <h1>Products Page</h1>
        <h3>
          Here we should have a navbar for the products to search and filter
        </h3>
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
        <NavbarWithRouter
          user={user}
          addUsertoUserState={this.addUsertoUserState}
        />
      </div>
    );
  }
}

export default Products;
