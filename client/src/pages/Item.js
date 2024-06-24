/** @format */

import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { Col, Row, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "../resources/item.css";
import { useDispatch } from "react-redux";
function Item() {
 const [itemsData, setItemData] = useState([]);
 const dispatch = useDispatch();
 const getAllItems = () => {
  dispatch({ type: "showLoading" });
  axios
   .get("/api/items/get-all-items")
   .then((response) => {
    dispatch({ type: "hideLoading" });
    setItemData(response.data);
   })
   .catch((error) => {
    dispatch({ type: "hideLoading" });
    console.log(error);
   });
 };

 useEffect(() => {
  getAllItems();
 }, []);
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
   title: "Category",
   dataIndex: "category",
  },
  //   {
  //    title: "Quantity",
  //    dataIndex: "_id",
  //    render: (id, record) => (
  //     <div>
  //      <PlusCircleOutlined
  //       className="mx-3"
  //       onClick={() => increaseQuantity(record)}
  //      />
  //      <b>{record.quantity}</b>
  //      <MinusCircleOutlined
  //       className="mx-3"
  //       onClick={() => decreaseQuantity(record)}
  //      />
  //     </div>
  //    ),
  //   },
  {
   title: "Action",
   dataIndex: "_id",
   render: (id, record) => (
    <div className="d-flex">
     {" "}
     <DeleteOutlined
      className="mx-2"
      //  onClick={() => dispatch({ type: "deleteFromCart", payload: record })}
     />
     <EditOutlined className="mx-2" />
    </div>
   ),
  },
 ];
 return (
  <DefaultLayout>
   <Table columns={columns} dataSource={itemsData} bordered></Table>
  </DefaultLayout>
 );
}

export default Item;
