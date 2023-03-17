import React, { useEffect, useRef, useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Skeleton, Space } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import classes from "./UserForm.module.css";
import useHttp from "../../hooks/useHttp";
import { serverURL } from "../../utils/global";
function UserForm(props) {
  const id = useParams().id;
  const navigate = useNavigate();
  const { isLoading, sendRequest, error } = useHttp();
  const formRef = useRef();

  const submitHandler = (values) => {
    sendRequest(
      {
        url: `${serverURL}/v1/user/${id}/update`,
        body: { username: values.username, email: values.email },
        method: "PUT",
      },
      (data) => {
        console.log(data);
        navigate("/users");
      }
    );
  };

  useEffect(() => {
    if (props.edit) {
      sendRequest({ url: `${serverURL}/v1/user/${id}` }, (data) => {
        console.log(formRef);
        formRef.current.setFieldsValue(data);
      });
    }
  }, [id]);

  return (
    <div>
      <Form
        name="normal_login"
        className={`login-form ${classes.form}`}
        initialValues={{
          remember: true,
        }}
        onFinish={submitHandler}
        ref={formRef}
      >
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
            prefix={
              <>
                <UserOutlined className="site-form-item-icon" />
                <span>Email:</span>
              </>
            }
            placeholder="Email"
          />
        </Form.Item>

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
            prefix={
              <>
                <UserOutlined className="site-form-item-icon" />
                <span>Username:</span>
              </>
            }
            placeholder="Username"
          />
        </Form.Item>

        <Form.Item className={classes.center}>
          {isLoading && (
            <Space className="mb-3">
              <Skeleton.Input active={true} size={"default"} />
            </Space>
          )}
          {error && <p className="text-danger mb-0">{error}</p>}
          <br />
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default UserForm;
