/** @format */

import { Button } from "antd";
import React from "react";
import { useDispatch } from "react-redux";

function Item({ item }) {
 return (
  <div className="item">
   <h4 className="name">{item.name}</h4>
   <img src={item.image} alt={item.name} height="100" width="100" />
   <h4 className="price">
    <b>Price</b> {item.price} $/-
   </h4>
  </div>
 );
}

export default Item;
