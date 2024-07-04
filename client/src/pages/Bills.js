/** @format */

import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import {
 Button,
 Col,
 Form,
 Input,
 Modal,
 Row,
 Table,
 Select,
 message,
} from "antd";
import { EyeOutlined } from "@ant-design/icons";
import "../resources/item.css";
import { useDispatch } from "react-redux";

function Bills() {
 const [BillsData, setBillsData] = useState(null);
 const [addEditModalVisibility, setAddEditModalVisibility] = useState(false);
 const dispatch = useDispatch();
 const [editingItem, setEditingItem] = useState(null);

 const getAllBills = () => {
  dispatch({ type: "showLoading" });
  axios
   .get("/api/bills/get-all-bills")
   .then((response) => {
    dispatch({ type: "hideLoading" });
    setBillsData(response.data);
   })
   .catch((error) => {
    dispatch({ type: "hideLoading" });
    console.log(error);
   });
 };

 useEffect(() => {
  getAllBills();
 }, []);

 const columns = [
  { title: "ID", dataIndex: "_id" },
  {
   title: "Customer",
   dataIndex: "customerName",
  },
  {
   title: "SubTotal",
   dataIndex: "subTotal",
  },
  {
   title: "Tax",
   dataIndex: "tax",
  },
  {
   title: "Total",
   dataIndex: "totalAmount",
  },
  {
   title: "Action",
   dataIndex: "_id",
   render: (id, record) => (
    <div className="d-flex">
     <EyeOutlined
      className="mx-2"
      //   onClick={() => deleteItem(record)}
      //  onClick={() => dispatch({ type: "deleteFromCart", payload: record })}
     />
    </div>
   ),
  },
 ];

 return (
  <DefaultLayout>
   <div className="d-flex justify-content-between">
    <h3>Items</h3>
    <Button type="primary" onClick={() => setAddEditModalVisibility(true)}>
     Add Item
    </Button>
   </div>
   <Table columns={columns} dataSource={BillsData} bordered />
   {addEditModalVisibility && (
    <Modal
     visible={addEditModalVisibility}
     title={`${editingItem !== null ? "Edit Item" : "Add Item"}`}
     footer={false}
     onCancel={() => {
      setEditingItem(null);
      setAddEditModalVisibility(false);
     }}></Modal>
   )}
  </DefaultLayout>
 );
}

export default Bills;
