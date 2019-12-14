import React, { Component } from "react";
import ProductComp from "./../../Components/ProductComp";
import { listProducts } from "./../../services/product-functions";
import Navbar from "./../../Components/Navbar";
import { withRouter } from "react-router-dom";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.addUsertoUserState = this.addUsertoUserState.bind(this);
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

  addUsertoUserState(user) {
    this.props.addUsertoUserState(user);
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
