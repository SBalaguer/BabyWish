import React, { Component } from "react";
import { singleProduct } from "./../../services/product-functions";

class SingleProductView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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

  render() {
    const product = this.state.product;
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
      </div>
    );
  }
}

export default SingleProductView;
