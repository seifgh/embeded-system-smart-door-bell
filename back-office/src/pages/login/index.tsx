import { KeyOutlined, LoginOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { FC } from "react";
import Logo from "../../components/shared/Logo";
import "./styles.scss";
import { LoginSubmitValues } from "./types";
import LoginImage from "./../../assets/images/login.png";

const LoginPage: FC = () => {
  const onFinish = (values: LoginSubmitValues) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-page">
      <div className="login-intro-side">
        <img src={LoginImage} alt="Login" />
      </div>
      <div className="login-form-side">
        <Form
          name="basic"
          className="login-form"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onSubmitCapture={() => console.log("hello")}
        >
          <Logo className="login-logo" />

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please type your username!" },
              { type: "email", message: "Please insert a valid email" },
            ]}
          >
            <Input
              placeholder="john.doe@mail.com"
              prefix={<UserOutlined />}
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please type your password!" }]}
          >
            <Input.Password
              placeholder="************"
              prefix={<KeyOutlined />}
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              className="submit-btn"
              type="primary"
              htmlType="submit"
              size="large"
            >
              Log in
              <LoginOutlined />
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
