/** @format */

import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { Col, Row } from "antd";
import Item from "../components/Item";
import "../resources/item.css";
import { useDispatch } from "react-redux";

function Homepage() {
 const [itemsData, setItemData] = useState([]);
 const dispatch = useDispatch();
 const [selectedCategory, setSelectedCategory] = useState("fruits");

 const categories = [
  {
   name: "fruits",
   imageUrl: "https://example.com/fruits.jpg",
  },
  {
   name: "vegetables",
   imageUrl: "https://example.com/vegetables.jpg",
  },
  {
   name: "meat",
   imageUrl: "https://example.com/meat.jpg",
  },
 ];

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

 return (
  <DefaultLayout>
   <div className="d-flex">
    {categories.map((category) => (
     <div
      onClick={() => setSelectedCategory(category.name)}
      className={`d-flex category ${
       selectedCategory == category.name && "selected-category"
      }`}
      key={category.name}>
      <h4>{category.name}</h4>
      <img src={category.imageUrl} height="60" width="80" alt={category.name} />
     </div>
    ))}
   </div>
   <Row gutter={20}>
    {itemsData
     .filter((i) => i.category === selectedCategory)
     .map((item) => (
      <Col xs={24} lg={6} md={12} sm={6} key={item.id}>
       <Item item={item} />
      </Col>
     ))}
   </Row>
  </DefaultLayout>
 );
}

export default Homepage;
