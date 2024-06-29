/** @format */

import React from "react";
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
import { Link } from "react-router-dom";
import "../resources/authentication.css";
function Register() {
 const onFinish = (values) => {
  console.log(values);
 };
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
       name="userid"
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
