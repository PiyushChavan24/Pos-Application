/** @format */

import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Table } from "antd";
import {
 DeleteOutlined,
 PlusCircleOutlined,
 MinusCircleOutlined,
} from "@ant-design/icons";
import { Col, Form, Input, Row, Select, message } from "antd";
import axios from "axios";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
function CartPage() {
 const dispatch = useDispatch();
 const [billChargeModal, setBillChargeModal] = useState(false);
 const [subtotal, setSubtotal] = useState(0);
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
 const navigate = useNavigate();
 const onFinish = (values) => {
  const reqObject = {
   ...values,
   subTotal: subtotal,
   cartItems,
   tax: Number((subtotal * 0.1).toFixed(2)),
   totalAmount: Number((subtotal * 1.1).toFixed(2)),
   userId: JSON.parse(localStorage.getItem("pos-user"))._id,
  };

  console.log("Request Payload:", reqObject); // Log the request payload

  axios
   .post("/api/bills/charge-bill", reqObject)
   .then(() => {
    message.success("Bill Charged Successfully");
    navigate("/bills");
   })
   .catch((error) => {
    console.error("Error charging bill:", error);
    message.error(error.response?.data?.details || "Something went wrong");
   });
 };

 useEffect(() => {
  let temp = 0;
  cartItems.forEach((item) => {
   temp = temp + item.price * item.quantity;
  });
  setSubtotal(temp);
 }, [cartItems]);
 return (
  <DefaultLayout>
   <Table columns={columns} dataSource={cartItems} bordered />
   <hr />
   <div className="d-flex justify-content-end flex-column align-items-end">
    <div className="subtotal">
     <h1>
      Sub Total :<b>{subtotal}$/-</b>
     </h1>
    </div>
    <Button
     type="primary"
     onClick={() => {
      setBillChargeModal(true);
     }}>
     Charge Bill
    </Button>
   </div>
   <Modal
    title="Charge Bill"
    visible={billChargeModal}
    footer={false}
    onCancel={() => {
     setBillChargeModal(false);
    }}>
    <Form layout="vertical" onFinish={onFinish}>
     <Form.Item
      name="customerName"
      label="Customer Name"
      rules={[{ required: true, message: "Please enter the item name" }]}>
      <Input />
     </Form.Item>
     <Form.Item
      name="customerPhoneNumber"
      label=" Customer Phone Number"
      rules={[{ required: true, message: "Please enter the item price" }]}>
      <Input />
     </Form.Item>

     <Form.Item
      name="paymentMode"
      label="Payment Mode"
      rules={[{ required: true, message: "Please select a category" }]}>
      <Select>
       <Select.Option value="Cash">Cash</Select.Option>
       <Select.Option value="Card">Card</Select.Option>
      </Select>
     </Form.Item>
     <div className="charge-bill-amount">
      <h5>
       subtotal:<b>{subtotal}</b>
      </h5>
      <h5>
       Tax: <b>{((subtotal / 100) * 10).toFixed(2)}</b>
      </h5>
      <hr></hr>
      <h2>
       Grand Total :<b>{subtotal + (subtotal / 100) * 10}</b>
      </h2>
     </div>
     <div className="d-flex justify-content-end">
      <Button htmlType="submit" type="primary">
       Generate Bill
      </Button>
     </div>
    </Form>
   </Modal>
  </DefaultLayout>
 );
}

export default CartPage;
