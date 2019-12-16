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
    console.log('this is response from login' + response);
    console.dir(response);
    try {
      const user = await facebookLogin(response);
      console.log('this is the response facebook: \n' + user);
      if (user) {
        this.setState({ faceBookUser: user });
        this.props.updateUserState(user);
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
//   async componentDidMount() {
//     try {
//       const user = await facebookLogin();
//       console.log('this is the component mount result: \n' + user);
//       if (user) {
//         this.setState({ user: user });
//       }
//     } catch (error) {
//       console.log(error );
//       throw error;
//     }
//   }

//   render() {
//     return (
//       <div>
//         <h2>you're now being logged in with facebok</h2>
//       </div>
//     );
//   }
// }

// export { FBLogin };
