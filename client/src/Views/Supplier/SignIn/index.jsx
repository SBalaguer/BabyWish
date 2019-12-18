import React, { Component } from 'react';
import { signIn } from './../../../services/supplier-functions';
import { Link } from 'react-router-dom';

export class SupplierSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  //   componentDidMount() {
  //     if (this.props.userState) {
  //       this.props.history.push(`/user/${this.props.userState._id}`);
  //     }
  //   }

  async handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    try {
      const user = await signIn({ email, password });
      //console.log(user);
      //   this.props.addUsertoUserState(user);
      this.props.history.push(`/user/${user._id}`);
    } catch (error) {
      throw error;
    }
  }

  render() {
    return (
      <div className="alingment-center">
        <div className="row sign-in-title">
          <img className="home-logo" src="../babywishlogo.png" alt=".." />
        </div>
        <div className="row form-holder">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                value={this.state.email}
                onChange={this.handleInputChange}
                name="email"
                placeholder="Email"
              />
            </div>
            <div className="form-group" id="passDiv">
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={this.state.password}
                onChange={this.handleInputChange}
                name="password"
                placeholder="Password"
              />
            </div>
            <Link to="/">
              <small className="form-text" id="forg-pass">
                Forgot your password?
              </small>
            </Link>
            <button type="submit" className="btn btn-start btn-block">
              Log-in
            </button>
          </form>
          <Link to="/sign-up">
            <small>Do not have an acount? Sign-up!</small>
          </Link>
        </div>
      </div>
    );
  }
}

export default SupplierSignIn;
