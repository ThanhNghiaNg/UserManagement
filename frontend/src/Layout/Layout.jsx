import classes from './Layout.module.css'
import React from "react";
import Sidebar from "../components/Sider/Sider";
import { Layout, theme } from "antd";
const { Footer } = Layout;

function CustomeLayout(props) {
  
  return (
    <Layout hasSider>
      <Sidebar />
      <Layout
        className="site-layout"
        style={{
          marginLeft: 200,
        }}
      >
        
        <div className={classes.wrapper}>{props.children}</div>
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
