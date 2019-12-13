import React, { Component } from "react";
import { singleProduct } from "./../../services/product-functions";
import Navbar from "./../../Components/Navbar";
import { withRouter } from "react-router-dom";

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
    return (
      <div>
        {this.state.product && (
          <React.Fragment>
            <h3>{product.name}</h3>
            <img src={product.pictureUrl} alt="..." />
            <h6>{product.category}</h6>
            <small>{product.price}</small>
          </React.Fragment>
        )}
        <NavbarWithRouter
          user={user}
          addUsertoUserState={this.addUsertoUserState}
        />
      </div>
    );
  }
}

export default SingleProductView;
