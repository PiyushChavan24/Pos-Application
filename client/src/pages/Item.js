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
 const [itemsData, setItemData] = useState(null);
 const [addEditModalVisibility, setAddEditModalVisibility] = useState(false);
 const dispatch = useDispatch();
 const [editingItem, setEditingItem] = useState(null);

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
  if (editingItem == null) {
   axios
    .post("/api/items/add-items", values)
    .then((response) => {
     dispatch({ type: "hideLoading" });
     message.success("Item added successfully");
     setAddEditModalVisibility(false);
     getAllItems();
    })
    .catch((error) => {
     dispatch({ type: "hideLoading" });
     message.error("Something went wrong");
     console.log(error);
    });
  } else {
   axios
    .post("/api/items/edit-items", { ...values, itemId: editingItem._id })
    .then((response) => {
     dispatch({ type: "hideLoading" });
     message.success("Item updated successfully");
     setEditingItem(null);
     setAddEditModalVisibility(false);
     getAllItems();
    })
    .catch((error) => {
     dispatch({ type: "hideLoading" });
     message.error("Something went wrong");
     console.log(error);
    });
  }
 };

 const columns = [
  { title: "Name", dataIndex: "name" },
  {
   title: "Image",
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
  {
   title: "Action",
   dataIndex: "_id",
   render: (id, record) => (
    <div className="d-flex">
     <EditOutlined
      className="mx-2"
      onClick={() => {
       setEditingItem(record);
       setAddEditModalVisibility(true);
      }}
     />
     <DeleteOutlined
      className="mx-2"
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
   <Table columns={columns} dataSource={itemsData} bordered />
   {addEditModalVisibility && (
    <Modal
     visible={addEditModalVisibility}
     title={`${editingItem !== null ? "Edit Item" : "Add Item"}`}
     footer={false}
     onCancel={() => {
      setEditingItem(null);
      setAddEditModalVisibility(false);
     }}>
     <Form initialValues={editingItem} layout="vertical" onFinish={onFinish}>
      <Form.Item
       name="name"
       label="Name"
       rules={[{ required: true, message: "Please enter the item name" }]}>
       <Input />
      </Form.Item>
      <Form.Item
       name="price"
       label="Price"
       rules={[{ required: true, message: "Please enter the item price" }]}>
       <Input />
      </Form.Item>
      <Form.Item
       name="image"
       label="Image URL"
       rules={[{ required: true, message: "Please enter the image URL" }]}>
       <Input />
      </Form.Item>
      <Form.Item
       name="category"
       label="Category"
       rules={[{ required: true, message: "Please select a category" }]}>
       <Select>
        <Select.Option value="fruits">Fruits</Select.Option>
        <Select.Option value="vegetables">Vegetables</Select.Option>
        <Select.Option value="meat">Meat</Select.Option>
       </Select>
      </Form.Item>
      <div className="d-flex justify-content-end">
       <Button htmlType="submit" type="primary">
        SAVE
       </Button>
      </div>
     </Form>
    </Modal>
   )}
  </DefaultLayout>
 );
}

export default Item;
