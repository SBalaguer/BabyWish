import React, { Component } from 'react';
import { findWishList, deleteUser } from './../../services/user-functions';

export class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.eachUser,
      wishLists: []
    };
    // this.deleteMethod = this.deleteMethod.bind(this);
  }
  async componentDidMount(props) {
    try {
      const wishList = await findWishList(this.props._id);
      this.setState({
        wishLists: wishList
      });
    } catch (error) {
      throw error;
    }
  }

  //   deleteMethod(props) {
  //     deleteUser(this.props._id);
  //     // this.props.history.push('/admin');
  //   }

  render() {
    return (
      <div className="single-user">
        <h3>{this.props.name}</h3>
        {this.state.wishLists &&
          this.state.wishLists.map(each => <div>{each.name}</div>)}
        <button
          className="btn"
          onClick={() => this.props.delete(this.props._id)}
        >
          delete
        </button>
      </div>
    );
  }
}

export default UserList;
