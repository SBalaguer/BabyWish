import React, { Component } from 'react';
import { UserList } from './../../Components/users';
import {
  findWishList,
  getAllUsers,
  deleteUser
} from './../../services/user-functions';
import { addProduct } from './../../services/product-functions';
import NavbarWithRouter from './../../Components/Navbar';

export class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: null
    };
    this.refreshList = this.refreshList.bind(this);
  }

  async componentDidMount() {
    try {
      const users = await getAllUsers();
      this.setState({
        userList: users
      });
    } catch (error) {
      throw error;
    }
  }

  productMethod(event) {
    const name = event.target.name.value;
    const category = event.target.category.value;
    const availableStock = event.target.availableStock.value;
    const price = event.target.price.value;
    const pictureUrl = event.target.pictureUrl.value;

    const obj = { name, category, availableStock, price, pictureUrl };
    addProduct(obj);
  }

  deleteMethod(id) {
    deleteUser(id);
    this.refreshList();
  }

  async refreshList() {
    try {
      const users = await getAllUsers();
      this.setState({
        userList: users
      });
    } catch (error) {
      throw error;
    }
  }

  render() {
    return (
      <div>
        {this.state.userList &&
          this.state.userList.map(user => (
            <UserList
              key={user._id}
              delete={id => this.deleteMethod(id)}
              {...user}
            />
          ))}
        <br />
        <br />
        <br />
        <br />
        <form onSubmit={this.productMethod}>
          <input type="text" placeholder="name" name="name" />
          <select type="text" name="category">
            <option value="diapers">Diapers</option>
            <option value="trolleys">trolleys</option>
            <option value="essentials">Essentials</option>
            <option value="clothes">Clothes</option>
            <option value="uncategorized">n/a</option>
          </select>
          <input type="number" placeholder="price" name="price" />
          <input type="text" placeholder="picurl" name="pictureUrl" />
          <input type="number" placeholder="in stock" name="availableStock" />
          <button>add</button>
        </form>
        <NavbarWithRouter
          user={this.props.userState}
          addUsertoUserState={this.props.addUsertoUserState}
        />
      </div>
    );
  }
}

export default AdminDashboard;
