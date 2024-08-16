import { Button, Flex, Form, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { newUserForm } from '../helpers/const';
import Title from 'antd/es/typography/Title';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

export const NewAcount = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [, setFormValues] = useState({});

  const onFinish = (values) => {
    console.log('Form Values:', values);
    setFormValues(values);
    setIsModalVisible(true);
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleModalOk = async () => {
    // await newUser(formValues);
    setIsModalVisible(false);
    navigate('/');
  };

  return (
    <Flex className='fullScreen p-8' align='center' justify='space-evenly' vertical>
      {/* Back Icon */}
      <AiOutlineArrowLeft className="text-2xl cursor-pointer absolute top-4 left-4" onClick={handleBack} />
      <Title level={2}>Create a new account</Title>
      <Form form={form} onFinish={onFinish} layout="vertical" className='bg-white rounded-md container p-8 flex flex-col items-center'>
        {newUserForm.map((field) => (
          <Form.Item
            key={field.name}
            label={field.label}
            name={field.name}
            rules={field.rules}
            dependencies={field.dependencies}
            className='container mb-2'
          >
            <Input/>
          </Form.Item>
        ))}
        <Form.Item className='container mt-4'>
          <Button type="primary" htmlType="submit" className='w-full'>
            Submit
          </Button>
        </Form.Item>
      </Form>

      {/* Success Modal */}
      <Modal
        title="Account Created"
        visible={isModalVisible}
        onOk={handleModalOk}
        okText="Go to Login"
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <p>Your account has been successfully created!</p>
      </Modal>
    </Flex>
  );
};

