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

function Bills() {
 const componentRef = useRef();
 const [BillsData, setBillsData] = useState(null);
 const [printBillModalVisibility, setPrintBillModalVisibility] =
  useState(false);
 const [selectedBill, setSelectedBill] = useState(null);
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
 const handlePrint = useReactToPrint({
  content: () => componentRef.current,
 });
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
      onClick={() => {
       setSelectedBill(record);
       setPrintBillModalVisibility(true);
      }}
      //  onClick={() => dispatch({ type: "deleteFromCart", payload: record })}
     />
    </div>
   ),
  },
 ];
 const cartcolumns = [
  { title: "Name", dataIndex: "name" },

  {
   title: "Price",
   dataIndex: "price",
  },
  {
   title: "Quantity",
   dataIndex: "_id",
   render: (id, record) => (
    <div>
     <b>{record.quantity}</b>
    </div>
   ),
  },
  {
   title: "Total Fare",
   dataIndex: "_id",
   render: (id, record) => (
    <div>
     <b>{record.quantity * record.price}</b>
    </div>
   ),
  },
 ];
 return (
  <DefaultLayout>
   <div className="d-flex justify-content-between">
    <h3>Items</h3>
   </div>
   <Table columns={columns} dataSource={BillsData} bordered />
   {printBillModalVisibility && (
    <Modal
     visible={printBillModalVisibility}
     title="Bill Details"
     footer={false}
     onCancel={() => {
      setPrintBillModalVisibility(false);
     }}
     width={800}>
     <div className="bill-model p-3" ref={componentRef}>
      <div className="d-flex justify-content-between bill-header pb-2">
       <div>
        <h1>
         <b>Enterprise</b>
        </h1>
       </div>
       <div>
        <p>Palghar</p>
        <p>Boisar 401501</p>
        <p>7219250460</p>
       </div>
      </div>
      <div className="bill-customer-detail mt-2">
       <p>
        Name<b>:{selectedBill.customerName}</b>
       </p>
       <p>
        Phone Number<b>:{selectedBill.customerPhoneNumber}</b>
       </p>
       <p>
        Date<b>:{selectedBill.createdAt.toString().substring(0, 10)}</b>
       </p>
      </div>
      <Table
       dataSource={selectedBill.cartItems}
       columns={cartcolumns}
       pagination={false}
      />
      <div className="dotted-border pb-2">
       <p>
        <b>Sub Total</b> :{selectedBill.subTotal}
       </p>
       <p>
        <b>Tax</b> :{selectedBill.tax}
       </p>
      </div>
      <div>
       <h2>
        <b>Grand Total :{selectedBill.totalAmount}</b>
       </h2>
      </div>
      <div className="dotted-border "></div>

      <div className="text-center">
       <p>Thanks</p>
       <p>Visit Again</p>
      </div>
     </div>
     <div className="d-flex justify-content-end">
      <Button type="primary" onClick={handlePrint}>
       Print Bill
      </Button>
     </div>
    </Modal>
   )}
  </DefaultLayout>
 );
}

export default Bills;
