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
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "../resources/item.css";
import { useDispatch } from "react-redux";
function Item() {
 const [itemsData, setItemData] = useState([]);
 const [addEditModalVisibility, setAddEditModalVisibility] = useState(false);
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
 const onFinish = (values) => {
  dispatch({ type: "showLoading" });
  axios
   .post("/api/items/add-items", values)
   .then((response) => {
    dispatch({ type: "hideLoading" });
    message.success("items added successfully");
    setAddEditModalVisibility(false);
    getAllItems();
   })
   .catch((error) => {
    dispatch({ type: "hideLoading" });
    message.error("something went wrong");
    console.log(error);
   });
 };
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
   <div className="d-flex justify-content-between">
    <h3>Items</h3>'
    <Button type="primary" onClick={() => setAddEditModalVisibility(true)}>
     Add Item
    </Button>
   </div>
   <Table columns={columns} dataSource={itemsData} bordered />
   <Modal
    visible={addEditModalVisibility}
    title="Add New Item"
    footer={false}
    onCancel={() => {
     setAddEditModalVisibility(false);
    }}>
    <Form layout="vertical" onFinish={onFinish}>
     <Form.Item name="name" label="Name">
      <Input />
     </Form.Item>
     <Form.Item name="price" label="Price">
      <Input />
     </Form.Item>
     <Form.Item name="image" label="Image Url">
      <Input />
     </Form.Item>
     <Form.Item name="category" label="Name">
      <Select>
       <Select.Option value="fruits">Fruits</Select.Option>
       <Select.Option value="vegetables">Vegetables</Select.Option>
       <Select.Option value="Meat">Meat</Select.Option>
      </Select>
     </Form.Item>
     <div className="d-flex justify-content-end">
      <Button htmlType="submit" type="primary">
       SAVE
      </Button>
     </div>
    </Form>
   </Modal>
  </DefaultLayout>
 );
}

export default Item;
