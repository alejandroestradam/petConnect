import React from 'react';
import { Modal, Button, Popconfirm, notification } from 'antd';

export const PetModal = ({ open, pet, onClose, onConfirm }) => {
  if (!pet) return null;

  const handleConfirm = () => {
    notification.success({
      message: 'Adoption Request Sent',
      description:
        "Thanks for your interest! Your data has been shared with the temporary owner, and you'll be contacted soon.",
      placement: 'topRight',
      duration: 5
    });
    onConfirm();
  };

  return (
    <Modal
      title={pet.name}
      open={open}
      onCancel={onClose}
      footer={null}
      className="pet-profile-modal"
    >
      <div className="flex flex-col items-center">
        <img
          src={"https://hips.hearstapps.com/hmg-prod/images/happy-dog-outdoors-royalty-free-image-1652927740.jpg?crop=0.447xw:1.00xh;0.187xw,0&resize=980:*"}
          alt="pet"
          className="w-48 h-48 rounded-full object-cover mb-4"
        />
        <div className="text-center">
          <p className="text-lg"><strong>Location:</strong> {pet.location || 'Zapopan'}</p>
          <p className="text-lg"><strong>Age:</strong> {pet.age || '10 years'}</p>
          <p className="text-lg"><strong>Weight:</strong> {pet.weight_kg ? `${pet.weight_kg} kg` : 'Weight unavailable'}</p>
          <p className="text-lg"><strong>Sickness:</strong> {pet.sickness || 'None'}</p>
          <p className="text-lg"><strong>Size:</strong> {pet.size ? 'Large' : 'Small'}</p>
          <p className="text-lg"><strong>Vaccinated:</strong> {pet.vaccinated ? 'Yes' : 'No'}</p>
        </div>
        <Popconfirm
          title="Are you sure you want to begin the adoption process?"
          onConfirm={handleConfirm}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" className="mt-4 h-12">Begin Adoption Process</Button>
        </Popconfirm>
      </div>
    </Modal>
  );
};