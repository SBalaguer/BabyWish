import React, { Component } from 'react';
import { UserList } from './../../Components/users';
import {
  findWishList,
  getAllUsers,
  deleteUser
} from './../../services/user-functions';
import { addFromAmazon } from './../../services/product-functions';
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
    event.preventDefault();
    const asin = event.target.asin.value;
    addFromAmazon(asin);
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
          <input type="text" placeholder="asin" name="asin" />
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
