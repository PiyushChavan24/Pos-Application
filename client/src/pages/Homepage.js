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
   <Row gutter={20}>
    {/*gutter is used to apply spacee bteween column*/}
    {itemsData.map((item) => (
     <Col xs={24} lg={6} md={12} sm={6}>
      <Item item={item} />
     </Col>
    ))}
   </Row>
  </DefaultLayout>
 );
}

export default Homepage;
