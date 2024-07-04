/** @format */

import React, { useState, useEffect, useRef } from "react";
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
import ReactToPrint, { useReactToPrint } from "react-to-print";

function Customers() {
 const componentRef = useRef();
 const [BillsData, setBillsData] = useState(null);

 const dispatch = useDispatch();
 const [editingItem, setEditingItem] = useState(null);

 const getAllBills = () => {
  dispatch({ type: "showLoading" });
  axios
   .get("/api/bills/get-all-bills")
   .then((response) => {
    dispatch({ type: "hideLoading" });
    const data = response.data;
    data.reverse();
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
  {
   title: "Customer",
   dataIndex: "customerName",
  },
  {
   title: "Phone Number",
   dataIndex: "customerPhoneNumber",
  },
  {
   title: "Created on",
   dataIndex: "createdAt",
   render: (value) => <span>{value.toString().substring(0, 10)}</span>,
  },
 ];

 return (
  <DefaultLayout>
   <div className="d-flex justify-content-between">
    <h3>Customers</h3>
   </div>
   <Table columns={columns} dataSource={BillsData} bordered />
  </DefaultLayout>
 );
}

export default Customers;
