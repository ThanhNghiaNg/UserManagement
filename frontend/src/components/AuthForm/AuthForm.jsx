import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Skeleton, Space } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import useHttp from "../../hooks/useHttp";
import classes from "./AuthForm.module.css";
import { serverURL } from "../../utils/global";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
const AuthForm = (props) => {
  const { error, isLoading, sendRequest } = useHttp();
  const [success, setSucess] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = props.isLogin;

  const submitHandler = (values) => {
    sendRequest(
      {
        url: `${serverURL}/v1/auth/${isLogin ? "login" : "register"}`,
        method: "POST",
        body: {
          ...(isLogin ? {} : { email: values.email }),
          username: values.username,
          password: values.password,
        },
      },
      (data) => {
        console.log(data);
        if (isLogin) {
          dispatch(authActions.login(data._id));
          navigate("/");
        } else {
          setSucess("Register successfully!");
          setTimeout(() => {
            setSucess(null);
            navigate("/login");
          }, [1000]);
        }
      }
    );
  };

  return (
    <div className={classes.wrap}>
      <Form
        name="normal_login"
        className={`login-form ${classes.form}`}
        initialValues={{
          remember: true,
        }}
        onFinish={submitHandler}
      >
        {!isLogin && (
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
        )}
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          {/* <a className="login-form-forgot" href="">
          Forgot password
        </a> */}
        </Form.Item>

        <Form.Item className={classes.center}>
          {success && <p className="text-success">{success}</p>}
          {isLoading && (
            <Space>
              <Skeleton.Input active={true} size={"default"} />
            </Space>
          )}
          {}
          {error && <p className="text-danger">{error}</p>}
          <br />
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            {isLogin ? "Log in" : "Register"}
          </Button>
          <br />
          <div>
            <span>{" Or "}</span>{" "}
            {isLogin && <Link to="/register">register now!</Link>}
            {!isLogin && <Link to="/login">Login now!</Link>}
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
export default AuthForm;
