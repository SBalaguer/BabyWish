import React, { Component } from "react";

class ProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      daysToGo: null
    };
  }
  componentDidMount() {}

  calcDaysToGo() {
    if (this.props.userState) {
      const dueDate = new Date(this.props.userState.dueDate);
      const today = Date.now();
      return Math.round((dueDate - today) / (1000 * 60 * 60 * 24));
    }
  }

  render() {
    // const daysToGo = this.props.userState.dueDate.getTime() - Date.now();
    // console.log(daysToGo);

    return (
      <div>
        <h1>Welcome {this.props.userState.name}!</h1>
        <small>{this.calcDaysToGo()} Days to go!</small>
      </div>
    );
  }
}

export default ProfileView;
