import React, { Component } from "react";
import TopNavbar from "./../../Components/TopNavbar";
import { Link } from "react-router-dom";

import { addProduct, createFile } from "./../../services/product-functions";
// import NavbarWithRouter from './../../Components/Navbar';
import "./style.css";
export class SupplierDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictureUrl: null
    };
    this.handleFileChange = this.handleFileChange.bind(this);
    this.productMethod = this.productMethod.bind(this);
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
    const name = event.target.name.value;
    const category = event.target.category.value;
    const availableStock = event.target.availableStock.value;
    const price = event.target.price.value;
    const pictureUrl = this.state.pictureUrl;

    const obj = { name, category, availableStock, price, pictureUrl };
    try {
      addProduct(obj);
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
                  />
                </div>
                <div className="form-group">
                  <select className="form-control" type="text" name="category">
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
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Stock Availability"
                    name="availableStock"
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
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-start btn-block"
                  style={{ marginBottom: "1.5em" }}
                >
                  Upload Product Image
                </button>
              </form>
            </div>
          )}
          {!this.props.userState.shipFrom && (
            <div className="home-page">
              <h3>You need a supplier account to access this page.</h3>
              <Link to="/suppliers/sign-in">Supplier Sign-In</Link>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default SupplierDashboard;
