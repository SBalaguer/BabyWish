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
  return (
    <Link to={`/products/${props._id}`} className="prod-container">
      <div className="prod-container_data">
        <div className="prod-container_data-img" style={style}></div>
        <div className="prod-container_data-text">
          <h5>{props.name}</h5>
          <small>${props.price}</small>
        </div>
      </div>
      <div>
        {(props.userRole !== "gifter" && <button>Add</button>) || (
          <button>Buy</button>
        )}
      </div>
    </Link>
  );
}
