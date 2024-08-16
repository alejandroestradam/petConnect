import { Avatar, Button, Flex, Input, Typography, Form, Modal } from 'antd';
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { updateUser } from '../crudRequests';

export const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  const [originalValues] = useState({
    firstname: user.firstName,
    lastname: user.lastName,
    location: user.location,
    email: user.email,
    phone: user.cellphone,
    password: user.password,
  });

  const [formValues, setFormValues] = useState({ ...originalValues });
  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (field, value) => {
    setFormValues({ ...formValues, [field]: value });
  };

  useEffect(() => {
    const isChanged = Object.keys(formValues).some(
      (key) => formValues[key] !== originalValues[key]
    );
    setHasChanges(isChanged);
  }, [formValues, originalValues]);

  const confirmSave = () => {
    Modal.confirm({
      title: 'Confirm Changes',
      content: 'Are you sure you want to save these changes?',
      onOk() {
        handleSave();
      },
      onCancel() {
        console.log('Changes not saved');
      },
    });
  };

  const handleSave = async () => {
    try {
      await updateUser(formValues); // Pass formValues to updateUser function
      setHasChanges(false);
      console.log('User updated successfully');
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  return (
    <Flex vertical className="p-8" justify="center" align="center">
      <Avatar size={128} src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" className="bg-white" />
      <Flex justify="center" align="center" className="mt-4">
        <Flex vertical className="ml-5">
          <Form layout="vertical">
            <Form.Item label="First Name">
              <Input
                value={formValues.firstname}
                onChange={(e) => handleChange('firstname', e.target.value)}
                className="mb-2"
              />
            </Form.Item>

            <Form.Item label="Last Name">
              <Input
                value={formValues.lastname}
                onChange={(e) => handleChange('lastname', e.target.value)}
                className="mb-2"
              />
            </Form.Item>

            <Form.Item label="Location">
              <Input
                value={formValues.location}
                onChange={(e) => handleChange('location', e.target.value)}
                className="mb-2"
              />
            </Form.Item>

            <Form.Item label="Email">
              <Input
                value={formValues.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="mb-2"
              />
            </Form.Item>

            <Form.Item label="Phone">
              <Input
                value={formValues.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="mb-2"
              />
            </Form.Item>

            <Form.Item label="Password">
              <Input.Password
                value={formValues.password}
                onChange={(e) => handleChange('password', e.target.value)}
                className="mb-2"
              />
            </Form.Item>
          </Form>
        </Flex>
      </Flex>
      <Button
        type="primary"
        onClick={confirmSave} // Trigger confirmation modal before saving
        disabled={!hasChanges} // Disable if no changes detected
        className="mt-4 w-full"
      >
        Save Changes
      </Button>
    </Flex>
  );
};
