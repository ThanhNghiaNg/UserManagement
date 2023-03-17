import React from "react";
import UserForm from "../components/UserForm/UserForm";
import { Layout, theme } from "antd";
const { Header } = Layout;

function UpdateUser(props) {
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
      <UserForm edit={true} />
    </div>
  );
}

export default UpdateUser;
