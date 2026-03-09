import React from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../redux/loaderSlice";
import { ResetPassword } from "../../api/users";

function ResetPasswordPage() {
  const { email } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true));
      const response = await ResetPassword(email, values);
      if (response.success) {
        message.success(response.message);
        navigate("/login");
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
        <h2>Reset Password</h2>
        <p style={{ color: "#999" }}>Enter the OTP sent to {email}</p>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="OTP"
            name="otp"
            rules={[{ required: true, message: "OTP is required!" }]}
          >
            <Input placeholder="Enter 6-digit OTP" />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="password"
            rules={[{ required: true, message: "Password is required!" }]}
          >
            <Input.Password placeholder="Enter new password" />
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Reset Password
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

export default ResetPasswordPage;
