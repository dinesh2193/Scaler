import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../redux/loaderSlice";
import { ForgetPassword } from "../../api/users";

function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true));
      const response = await ForgetPassword(values);
      if (response.success) {
        message.success(response.message);
        navigate(`/reset-password/${values.email}`);
      } else {
        message.error(response.message);
      }
      dispatch(SetLoading(false));
    } catch (err) {
      dispatch(SetLoading(false));
      message.error(err.message);
    }
  };

  return (
    <div className="d-flex" style={{ justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <div style={{ width: 400 }}>
        <h2>Forgot Password</h2>
        <p style={{ color: "#999" }}>Enter your email to receive an OTP</p>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Email is required!" }]}
          >
            <Input type="email" placeholder="Enter your email" />
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Send OTP
            </Button>
            <Button className="mt-3" block onClick={() => navigate("/login")}>
              Back to Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default ForgotPassword;
