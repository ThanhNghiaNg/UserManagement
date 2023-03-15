import React from "react";
import { Layout, theme } from "antd";
import Sidebar from "../components/Sider/Sider";
const { Header, Content, Footer } = Layout;

function CustomeLayout(props) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout hasSider>
      <Sidebar />
      <Layout
        className="site-layout"
        style={{
          marginLeft: 200,
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        {props.children}
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}

export default CustomeLayout;
