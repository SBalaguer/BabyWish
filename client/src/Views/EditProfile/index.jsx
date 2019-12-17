import React, { Component } from 'react';
import { updateProfile, createFile } from './../../services/user-functions';
// import ImageUpload from '../../Components/ImageUpload';

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

  //   componentWillReceiveProps(props) {
  //     this.setState({
  //       user: this.props.userState
  //     });
  //   }

  handleSubmit(event) {
    const objToUpdate = this.state.user;
    updateProfile(this.props.userState._id, { objToUpdate });
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
    // console.dir(event.target.files);
    event.preventDefault();
    // console.dir(event.target[0].files[0]);
    const file = event.target[0].files[0];
    // console.log(file);
    // this.setState({
    //   user: {
    //     ...this.state.user,
    //     pictureUrl: file
    //   }
    // });
    const fileUrlToUpdate = await createFile(file);
    console.log('this is the fileurltoUpdate:\n' + fileUrlToUpdate);
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
          <input
            type="text"
            name="babyGender"
            onChange={this.handleChange}
            placeholder="Baby Gender"
          />
          <button>commit changes</button>
        </form>
        <form encType="multipart/form-data" onSubmit={this.handleFileChange}>
          <input type="file" name="pictureUrl" />
          <button type="submit">upload picture</button>
        </form>
      </div>
    );
  }
}

export default EditProfile;
