import React, { Component } from "react";
import TopNavbar from "./../../Components/TopNavbar";
import { Link } from "react-router-dom";
import NavbarSupplier from "./../../Components/NavbarSupplier";

import { addProduct, createFile } from "./../../services/product-functions";
// import NavbarWithRouter from './../../Components/Navbar';
import "./style.css";
export class SupplierDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictureUrl: null,
      name: "",
      category: "uncategorized",
      availableStock: "",
      price: ""
    };
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.productMethod = this.productMethod.bind(this);
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  //   async componentDidMount() {
  //     try {
  //       const users = await getAllUsers();
  //       this.setState({
  //         userList: users
  //       });
  //     } catch (error) {
  //       throw error;
  //     }
  //   }

  async productMethod(event) {
    event.preventDefault();
    let name = this.state.name;
    let category = this.state.category;
    let availableStock = this.state.availableStock;
    let price = this.state.price;
    let pictureUrl = this.state.pictureUrl;

    const obj = { name, category, availableStock, price, pictureUrl };
    try {
      addProduct(obj);
      name = "";
      category = "";
      availableStock = "";
      price = "";
      pictureUrl = null;
      this.setState({
        name,
        category,
        availableStock,
        price,
        pictureUrl
      });
    } catch (error) {
      throw error;
    }
  }

  async handleFileChange(event) {
    event.preventDefault();
    const file = event.target[0].files[0];
    const fileUrlToUpdate = await createFile(file);
    this.setState({
      pictureUrl: fileUrlToUpdate
    });
  }

  render() {
    return (
      <React.Fragment>
        <TopNavbar />
        <div className="app-container">
          {this.props.userState.shipFrom && (
            <div className="supplier-dashboard">
              <form onSubmit={this.productMethod}>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control"
                    type="text"
                    name="category"
                    value={this.state.category}
                    onChange={this.handleInputChange}
                    required
                  >
                    <option value="uncategorized">Select Category</option>
                    <option value="diapers">Diapers</option>
                    <option value="trolleys">Trolleys</option>
                    <option value="essentials">Essentials</option>
                    <option value="clothes">Clothes</option>
                    <option value="toys">Toys</option>
                    <option value="uncategorized">Others</option>
                  </select>
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Price (in EUR)"
                    name="price"
                    value={this.state.price}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Stock Availability"
                    name="availableStock"
                    value={this.state.availableStock}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>
                <button
                  className="btn btn-start btn-block"
                  style={{ marginBottom: "1.5em" }}
                >
                  Add Product!
                </button>
              </form>
              <form
                encType="multipart/form-data"
                onSubmit={this.handleFileChange}
              >
                <div className="form-control" className="upload-div">
                  <input
                    className="form-control"
                    type="file"
                    name="pictureUrl"
                    style={{ marginBottom: "1.5em" }}
                  />
                </div>
                <button type="submit" className="btn btn-start btn-block">
                  Upload Product Image
                </button>
              </form>
            </div>
          )}
          {!this.props.userState.shipFrom && (
            <div className="home-page">
              <h3 style={{ width: "75%", marginBottom: "1.5em" }}>
                You need a supplier account to access this page.
              </h3>
              <Link to="/supplier/sign-in">Supplier Sign-In</Link>
            </div>
          )}
        </div>
        {this.props.userState.shipFrom && <NavbarSupplier />}
      </React.Fragment>
    );
  }
}

export default SupplierDashboard;
