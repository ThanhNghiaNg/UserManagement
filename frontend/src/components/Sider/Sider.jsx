import {
  LogoutOutlined,
  UserOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import React from "react";
import { Layout } from "antd";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
const { Sider } = Layout;

function Sidebar(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const listItems = [
    { icon: UserOutlined, label: "User List", href: "/users" },
    { icon: UserAddOutlined, label: "Add User", href: "/users" },
    {
      icon: LogoutOutlined,
      label: "Logout",
      action: () => {
        navigate("/login");
        dispatch(authActions.logout());
        console.log("logout");
      },
    },
  ];
  const items = listItems.map((item, idx) => {
    return {
      key: idx,
      icon: React.createElement(item.icon),
      label: item.label,
      ...{
        onClick: item.action
          ? item.action
          : () => {
              navigate(item.href);
            },
      },
    };
  });
  return (
    <Sider
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div
        style={{
          height: 32,
          margin: 16,
          background: "rgba(255, 255, 255, 0.2)",
        }}
      />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={items}
      />
    </Sider>
  );
}

export default Sidebar;
