import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./style.css";

export class NavbarSupplier extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="navbar-bottom fixed-bottom">
        <Link to="/">Sign Out</Link>
      </div>
    );
  }
}

export default NavbarSupplier;
