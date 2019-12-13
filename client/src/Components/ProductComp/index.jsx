import React from "react";
import { Link } from "react-router-dom";

export default function ProductComp(props) {
  return (
    <Link to={`/products/${props._id}`}>
      <div>
        <h5>{props.name}</h5>
        <img src={props.pictureUrl} alt="..." style={{ maxWidth: "100px" }} />
        <small>{props.price}</small>
      </div>
    </Link>
  );
}
