import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

export default function ProductComp(props) {
  const style = {
    backgroundImage: `url(${props.pictureUrl})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
    width: "100px",
    height: "100px",
    margin: "0.3em"
  };
  const wishListId = props.wishListFrom;
  // console.log(props);
  return (
    <React.Fragment>
      {(props.path === "wishlist" && (
        <div className="prod-container">
          <div className="prod-container_data">
            <div className="prod-container_data-img" style={style}></div>
            <div className="prod-container_data-text">
              <h5>{props.name}</h5>
              <div className="prod-container_amount">
                <div className="prod-container_amount_single">
                  <small>Wanted</small>
                  <small>{props.wanted}</small>
                </div>
                <div className="prod-container_amount_single">
                  <small>Bought</small>
                  <small>{props.bought}</small>
                </div>
              </div>
            </div>
          </div>
          <div>
            {(props.userRole !== "gifter" && (
              <button onClick={() => props.removeProduct(props.deleteId)}>
                Remove
              </button>
            )) || (
              <button onClick={() => props.addToShoppingCart(props._id)}>
                Buy Product
              </button>
            )}
          </div>
        </div>
      )) || (
        <Link
          to={{
            pathname: `/products/${props._id}`,
            state: {
              wishListId: wishListId
            }
          }}
          className="prod-container"
        >
          <div className="prod-container_data">
            <div className="prod-container_data-img" style={style}></div>
            <div className="prod-container_data-text">
              <h5>{props.name}</h5>
              <small>${props.price}</small>
            </div>
          </div>
          <div>
            <button onClick={() => props.addProduct(props._id)}>Add</button>
          </div>
        </Link>
      )}
    </React.Fragment>
  );
}
