import React, { useContext, useState } from 'react';
import { Button, Form, Input, Spin, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../helpers/loginFunctions';
import { AuthContext } from '../AuthContext';

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {login} = useContext(AuthContext);

  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    setError(null);

    try {
      const data = await loginUser(values)

      if (data.token) {
        localStorage.setItem('authToken', data.token);

        login({
          firstName: "Alex",
          lastName: "Estrada",
          email: "test@test.com",
          location: "Zapopan, Jalisco",
          cellphone: "3222342344",
        });

        navigate('/home');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen overflow-hidden bg-[#58B8A7]">
      <img className="w-60" src="logo.png" alt="logo" />
      <h1 className="text-white">Pet Connect</h1>
      
      {error && (
        <Alert
          message="Login Failed"
          description={error}
          type="error"
          showIcon
          className="mb-4"
        />
      )}

      <Spin spinning={loading}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          className="bg-white p-4 rounded-xl"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item className="container">
            <Button type="primary" htmlType="submit" className="w-full">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Spin>

      <div className="mt-6">
        <Button type="primary" onClick={() => navigate('/newAccount')}>
          Create new account
        </Button>
      </div>
    </div>
  );
};
