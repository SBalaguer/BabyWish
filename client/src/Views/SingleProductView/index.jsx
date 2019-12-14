import React, { Component } from "react";
import { singleProduct } from "./../../services/product-functions";
import Navbar from "./../../Components/Navbar";
import { withRouter } from "react-router-dom";

import "./style.css";

class SingleProductView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.addUsertoUserState = this.addUsertoUserState.bind(this);
  }

  async componentDidMount() {
    try {
      const productId = this.props.match.params.id;
      const product = await singleProduct(productId);
      this.setState({ product });
    } catch (error) {
      throw error;
    }
  }

  addUsertoUserState(user) {
    this.props.addUsertoUserState(user);
  }

  render() {
    const product = this.state.product;
    const user = this.props.userState;
    const NavbarWithRouter = withRouter(Navbar);
    let style = {};
    if (product) {
      style = {
        backgroundImage: `url(${product.pictureUrl})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center",
        width: "100%",
        height: "70%",
        margin: "0.3em",
        marginTop: "3em"
      };
    }

    return (
      <React.Fragment>
        {this.state.product && (
          <div className="single-prod-container">
            <div className="single-prod-container_product">
              <div style={style}></div>
              <small>{product.category}</small>
              <h3>{product.name}</h3>
              <h5>${product.price}</h5>
              <div>Here goes the Specs</div>
            </div>
            {(user.role !== "gifter" && (
              <button className="btn btn-start btn-block">
                Add to Wishlist
              </button>
            )) || (
              <button className="btn btn-start btn-block">Add to Cart</button>
            )}
          </div>
        )}
        <NavbarWithRouter
          user={user}
          addUsertoUserState={this.addUsertoUserState}
        />
      </React.Fragment>
    );
  }
}

export default SingleProductView;
