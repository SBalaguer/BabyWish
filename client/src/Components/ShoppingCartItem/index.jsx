import React from "react";
import "./style.css";

export default function ShoppingCartItem(product) {
  const productData = product.productData;
  return (
    <tr>
      <th scope="row">
        <img
          style={{ textAlign: "center" }}
          className="single-product-sc_img"
          src={productData.pictureUrl}
          alt="..."
        />
      </th>
      <td style={{ textAlign: "center" }}>x {product.amountBought}</td>
      <td style={{ textAlign: "center" }}>
        $ {product.amountBought * productData.price}
      </td>
    </tr>
  );
}
