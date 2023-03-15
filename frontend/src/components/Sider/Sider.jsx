import {
  LogoutOutlined,
  UserOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import React from "react";
import { Layout } from "antd";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authSlice";
import useHttp from "../../hooks/useHttp";
import { serverURL } from "../../utils/global";
const { Sider } = Layout;

function Sidebar(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sendRequest } = useHttp();
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const logoutHandler = async () => {
    sendRequest(
      {
        url: `${serverURL}/v1/auth/logout`,
        method: "POST",
      },
      (data) => {
        navigate("/login");
        dispatch(authActions.logout());
      }
    );
  };

  const listItems = [
    { icon: UserOutlined, label: "User List", href: "/users" },
    { icon: UserAddOutlined, label: "Add User", href: "/add-users" },
    {
      icon: LogoutOutlined,
      label: "Logout",
      action: logoutHandler,
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
      <div className="m-3 bg-secondary">
        <p className="text-light text-center">{isAdmin ? "Admin" : "User"}</p>
      </div>
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
