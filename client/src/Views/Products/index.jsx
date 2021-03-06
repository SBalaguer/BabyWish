import React, { Component } from 'react';
import ProductComp from './../../Components/ProductComp';
import { listProducts } from './../../services/product-functions';
import Navbar from './../../Components/Navbar';
import { withRouter } from 'react-router-dom';
import { addProductToWishlist } from './../../services/wishlist-functions';
import TopNavbar from './../../Components/TopNavbar';

import './style.css';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      wishListFrom: '',
      searchQuery: '',
      category: [
        'diapers',
        'trolleys',
        'essentials',
        'clothes',
        'toys',
        'uncategorized'
      ]
    };
    this.addUsertoUserState = this.addUsertoUserState.bind(this);
    this.handdleAddProduct = this.handdleAddProduct.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  async componentDidMount() {
    const wishListFrom = this.props.location.state.wishListId;
    try {
      const products = await listProducts();
      //console.log(products);
      this.setState({
        products,
        wishListFrom
      });
    } catch (error) {
      throw error;
    }
  }

  addUsertoUserState(user) {
    this.props.addUsertoUserState(user);
  }

  handleInputChange(event) {
    this.setState({
      searchQuery: event.target.value
    });
  }

  handleSelectChange(event) {
    let cat = event.target.value;
    if (cat === 'all') {
      cat = [
        'diapers',
        'trolleys',
        'essentials',
        'clothes',
        'toys',
        'uncategorized'
      ];
    } else {
      cat = [cat];
    }
    this.setState({
      category: cat
    });
  }

  async handdleAddProduct(productId) {
    const wishlistId = this.state.wishListFrom;
    const amountWanted = 1;
    try {
      const updatedWishlist = await addProductToWishlist(
        wishlistId,
        productId,
        amountWanted
      );
      this.props.history.push(`/wishlist/${wishlistId}`);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const NavbarWithRouter = withRouter(Navbar);
    const user = this.props.userState;
    return (
      <React.Fragment>
        <TopNavbar />
        <div className="app-container">
          <div className="wish-list-container">
            <div className="view-title-products">
              <h1>
                <span className="hi"> Select Products</span>
              </h1>
              <div className="search-form">
                <form>
                  <input
                    onChange={this.handleInputChange}
                    value={this.state.searchQuery}
                    type="search"
                    placeholder="Search"
                    className="form-check select-category"
                  />
                </form>
                <form>
                  <select
                    className="form-check select-category"
                    name="category"
                    onChange={this.handleSelectChange}
                    id=""
                  >
                    <option value="all">All</option>
                    <option value="diapers">Diapers</option>
                    <option value="trolleys">Trolleys</option>
                    <option value="essentials">Essentials</option>
                    <option value="clothes">Clothes</option>
                    <option value="toys">Toys</option>
                    <option value="uncategorized">Others</option>
                  </select>
                </form>
                <img
                  className="search-img"
                  src="../../search-icon.png"
                  alt=""
                />
              </div>
            </div>
            {this.state.products.map(product => {
              if (
                product.name
                  .toLowerCase()
                  .includes(this.state.searchQuery.toLowerCase()) &&
                this.state.category.includes(product.category)
              ) {
                return (
                  <ProductComp
                    key={product._id}
                    {...product}
                    userId={user._id}
                    userRole={user.role}
                    addProduct={productId => {
                      this.handdleAddProduct(productId);
                    }}
                    wishListFrom={this.state.wishListFrom}
                  />
                );
              }
            })}
          </div>
          <NavbarWithRouter
            user={user}
            addUsertoUserState={this.addUsertoUserState}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Products;
