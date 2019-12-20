import React, { Component } from 'react';
import { singleProduct } from './../../services/product-functions';
import Navbar from './../../Components/Navbar';
import { withRouter } from 'react-router-dom';
import { addProductToWishlist } from './../../services/wishlist-functions';
import TopNavbar from './../../Components/TopNavbar';
import './style.css';

class SingleProductView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountWanted: '',
      userId: this.props.userState._id,
      wishListFrom: '',
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
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        width: 'auto',
        height: '30vh'
      };
    }

    return (
      <React.Fragment>
        <TopNavbar />
        {this.state.product && (
          <div className="app-container">
            <div className="single-prod-container">
              <div className="single-prod-container_product">
                <div className="single-prod-container_product_image-container">
                  <img
                    className="single-prod-container_product_image"
                    src={product.pictureUrl}
                    alt="..."
                  />
                </div>
                <div className="single-prod-container_product_tex-container">
                  <small>{product.category}</small>
                  <h3>{product.name}</h3>
                  <h5>
                    ${product.price}
                    {product.category === 'diapers' && '/week'}
                  </h5>
                </div>
              </div>
              <div className="single-prod-form-container">
                <form onSubmit={this.handleAddClick}>
                  <div className="form-check" style={{ paddingLeft: '0px' }}>
                    <input
                      className="form-control"
                      type="number"
                      name="amountWanted"
                      value={this.state.amountWanted}
                      onChange={this.handleInputChange}
                      placeholder="How many?"
                      min="1"
                    />
                  </div>
                  {(user.role !== 'gifter' && (
                    <button className="btn btn-product-view btn-block">
                      Add to Wishlist
                    </button>
                  )) || (
                    <button className="btn btn-product-view btn-block">
                      Add to Cart
                    </button>
                  )}
                </form>
              </div>
            </div>
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
