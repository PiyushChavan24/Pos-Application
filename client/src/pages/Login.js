/** @format */

import React, { useEffect } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import "../resources/authentication.css";
import axios from "axios";
import { useDispatch } from "react-redux";
function Register() {
 const dispatch = useDispatch();
 const Navigate = useNavigate();
 const onFinish = (values) => {
  dispatch({ type: "showLoading" });
  axios
   .post("/api/users/login", values)
   .then((res) => {
    dispatch({ type: "hideLoading" });
    message.success("Login succesful please wait for verification");
    localStorage.setItem("pos-user", JSON.stringify(res.data));
    Navigate("/home");
   })
   .catch(() => {
    dispatch({ type: "hideLoading" });
    message.error("Something went wrong");
   });
 };
 useEffect(() => {
  if (localStorage.getItem("pos-user")) {
   Navigate("/home");
  }
 });
 return (
  <div className="authentication">
   {" "}
   <Row>
    <Col lg={8} xs={22}>
     <Form layout="vertical" onFinish={onFinish}>
      <h1>
       <b>Piyush</b>
      </h1>
      <hr />
      <h3>Login</h3>

      <Form.Item
       name="userId"
       label="User ID"
       rules={[{ required: true, message: "Please enter the item price" }]}>
       <Input />
      </Form.Item>
      <Form.Item
       name="password"
       label="Password"
       rules={[{ required: true, message: "Please enter the image URL" }]}>
       <Input type="password" />
      </Form.Item>
      {/* <Form.Item
       name="category"
       label="Category"
       rules={[
        { required: true, message: "Please select a category" },
       ]}></Form.Item> */}
      <div className="d-flex justify-content-between align-items-center">
       <Link to="/register"> click here to register</Link>
       <Button htmlType="submit" type="primary">
        Login
       </Button>
      </div>
     </Form>
    </Col>
   </Row>
  </div>
 );
}

export default Register;
