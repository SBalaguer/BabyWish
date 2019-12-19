import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

export default function ProductComp(props) {
  const style = {
    backgroundImage: `url(${props.pictureUrl})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
    width: "80px",
    height: "80px",
    margin: "0.3em"
  };
  const wishListId = props.wishListFrom;
  console.log(props);

  const checkIfDone = function(check) {
    if (check) {
      return "prod-container-done";
    } else {
      return "prod-container";
    }
  };

  const checkIfDone2 = function(check) {
    if (check) {
      return <img className="list-btn-baby" src="../../happy-baby.png" alt="" />;
    } else if (props.userRole !== "gifter") {
      return (
        <img
          className="list-btn"
          onClick={() => props.removeProduct(props.deleteId)}
          src="../../close.png"
          alt=""
        />
      );
    } else {
      return (
        <button onClick={() => props.addToShoppingCart(props._id)}>
          Buy Product
        </button>
      );
    }
  };

  return (
    <React.Fragment>
      {(props.path === "wishlist" && (
        <div className={checkIfDone(props.done)}>
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
          <div>{checkIfDone2(props.done)}</div>
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

              <small>
                ${props.price}
                {props.category === "diapers" && "/week"}
              </small>
            </div>
          </div>
          <div>
            <img
              onClick={() => props.addProduct(props._id)}
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
