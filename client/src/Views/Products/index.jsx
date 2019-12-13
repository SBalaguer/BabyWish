import React, { Component } from "react";
import ProductComp from "./../../Components/ProductComp";
import { listProducts } from "./../../services/product-functions";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  async componentDidMount() {
    try {
      const products = await listProducts();
      //console.log(products);
      this.setState({
        products
      });
    } catch (error) {
      throw error;
    }
  }

  render() {
    return (
      <div>
        <h1>Products Page</h1>
        <h3>
          Here we should have a navbar for the products to search and filter
        </h3>
        {this.state.products.map(product => (
          <ProductComp key={product._id} {...product} />
        ))}
      </div>
    );
  }
}

export default Products;
