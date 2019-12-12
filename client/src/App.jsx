import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import SignUpOne from "./Views/SignUp/SignUpOne";
import SignUpTwoExpecting from "./Views/SignUp/SignUpTwoExpecting";
import SignUpTwoParent from "./Views/SignUp/SignUpTwoParent";
import SignUpThree from "./Views/SignUp/SignUpThree";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
    console.log(this.state);
    this.updateUserState = this.updateUserState.bind(this);
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

  render() {
    return (
      <BrowserRouter>
        <h1>App page!</h1>
        <Link to="/sign-up">Sign Up</Link>
        <Link to="/sign-in">Sign Up</Link>
        <Link to="/sign-out">Sign Up</Link>
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
            path="/sign-up/3"
            render={props => (
              <SignUpThree
                {...props}
                updateUserState={this.updateUserState}
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
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
