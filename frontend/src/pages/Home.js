import React from "react";
import UserList from "../components/UserList/UserList";
import { Layout, theme } from "antd";
const { Header } = Layout;

function Home(props) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div>
      <Header
        style={{
          paddingLeft: 20,
          background: colorBgContainer,
        }}
      >
        <p className="fs-3 mb-0">User List</p>
      </Header>
      <UserList />
    </div>
  );
}

export default Home;
