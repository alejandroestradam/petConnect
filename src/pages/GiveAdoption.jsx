import { Button, Flex, Form, Input, Select, InputNumber, notification } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { petInfoForm } from '../helpers/const';
import { MdOutlinePets } from 'react-icons/md';

const { Option } = Select;

export const GiveAdoption = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    notification.success({
      message: 'Pet Information Submitted',
      description: 'The new pet has been successfully added for adoption!',
      placement: 'topRight',
      duration: 3,
    });

    setTimeout(() => {
      navigate('/home');
    }, 2000);
  };

  return (
    <Flex align='center' vertical className='p-8'>
      <Flex align='center' className='mb-4'>
        <Title level={2} className='!mb-0 mr-1'>Add new pet information</Title>
        <MdOutlinePets className='w-6 h-6 ml-1'/>
      </Flex>
      <Form form={form} onFinish={onFinish} layout="vertical" className='bg-white rounded-md container p-8 flex flex-col items-center'>
        {petInfoForm.map((field) => {
          if (field.name === 'vaccinated') {
            return (
              <Form.Item
                key={field.name}
                label={field.label}
                name={field.name}
                rules={field.rules}
                className='container mb-2'
              >
                <Select placeholder="Select an option" style={{ width: '100%' }}>
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
            );
          }
          if (field.name === 'age') {
            return (
              <Form.Item
                key={field.name}
                label={field.label}
                name={field.name}
                rules={field.rules}
                className='container mb-2'
              >
                <InputNumber
                  min={0}
                  placeholder="Age"
                  addonAfter="years"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            );
          }
          if (field.name === 'weight_kg') {
            return (
              <Form.Item
                key={field.name}
                label={field.label}
                name={field.name}
                rules={field.rules}
                className='container mb-2'
              >
                <InputNumber
                  min={0}
                  placeholder="Weight"
                  addonAfter="kg"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            );
          }
          return (
            <Form.Item
              key={field.name}
              label={field.label}
              name={field.name}
              rules={field.rules}
              dependencies={field.dependencies}
              className='container mb-2'
            >
              <Input style={{ width: '100%' }} />
            </Form.Item>
          );
        })}
        <Form.Item className='container mt-4'>
          <Button type="primary" htmlType="submit" className='w-full'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};
