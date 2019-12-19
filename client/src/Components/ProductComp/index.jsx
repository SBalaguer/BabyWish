import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./style.css";

class ProductComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wishListId: this.props.wishListFrom,
      amountToBeBought: 0,
      max: 1
    };
    this.checkIfDone = this.checkIfDone.bind(this);
    this.checkIfDone2 = this.checkIfDone2.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
  }

  //console.log(this.props);
  componentDidMount() {
    const max = this.props.wanted - this.props.bought;
    this.setState({ max });
  }
  checkIfDone(check) {
    if (check) {
      return "prod-container-done";
    } else {
      return "prod-container";
    }
  }

  checkIfDone2(check) {
    if (check) {
      return (
        <img className="list-btn-baby" src="../../happy-baby.png" alt="" />
      );
    } else if (this.props.userRole !== "gifter") {
      return (
        <img
          className="list-btn"
          onClick={() => this.props.removeProduct(this.props.deleteId)}
          src="../../close.png"
          alt=""
        />
      );
    } else {
      const max = this.state.max;
      let price = "";
      if (this.props.category === "diapers") {
        price = this.props.price + "/week";
      } else {
        price = this.props.price;
      }
      return (
        <div className="shopping-cart-info">
          <div className="shopping-cart-info_price">
            <small>{`$ ${price}`}</small>
          </div>
          <div className="shopping-cart-info_others">
            <form>
              <input
                type="number"
                max={`${max}`}
                min="1"
                value={this.state.amountToBeBought}
                onChange={this.handleAmountChange}
              />
            </form>
            <img
              className="list-btn"
              onClick={() =>
                this.props.addToShoppingCart(
                  this.props._id,
                  this.state.amountToBeBought
                )
              }
              src="../../shopping-cart.png"
              alt=""
            />
          </div>
        </div>
      );
    }
  }

  handleAmountChange(event) {
    let value = event.target.value;
    value = parseInt(value);
    if (value > this.state.max) {
      value = this.state.max;
    }
    this.setState({
      amountToBeBought: value
    });
  }

  render() {
    const style = {
      backgroundImage: `url(${this.props.pictureUrl})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      backgroundPosition: "center",
      width: "80px",
      height: "80px",
      margin: "0.3em"
    };
    return (
      <React.Fragment>
        {(this.props.path === "wishlist" && (
          <div className={this.checkIfDone(this.props.done)}>
            <div className="prod-container_data">
              <div className="prod-container_data-img" style={style}></div>
              <div className="prod-container_data-text">
                <h5>{this.props.name}</h5>
                <div className="prod-container_amount">
                  <div className="prod-container_amount_single">
                    <small>Wanted</small>
                    <small>{this.props.wanted}</small>
                  </div>
                  <div className="prod-container_amount_single">
                    <small>Bought</small>
                    <small>{this.props.bought}</small>
                  </div>
                </div>
              </div>
            </div>
            <div>{this.checkIfDone2(this.props.done)}</div>
          </div>
        )) || (
          <Link
            to={{
              pathname: `/products/${this.props._id}`,
              state: {
                wishListId: this.state.wishListId
              }
            }}
            className="prod-container"
          >
            <div className="prod-container_data">
              <div className="prod-container_data-img" style={style}></div>
              <div className="prod-container_data-text">
                <h5>{this.props.name}</h5>
                <small>
                  ${this.props.price}
                  {this.props.category === "diapers" && "/week"}
                </small>
              </div>
            </div>
            <div>
              <img
                onClick={() => this.props.addProduct(this.props._id)}
                src="../../add-blue.png"
                className="prod-container_add-product"
                alt="..."
              />
            </div>
          </Link>
        )}
      </React.Fragment>
    );
  }
}

export default ProductComp;
