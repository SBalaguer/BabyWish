import React, { Component } from "react";
import { singleProduct } from "./../../services/product-functions";
import Navbar from "./../../Components/Navbar";
import { withRouter } from "react-router-dom";
import { addProductToWishlist } from "./../../services/wishlist-functions";
import "./style.css";

class SingleProductView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountWanted: 1,
      userId: this.props.userState._id,
      wishListFrom: "",
      renderWishlist: false
    };
    this.addUsertoUserState = this.addUsertoUserState.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async componentDidMount() {
    const wishListFrom = this.props.location.state.wishListId;
    try {
      const productId = this.props.match.params.id;
      const product = await singleProduct(productId);
      this.setState({ product, wishListFrom });
    } catch (error) {
      throw error;
    }
  }

  addUsertoUserState(user) {
    this.props.addUsertoUserState(user);
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: Number(value)
    });
  }

  async handleAddClick(event) {
    event.preventDefault();
    const wishlistId = this.state.wishListFrom;
    const prodId = this.state.product._id;
    const amountWanted = this.state.amountWanted;
    try {
      const updatedWishlist = await addProductToWishlist(
        wishlistId,
        prodId,
        amountWanted
      );
      this.props.history.push(`/wishlist/${wishlistId}`);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const product = this.state.product;
    const user = this.props.userState;
    const NavbarWithRouter = withRouter(Navbar);
    let style = {};
    if (product) {
      style = {
        backgroundImage: `url(${product.pictureUrl})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center",
        width: "100%",
        height: "70%",
        margin: "0.3em",
        marginTop: "3em"
      };
    }

    return (
      <React.Fragment>
        {this.state.product && (
          <div className="single-prod-container">
            <div className="single-prod-container_product">
              <div style={style}></div>
              <small>{product.category}</small>
              <h3>{product.name}</h3>
              <h5>${product.price}</h5>
              <div>Here goes the Specs</div>
            </div>
            <form onSubmit={this.handleAddClick}>
              <input
                type="number"
                name="amountWanted"
                value={this.state.amountWanted}
                onChange={this.handleInputChange}
                min="1"
              />
              {(user.role !== "gifter" && (
                <button className="btn btn-start btn-block">
                  Add to Wishlist
                </button>
              )) || (
                <button className="btn btn-start btn-block">Add to Cart</button>
              )}
            </form>
          </div>
        )}
        <NavbarWithRouter
          user={user}
          addUsertoUserState={this.addUsertoUserState}
        />
      </React.Fragment>
    );
  }
}

export default SingleProductView;
