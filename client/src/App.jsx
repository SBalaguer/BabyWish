import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import SignUpOne from './Views/SignUp/SignUpOne';
import SignUpTwoExpecting from './Views/SignUp/SignUpTwoExpecting';
import SignUpTwoParent from './Views/SignUp/SignUpTwoParent';
import SignUpThree from './Views/SignUp/SignUpThree';
import SignUpThreeGifter from './Views/SignUp/SignUpThreeGifter';
import SignIn from './Views/SignIn';
import Navbar from './Components/Navbar';
import WishList from './Views/WishList';
import ProfileView from './Views/ProfileView';
import Products from './Views/Products';
import SingleProductView from './Views/SingleProductView';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
    console.log(this.state);
    this.updateUserState = this.updateUserState.bind(this);
    this.addUsertoUserState = this.addUsertoUserState.bind(this);
  }

  updateUserState(user) {
    this.setState({
      user: {
        ...this.state.user,
        ...user
      }
    });
    //const name = user.name;
    //return user.name ? this.setState({user:{name: user.name}}) : '';
  }

  addUsertoUserState(user) {
    this.setState({ user: user });
  }

  render() {
    const NavbarWithRouter = withRouter(Navbar);
    return (
      <BrowserRouter>
        <h1>App page!</h1>
        <NavbarWithRouter
          user={this.state.user}
          addUsertoUserState={this.addUsertoUserState}
        />
        <Switch>
          <Route
            path="/sign-up/expecting/2"
            render={props => (
              <SignUpTwoExpecting
                updateUserState={this.updateUserState}
                userState={this.state.user}
                {...props}
              />
            )}
          />
          <Route
            path="/sign-up/parent/2"
            render={props => (
              <SignUpTwoParent
                updateUserState={this.updateUserState}
                userState={this.state.user}
                {...props}
              />
            )}
          />
          <Route
            path="/sign-up/gifter/3"
            render={props => (
              <SignUpThreeGifter
                {...props}
                addUsertoUserState={this.addUsertoUserState}
                userState={this.state.user}
              />
            )}
          />
          <Route
            path="/sign-up/3"
            render={props => (
              <SignUpThree
                {...props}
                addUsertoUserState={this.addUsertoUserState}
                userState={this.state.user}
              />
            )}
          />
          <Route
            path="/sign-up"
            render={props => (
              <SignUpOne
                updateUserState={this.updateUserState}
                userState={this.state.user}
                {...props}
              />
            )}
          />
          <Route
            path="/sign-in"
            render={props => (
              <SignIn
                updateUserState={this.updateUserState}
                addUsertoUserState={this.addUsertoUserState}
                {...props}
              />
            )}
          />
          <Route
            path="/user/:id"
            render={props => (
              <ProfileView
                updateUserState={this.updateUserState}
                userState={this.state.user}
                addUsertoUserState={this.addUsertoUserState}
                {...props}
              />
            )}
          />
          <Route
            path="/products/:id"
            render={props => (
              <SingleProductView
                updateUserState={this.updateUserState}
                userState={this.state.user}
                addUsertoUserState={this.addUsertoUserState}
                {...props}
              />
            )}
          />
          <Route
            path="/products/"
            render={props => (
              <Products
                updateUserState={this.updateUserState}
                userState={this.state.user}
                addUsertoUserState={this.addUsertoUserState}
                {...props}
              />
            )}
          />
          <Route
            path="/wishlist/:id"
            render={props => (
              <WishList
                updateUserState={this.updateUserState}
                userState={this.state.user}
                addUsertoUserState={this.addUsertoUserState}
                {...props}
              />
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
