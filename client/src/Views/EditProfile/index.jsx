import React, { Component } from 'react';
import { updateProfile } from './../../services/user-functions';

export class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.userState
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    const objToUpdate = this.state.user;
    updateProfile(this.state.user._id, { objToUpdate });
  }

  handleChange(event) {
    const key = event.target.name;
    const value = event.target.value;

    this.setState({
      [key]: value
    });
  }
  // ATTENTION LEO YOURE HERE RIGHTNOW
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            onChange={this.handleChange}
            value={this.state.user.name}
          />
          <input
            type="date"
            name="dueDate"
            onChange={this.handleChange}
            value={this.state.user.dueDate}
          />
          <input
            type="text"
            name="address"
            onChange={this.handleChange}
            value={this.state.user.address}
          />
          <input
            type="text"
            name="phoneNumber"
            onChange={this.handleChange}
            value={this.state.user.phoneNumber}
          />
          <input
            type="text"
            name="babyGender"
            onChange={this.handleChange}
            value={this.state.user.babyGender}
          />
          <button>commit changes</button>
        </form>
      </div>
    );
  }
}

export default EditProfile;
