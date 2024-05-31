import { IonContent, IonFooter, IonPage } from "@ionic/react";
import { Button, Form, Input, Typography, message } from "antd";
import { Link, useHistory } from "react-router-dom";
import Heading from "../../../components/heading/Heading";
import "../login/Login.css";
import { END_POINTS } from "../../../utils/constant";
import { useMutation } from "@tanstack/react-query";
import CustomerAPI from "../../../api/Customer";
import { onHandleErrorAPIResponse } from "../../../utils/helper";
import { SignUpCustomerAccountTypes } from "../../../api/Customer/type";

const Register: React.FC = () => {
  const history = useHistory();
  const { mutate, isLoading: isLoadingSignUp } = useMutation({
    mutationFn: CustomerAPI.SignUpAccount,
    onSuccess: () => {
      message.success("Create a new account is successfully"),
        history.push(END_POINTS.AUTHENTICATION.LOGIN);
    },
    onError: (errorResponse) => {
      onHandleErrorAPIResponse(errorResponse);
    },
  });

  const [form] = Form.useForm();

  const onFinish = (values: SignUpCustomerAccountTypes) => {
    mutate(values);
  };

  return (
    <IonPage className="layout-auth">
      <IonContent className="main" scrollY={true}>
        <div className="header">
          <Heading
            title="Create Account"
            helper="Signup to get started"
            level={3}
            titleSize={20}
          />
        </div>

        <Form onFinish={onFinish} form={form}>
          <div className="image-auth">
            <img src="/img/smarthome.png" alt="logo" />
          </div>
          <Form.Item
            name="fullName"
            rules={[{ required: true, message: "Full Name is required!" }]}
          >
            <Input placeholder="Full Name" style={{ height: "40px" }} />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            rules={[
              { required: true, message: "Phone number is required" },
              {
                pattern: /^0\d{9}$/,
                message:
                  "Please enter a valid 10-digit phone number starting with 0!",
              },
            ]}
          >
            <Input placeholder="Mobile Phone" style={{ height: "40px" }} />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email address!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input placeholder="Email Address" style={{ height: "40px" }} />
          </Form.Item>
          <Form.Item
            name="address"
            rules={[{ required: true, message: "Address is required!" }]}
          >
            <Input placeholder="Address" style={{ height: "40px" }} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Password is required" },
              {
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                message:
                  "Password must at least 8 characters, one letter and one number",
              },
            ]}
          >
            <Input.Password
              placeholder="Password"
              style={{ height: "40px" }}
              autoComplete="password"
            />
          </Form.Item>
          <Form.Item
            name="confirm-password"
            dependencies={["password"]}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Confim Password"
              style={{ height: "40px" }}
              autoComplete="confim-password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              style={{ width: "100%", height: "40px" }}
              htmlType="submit"
              loading={isLoadingSignUp}
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </IonContent>

      <IonFooter className="footer">
        <Typography> Don't have an account ?</Typography>
        <Link to={END_POINTS.AUTHENTICATION.LOGIN}>Sign In</Link>
      </IonFooter>
    </IonPage>
  );
};

export default Register;
