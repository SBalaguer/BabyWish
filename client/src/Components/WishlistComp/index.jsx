import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

export default function WishlistComp(props) {
  const style = {
    backgroundImage: `url("https://image.flaticon.com/icons/png/512/868/868517.png")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
    width: "50px",
    height: "50px",
    margin: "0.3em"
  };
  return (
    <div className="prod-container">
      <div className="prod-container_data">
        <div className="prod-container_data-img" style={style}></div>
        <div className="prod-container_data-text">
          <span className="prod-name">{props.name}</span>
        </div>
      </div>
      <div>
        <Link to={`/wishlist/${props._id}`}>
          <img className="list-btn" src="../../view-more.png" alt="" />
        </Link>
        <img
          className="list-btn"
          onClick={() => props.delete(props._id)}
          src="../../close.png"
          alt=""
        />
      </div>
    </div>
  );
}
