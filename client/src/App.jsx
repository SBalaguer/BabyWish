import React, { Component } from 'react';
import './App.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HomeView from './Views/HomeView';
import SignUpOne from './Views/SignUp/SignUpOne';
import SignUpTwoExpecting from './Views/SignUp/SignUpTwoExpecting';
import SignUpTwoParent from './Views/SignUp/SignUpTwoParent';
import SignUpThree from './Views/SignUp/SignUpThree';
import SignUpThreeGifter from './Views/SignUp/SignUpThreeGifter';
import SignIn from './Views/SignIn';
import WishList from './Views/WishList';
import SingleWishList from './Views/WishList/SingleWishList';
import ProfileView from './Views/ProfileView';
import Products from './Views/Products';
import SingleProductView from './Views/SingleProductView';
import CheckOut from './Views/CheckOut';
import FBLogin from './Views/Facebook';
import AdminDashboard from './Views/Admin';
import EditProfile from './Views/EditProfile';
import ShoppingCart from './Views/ShoppingCart';
import { isUserLoggedIn } from './services/user-functions';
import SupplierSignIn from './Views/Supplier/SignIn';
import SupplierSignUp from './Views/Supplier/SignUp';
import SupplierDashboard from './Views/Supplier';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
    //console.log(this.state);
    this.updateUserState = this.updateUserState.bind(this);
    this.addUsertoUserState = this.addUsertoUserState.bind(this);
    // this.routeGuard = this.routeGuard.bind(this);
  }

  updateUserState(user) {
    this.setState({
      user: {
        ...this.state.user,
        ...user
      }
    });
  }

  // USAGE - {this.routeGuard([array of authorized roles]) && what to render}

  routeGuard(role) {
    if (this.state.user) {
      if (role.includes(this.state.user.role)) {
        return true;
      } else {
        return false;
      }
    }
  }

  addUsertoUserState(user) {
    this.setState({ user: user });
  }

  async componentDidMount() {
    try {
      const user = await isUserLoggedIn();
      if (user) {
        this.setState({ user: user });
      }
    } catch (error) {
      throw error;
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/authentication/facebook"
            render={props => (
              <FBLogin
                updateUserState={this.updateUserState}
                userState={this.state.user}
                {...props}
              />
            )}
          />
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
            path="/shopping-cart/:id"
            render={props => (
              <ShoppingCart
                updateUserState={this.updateUserState}
                userState={this.state.user}
                addUsertoUserState={this.addUsertoUserState}
                {...props}
              />
            )}
          />
          {this.routeGuard(['admin', 'gifter', 'expecting', 'parent']) && (
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
          )}
          {this.routeGuard(['admin', 'gifter', 'expecting', 'parent']) && (
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
          )}
          {this.routeGuard(['admin', 'gifter', 'expecting', 'parent']) && (
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
          )}
          {this.routeGuard(['admin', 'gifter', 'expecting', 'parent']) && (
            <Route
              path="/wishlist/:id"
              render={props => (
                <SingleWishList
                  updateUserState={this.updateUserState}
                  userState={this.state.user}
                  addUsertoUserState={this.addUsertoUserState}
                  {...props}
                />
              )}
            />
          )}
          {this.routeGuard(['admin', 'gifter', 'expecting', 'parent']) && (
            <Route
              path="/editprofile"
              render={props => (
                <EditProfile
                  updateUserState={this.updateUserState}
                  userState={this.state.user}
                  addUsertoUserState={this.addUsertoUserState}
                  {...props}
                />
              )}
            />
          )}
          {this.routeGuard(['admin', 'expecting']) && (
            <Route
              path="/wishlist/"
              render={props => (
                <WishList
                  updateUserState={this.updateUserState}
                  userState={this.state.user}
                  addUsertoUserState={this.addUsertoUserState}
                  {...props}
                />
              )}
            />
          )}
          {this.routeGuard(['admin']) && (
            <Route
              path="/admin/"
              render={props => (
                <AdminDashboard
                  updateUserState={this.updateUserState}
                  userState={this.state.user}
                  addUsertoUserState={this.addUsertoUserState}
                  {...props}
                />
              )}
            />
          )}
          <Route path="/checkout" component={CheckOut} />
          {this.routeGuard(['admin', 'gifter', 'expecting', 'parent']) && (
            <Route
              path="/"
              render={props => (
                <ProfileView
                  updateUserState={this.updateUserState}
                  userState={this.state.user}
                  addUsertoUserState={this.addUsertoUserState}
                  {...props}
                />
              )}
            />
          )}
          <Route
            path="/supplier/sign-in"
            render={props => <SupplierSignIn {...props} />}
          />
          <Route
            path="/supplier/sign-up"
            render={props => <SupplierSignUp {...props} />}
          />
          <Route
            path="/supplier/"
            render={props => <SupplierDashboard {...props} />}
          />
          <Route path="/" component={HomeView} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
