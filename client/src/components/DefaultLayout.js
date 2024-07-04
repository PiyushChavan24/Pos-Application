/** @format */

import React, { useState, useEffect } from "react";
import {
 MenuFoldOutlined,
 MenuUnfoldOutlined,
 UploadOutlined,
 UserOutlined,
 LogoutOutlined,
 HomeOutlined,
 ShoppingCartOutlined,
 CopyOutlined,
 UnorderedListOutlined,
} from "@ant-design/icons";
import "../resources/layout.css";
import { Link, useNavigate } from "react-router-dom";
import { Button, Layout, Menu, theme } from "antd";
import { useSelector } from "react-redux";
const { Header, Sider, Content } = Layout;
const DefaultLayout = (props) => {
 const [collapsed, setCollapsed] = useState(false);
 const { cartItems, loading } = useSelector((state) => state.rootReducer);
 const navigate = useNavigate();
 const {
  token: { colorBgContainer, borderRadiusLG },
 } = theme.useToken();
 useEffect(() => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
 }, [cartItems]);
 return (
  <Layout>
   {loading && (
    <div className="spinner">
     <div class="spinner-border" role="status"></div>
    </div>
   )}
   <Sider trigger={null} collapsible collapsed={collapsed}>
    <div className="demo-logo-vertical">
     <h3>{collapsed ? "SM" : "Shopping Mall"}</h3> {/*to change the logo*/}
    </div>
    <Menu
     theme="dark"
     mode="inline"
     defaultSelectedKeys={window.location.pathname}>
     {/*window.location.pathname is used to highlight the current page name in sidebar */}
     <Menu.Item key="/home" icon={<HomeOutlined />}>
      <Link className={`no-underline `} to={"/home"}>
       Home
      </Link>
     </Menu.Item>
     <Menu.Item key="/cart" icon={<ShoppingCartOutlined />}>
      <Link className={`no-underline `} to={"/cart"}>
       Cart
      </Link>
     </Menu.Item>
     <Menu.Item key="/bills" icon={<CopyOutlined />}>
      <Link className={`no-underline `} to={"/bills"}>
       Bills
      </Link>
     </Menu.Item>
     <Menu.Item key="/items" icon={<UnorderedListOutlined />}>
      <Link className={`no-underline `} to={"/items"}>
       Items
      </Link>
     </Menu.Item>
     <Menu.Item key="/customers" icon={<UserOutlined />}>
      <Link className={`no-underline `} to={"/customers"}>
       Customers
      </Link>
     </Menu.Item>
     <Menu.Item
      key="/logout"
      icon={<LogoutOutlined />}
      onClick={() => {
       localStorage.removeItem("pos-user");
       navigate("/login");
      }}>
      <Link className={`no-underline `} to={"/logout"}>
       LogOut
      </Link>
     </Menu.Item>
    </Menu>
   </Sider>
   <Layout>
    <Header
     style={{
      padding: 10,
      background: colorBgContainer,
     }}>
     <Button
      className=".button"
      type="text"
      icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      onClick={() => setCollapsed(!collapsed)}
      style={{
       fontSize: "16px",
       width: 64,
       height: 64,
       backgroundColor: collapsed ? "#fff" : "#fff",
      }}
     />
     <div
      className="cart-count d-flex align-items-center"
      onClick={() => navigate("/cart")}>
      <b>
       <p className="mt-3 mr-2">{cartItems.length}</p>
      </b>
      <ShoppingCartOutlined />
     </div>
    </Header>
    <Content
     className="site-layout-background"
     style={{
      margin: "10px",
      padding: 24,
      minHeight: "80vh",
      background: colorBgContainer,
      borderRadius: borderRadiusLG,
     }}>
     {props.children}
    </Content>
   </Layout>
  </Layout>
 );
};
export default DefaultLayout;
