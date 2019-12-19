import React, { Component } from 'react';

import { addProduct, createFile } from './../../services/product-functions';
// import NavbarWithRouter from './../../Components/Navbar';

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
      <div>
        <form onSubmit={this.productMethod}>
          <input type="text" placeholder="name" name="name" />
          <select type="text" name="category">
            <option value="diapers">Diapers</option>
            <option value="trolleys">trolleys</option>
            <option value="essentials">Essentials</option>
            <option value="clothes">Clothes</option>
            <option value="toys">Toys</option>
            <option value="uncategorized">n/a</option>
          </select>
          <input type="number" placeholder="price" name="price" />
          <input type="number" placeholder="in stock" name="availableStock" />
          <button>add</button>
        </form>
        <div className="upload-div">
          <form encType="multipart/form-data" onSubmit={this.handleFileChange}>
            <input type="file" name="pictureUrl" />
            <button type="submit">upload picture</button>
          </form>
        </div>
      </div>
    );
  }
}

export default SupplierDashboard;
