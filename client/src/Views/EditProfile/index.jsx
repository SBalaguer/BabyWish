import React, { Component } from 'react';
import {
  updateProfile,
  createFile,
  getSingleUser
} from './../../services/user-functions';
// import ImageUpload from '../../Components/ImageUpload';
import NavbarWithRouter from './../../Components/Navbar';

export class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  componentDidMount(props) {
    this.setState({
      user: this.props.userState
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const objToUpdate = this.state.user;
    await updateProfile(this.props.userState._id, { objToUpdate });
    const reloadInfo = await getSingleUser(this.props.userState._id);
    await this.props.addUsertoUserState(reloadInfo);
    this.props.history.push(`/user/${this.props.userState._id}`);
  }

  handleChange(event) {
    const key = event.target.name;
    const value = event.target.value;

    this.setState({
      user: {
        ...this.state.user,
        [key]: value
      }
    });
  }
  async handleFileChange(event) {
    event.preventDefault();
    const file = event.target[0].files[0];
    const fileUrlToUpdate = await createFile(file);
    this.setState({
      user: {
        ...this.state.user,
        pictureUrl: fileUrlToUpdate
      }
    });
  }

  render() {
    return (
      <div>
        <div className="edit-form">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="name"
              onChange={this.handleChange}
              placeholder="Name"
            />
            <input
              type="date"
              name="dueDate"
              onChange={this.handleChange}
              placeholder="Due Date"
            />
            <input
              type="text"
              name="address"
              onChange={this.handleChange}
              placeholder="Address"
            />
            <input
              type="text"
              name="phoneNumber"
              onChange={this.handleChange}
              placeholder="Phone Number"
            />
            <select
              type="text"
              name="babyGender"
              onChange={this.handleChange}
              placeholder="Baby Gender"
            >
              <option value="singleBoy">Single Boy</option>
              <option value="singleGirl">Single Girl</option>
              <option value="twinBoys">Twin Boys</option>
              <option value="twinGirls">Twin Girls</option>
              <option value="twinMix">Mixed Twins</option>
              <option value="neutral">Don't / won't know</option>
            </select>
            <button>commit changes</button>
          </form>
        </div>
        <div className="upload-div">
          <form encType="multipart/form-data" onSubmit={this.handleFileChange}>
            <input type="file" name="pictureUrl" />
            <button type="submit">upload picture</button>
          </form>
        </div>
        <NavbarWithRouter
          user={this.props.userState}
          addUsertoUserState={this.addUsertoUserState}
        />
      </div>
    );
  }
}

export default EditProfile;
