/** @format */

import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
import {
 DeleteOutlined,
 PlusCircleOutlined,
 MinusCircleOutlined,
} from "@ant-design/icons";

function CartPage() {
 const dispatch = useDispatch();
 const increaseQuantity = (record) => {
  dispatch({
   type: "updateCart",
   payload: { ...record, quantity: record.quantity + 1 },
  });
 };
 const decreaseQuantity = (record) => {
  if (record.quantity !== 1) {
   dispatch({
    type: "updateCart",
    payload: { ...record, quantity: record.quantity - 1 },
   });
  }
 };
 const { cartItems } = useSelector((state) => state.rootReducer);
 const columns = [
  { title: "Name", dataIndex: "name" },
  {
   Image: "Image",
   dataIndex: "image",
   render: (image, record) => <img src={image} alt="" height="60" width="70" />,
  },
  {
   title: "Price",
   dataIndex: "price",
  },
  {
   title: "Quantity",
   dataIndex: "_id",
   render: (id, record) => (
    <div>
     <PlusCircleOutlined
      className="mx-3"
      onClick={() => increaseQuantity(record)}
     />
     <b>{record.quantity}</b>
     <MinusCircleOutlined
      className="mx-3"
      onClick={() => decreaseQuantity(record)}
     />
    </div>
   ),
  },
  {
   title: "Action",
   dataIndex: "_id",
   render: (id, record) => (
    <DeleteOutlined
     onClick={() => dispatch({ type: "deleteFromCart", payload: record })}
    />
   ),
  },
 ];
 return (
  <DefaultLayout>
   <Table columns={columns} dataSource={cartItems} bordered />
  </DefaultLayout>
 );
}

export default CartPage;
