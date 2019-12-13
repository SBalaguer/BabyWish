import React, { Component } from 'react';
import { getWishlistByUserId } from './../../services/wishlist-functions';
export class AllWishList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wishLists: [],
      newWishListName: '',
      showInput: false
    };
  }

  async componentDidMount(props) {
    const id = this.props.userState._id;
    // const id = this.props.match.params.id;
    try {
      let addWishListToState = await getWishlistByUserId(id);
      console.log(addWishListToState);
      this.setState({
        wishLists: addWishListToState
      });
      //   console.log(
      //     'this state wishlists: \n' + this.state.wishLists.data.wishListByUser
      //   );
    } catch (error) {
      throw error;
    }
  }

  render() {
    // let allWishListsToMap = null;
    // if (this.state.wishLists.data.wishListByUser) {
    //   allWishListsToMap = this.state.wishLists;
    // }
    return (
      <div>
        <div>
          <div className="wish-list-container">
            <h1>this is all wishlists view</h1>
            {this.state.wishLists.map(item => {
              return (
                <div key={item._id} className="single-item">
                  <h3>{item.name}</h3>
                </div>
              );
            })}
            <div>
              <a className="btn">new Wishlist</a>
            </div>
            {showInput && (
              <div>
                <input
                  onChange={this.updateName}
                  value={this.state.newWishListName}
                  placeholder="your new wishlist name"
                />
                <button
                  className="btn"
                  type="submit"
                  onClick={this.createNewWishList}
                >
                  create
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default AllWishList;
