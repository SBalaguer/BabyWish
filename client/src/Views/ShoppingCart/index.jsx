import React, { Component } from "react";
import Navbar from "./../../Components/Navbar";
import TopNavbar from "./../../Components/TopNavbar";
import ShoppingCartItem from "./../../Components/ShoppingCartItem";
import { withRouter } from "react-router-dom";
import { checkIfShoppingCart } from "./../../services/shopping-cart";
import { singleProduct } from "./../../services/product-functions";
import { processPayment } from "./../../services/checkout";
import StripeCheckout from "react-stripe-checkout";

import "./styles.css";

export class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppingCart: {},
      gifterID: {},
      wishlistID: {},
      products: [],
      total: 0
    };
    this.addUsertoUserState = this.addUsertoUserState.bind(this);
    this.handleToken = this.handleToken.bind(this);
  }
  async componentDidMount() {
    const gifterID = this.props.userState._id;
    const wishlistID = this.props.location.state.wishListId;
    const shoppingCart = await checkIfShoppingCart(wishlistID, gifterID);

    //NOW WE ARE GOING TO CALCULATE THE PRODUCTS AND THE AMOUNT OF EACH OF THEM
    const products = shoppingCart.products;
    for (let i = 0; i < products.length; i++) {
      for (let j = i + 1; j < products.length; j++) {
        if (products[i].productId === products[j].productId) {
          products[i].amountBought =
            products[i].amountBought + products[j].amountBought;
          products.splice(j, 1);
          i = 0;
        }
      }
    }
    //console.log(products);
    //NOW WE ARE GOING TO GET THE PICTURE, DESCRIPTION AND PRICE OF EACH PRODUCT.
    let total = 0;
    for (let i = 0; i < products.length; i++) {
      const id = products[i].productId;
      const productData = await singleProduct(id);
      products[i].productData = productData;
      const productPriceAmount =
        products[i].productData.price * products[i].amountBought;
      total += productPriceAmount;
    }
    //console.log(products);
    this.setState({
      gifterID,
      wishlistID,
      shoppingCart,
      products,
      total
    });
  }

  async handleToken(token) {
    console.log(token);
    const total = this.state.total;
    try {
      const status = await processPayment(token, total);
      console.log(status);
      this.setState({ status: true });
    } catch (error) {
      console.log(error);
    }
  }

  addUsertoUserState(user) {
    this.props.addUsertoUserState(user);
  }

  render() {
    const stripePublicApiKey = "pk_test_N34sYUhOJr9zcvpRmE5vzuLz00dOyAjLMP";
    const user = this.props.userState;
    const NavbarWithRouter = withRouter(Navbar);

    const products = this.state.products;
    return (
      <React.Fragment>
        <TopNavbar />
        <div className="app-container">
          <table className="table table-borderless shopping-cart">
            <thead>
              <tr>
                <th scope="col" style={{ textAlign: "center" }}>
                  Img
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Amount
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map(product => {
                  return <ShoppingCartItem {...product} />;
                })}
              <tr style={{ borderTop: "1px solid black" }}>
                <th scope="row"></th>
                <td style={{ textAlign: "center" }}>Total</td>
                <td style={{ textAlign: "center" }}>$ {this.state.total}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <StripeCheckout
          stripeKey={stripePublicApiKey}
          token={this.handleToken}
          billingAddress
          amount={this.state.total * 100}
          name="BabyWish"
        >
          <button className="btn btn-start btn-block">Pay Baby Wish!</button>
        </StripeCheckout>
        <NavbarWithRouter
          user={user}
          addUsertoUserState={this.addUsertoUserState}
        />
      </React.Fragment>
    );
  }
}

export default ShoppingCart;
