/** @format */

import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector } from "react-redux";
import { Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

function CartPage() {
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
  },
  {
   title: "Action",
   dataIndex: "_id",
   render: (id, record) => <DeleteOutlined />,
  },
 ];
 return (
  <DefaultLayout>
   <Table columns={columns} dataSource={cartItems} bordered />
  </DefaultLayout>
 );
}

export default CartPage;
