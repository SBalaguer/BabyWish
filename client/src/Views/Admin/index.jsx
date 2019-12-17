import React, { Component } from 'react';
import { UserList } from './../../Components/users';
import {
  findWishList,
  getAllUsers,
  deleteUser
} from './../../services/user-functions';

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
      </div>
    );
  }
}

export default AdminDashboard;
