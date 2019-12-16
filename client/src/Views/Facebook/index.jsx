import React, { Component } from 'react';
import { facebookLogin } from './../../services/user-functions';
import FacebookLogin from 'react-facebook-login';

export default class FBLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      faceBookUser: {}
    };
    this.responseFacebook = this.responseFacebook.bind(this);
  }

  async responseFacebook(response) {
    console.log('response facebook got:\n' + response);
    try {
      const user = await facebookLogin(response);
      if (user) {
        this.setState({ faceBookUser: user });
        this.props.updateUserState(user);
        this.props.history.push(`/user/${user._id}`);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  render() {
    return (
      <FacebookLogin
        appId="751049532070837"
        autoLoad={true}
        fields="name,email,picture"
        callback={this.responseFacebook}
        cssClass="my-facebook-button-class"
        icon="fa-facebook"
      />
    );
  }
}
