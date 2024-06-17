/** @format */

import React, { useState } from "react";
import {
 MenuFoldOutlined,
 MenuUnfoldOutlined,
 UploadOutlined,
 UserOutlined,
 LogoutOutlined,
 HomeOutlined,
 CopyOutlined,
 UnorderedListOutlined,
} from "@ant-design/icons";
import "../resources/layout.css";
import { Link } from "react-router-dom";
import { Button, Layout, Menu, theme } from "antd";
const { Header, Sider, Content } = Layout;
const DefaultLayout = (props) => {
 const [collapsed, setCollapsed] = useState(false);
 const {
  token: { colorBgContainer, borderRadiusLG },
 } = theme.useToken();
 return (
  <Layout>
   <Sider trigger={null} collapsible collapsed={collapsed}>
    <div className="demo-logo-vertical">
     <h3>Piyush</h3> {/*to change the logo*/}
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
     <Menu.Item key="/logout" icon={<LogoutOutlined />}>
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
      type="text"
      icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      onClick={() => setCollapsed(!collapsed)}
      style={{
       fontSize: "16px",
       width: 64,
       height: 64,
      }}
     />
    </Header>
    <Content
     style={{
      margin: "10px",
      padding: 24,
      minHeight: 280,
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
