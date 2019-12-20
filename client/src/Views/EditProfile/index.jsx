import React, { Component } from 'react';
import TopNavbar from './../../Components/TopNavbar';
import { withRouter } from 'react-router-dom';

import Navbar from './../../Components/Navbar';
import {
  updateProfile,
  createFile,
  getSingleUser
} from './../../services/user-functions';
// import ImageUpload from '../../Components/ImageUpload';

import './style.css';

export class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.addUsertoUserState = this.addUsertoUserState.bind(this);
  }

  componentDidMount(props) {
    this.setState({
      user: this.props.userState
    });
  }

  addUsertoUserState(user) {
    this.props.addUsertoUserState(user);
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
    const user = this.props.userState;
    const NavbarWithRouter = withRouter(Navbar);
    return (
      <React.Fragment>
        <TopNavbar />
        <div className="app-container">
          <div className="edit-form">
            <h1 className="profile-name">
              <span className="hi">Edit Profile</span>
            </h1>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  onChange={this.handleChange}
                  placeholder="Name"
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="date"
                  name="dueDate"
                  onChange={this.handleChange}
                  placeholder="Due Date"
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="address"
                  onChange={this.handleChange}
                  placeholder="Address"
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="phoneNumber"
                  onChange={this.handleChange}
                  placeholder="Phone Number"
                />
              </div>
              <div className="form-group">
                <select
                  className="form-control"
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
              </div>
              <button
                className="btn btn-wl btn-block"
                style={{ marginBottom: '1.5em' }}
              >
                Udpate Profile
              </button>
            </form>

            <form
              encType="multipart/form-data"
              onSubmit={this.handleFileChange}
            >
              <div id="file-div" className="form-group">
                <input type="file" className="file-input" name="pictureUrl" />
              </div>
              <button type="submit" className="btn btn-wl btn-block">
                Change Profile Picture
              </button>
            </form>
          </div>
          <NavbarWithRouter
            user={user}
            addUsertoUserState={this.addUsertoUserState}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default EditProfile;

// style for file input  form-control
