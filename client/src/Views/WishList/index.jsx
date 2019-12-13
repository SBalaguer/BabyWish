import React, { Component } from 'react';
import { getWishlistById } from './../../services/wishlist-functions';

export class WishList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wishListToRender: [],
      productsToBuy: [],
      productsToRemove: []
    };
    console.log(props);
  }

  async componentDidMount() {
    const id = this.props.match.params.id;
    console.log('componentDidMount ran before try and the params is:\n' + id);
    try {
      const addWishListToState = await getWishlistById(id);
      console.log(
        'componendDidMount ran on wishlist view and addWishListToState is: \n' +
          addWishListToState
      );
      addWishListToState = addWishListToState.products;
      this.setState({
        wishListToRender: addWishListToState
      });
    } catch (error) {
      throw error;
    }
  }

  // ATTENTION LEO YOU'RE HERE RIGHT NOW

  render() {
    return (
      <div>
        <div className="wish-list-container">
          {this.state.wishListToRender.map(item => {
            return (
              <div className="single-item">
                <h3>{item.productId}</h3>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default WishList;

// {this.state.wishListToRender.map(item => {
//   return (
//     <div className="single-item">
//     <img src={item.pictureUrl} />
//     <h3>{item.name}</h3>
//     </div>
//   )

// })}
