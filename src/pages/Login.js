import React, { useState } from "react";
import { Layout, Card, Form, Input, Button, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../styles/Login.css";
import { useRecoilState } from "recoil";
import { userState } from "../store/atoms";

const { Content } = Layout;
const { Title, Text } = Typography;

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useRecoilState(userState);

  const onFinish = async (values) => {
    setLoading(true);
    const { data, error } = await login(values.email, values.password);
    if (data.user && data.session) {
      setUser({ email: values.email });
      message.success("Successfully logged in!");
      navigate("/", { replace: true });
    }
    else message.error(error?.message || "Login failed. Please try again.");
    setLoading(false);
  };

  return (
    <Content className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <div className="text-center mb-8">
          <Title level={2}>Welcome Back</Title>
          <Text type="secondary">Please log in to your account</Text>
        </div>

        <Form name="login" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading} // Show spinner during loading
            >
              Log In
            </Button>
          </Form.Item>

          <div className="text-center">
            <Text>Don't have an account? </Text>
            <Link to="/register">Register now</Link>
          </div>
        </Form>
      </Card>
    </Content>
  );
};

export default Login;
