import { KeyOutlined, LoginOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Spin } from "antd";
import { FC, useState } from "react";
import Logo from "../../components/shared/Logo";
import "./styles.scss";
import { LoginSubmitValues } from "./types";
import LoginImage from "./../../assets/images/login.png";
import authenticationService from "../../api/services/authentication";
import { useStore } from "../../store/StoreContext";
import {
  notifyLoginError,
  notifyLoginSuccess,
} from "../../utils/notifications";

const LoginPage: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    actions: { setAdmin },
  } = useStore();

  const onFinish = (values: LoginSubmitValues) => {
    setIsLoading(true);
    authenticationService
      .login(values.email, values.password)
      .then((data) => {
        notifyLoginSuccess(data.fullName);
        setAdmin(data);
      })
      .catch(notifyLoginError)
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="login-page">
      <div className="login-intro-side">
        <img src={LoginImage} alt="Login" />
      </div>
      <div className="login-form-side">
        <Spin spinning={isLoading}>
          <Form
            name="basic"
            className="login-form"
            layout="vertical"
            onFinish={onFinish}
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
              rules={[
                { required: true, message: "Please type your password!" },
              ]}
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
        </Spin>
      </div>
    </div>
  );
};

export default LoginPage;
