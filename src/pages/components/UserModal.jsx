import React from 'react';
import { Modal, Button, Popconfirm, notification } from 'antd';

export const UserModal = ({ open, user, onClose, onConfirm }) => {
  if (!user) return null;

  const handleConfirm = () => {
    notification.success({
      message: 'User marked as contacted successfully',
      description: "Thanks for contacting the user! We hope the process goes well.",
      placement: 'topRight',
      duration: 5
    });
    onConfirm();
  };

  return (
    <Modal
      title={'Interested User'}
      open={open}
      onCancel={onClose}
      footer={null}
      className="user-profile-modal"
    >
      <div className="flex flex-col items-center">
        <img
          src={user.image}
          alt="user"
          className="w-48 h-48 rounded-full object-cover mb-4"
        />
        <div className="text-center">
          <p className="text-lg"><strong>Full Name:</strong> {`${user.firstName} ${user.lastName}`}</p>
          <p className="text-lg"><strong>Address:</strong> {`${user.address.address}, ${user.address.city}, ${user.address.state}`}</p>
          <p className="text-lg"><strong>Email:</strong> {user.email}</p>
          <p className="text-lg"><strong>Phone:</strong> {user.phone}</p>
          <p className="text-lg"><strong>Message:</strong> {user.message || 'I would love to adopt this beautiful pet!'}</p>
        </div>
        <Popconfirm
          title="Are you sure you want to mark the user as contacted?"
          onConfirm={handleConfirm}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" className="mt-4 h-12">Mark user as contacted</Button>
        </Popconfirm>
      </div>
    </Modal>
  );
};
