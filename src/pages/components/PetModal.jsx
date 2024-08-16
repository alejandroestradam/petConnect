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
      title={pet.petName}
      open={open}
      onCancel={onClose}
      footer={null}
      className="pet-profile-modal"
    >
      <div className="flex flex-col items-center">
        <img
          src={pet.petUrl}
          alt="pet"
          className="w-48 h-48 rounded-full object-cover mb-4"
        />
        <div className="text-center">
          <p className="text-lg"><strong>Location:</strong> {pet.petLocation || 'Location unavailable'}</p>
          <p className="text-lg"><strong>Age:</strong> {pet.petAge ? `${pet.petAge} years` : 'Age unavailable'}</p>
          <p className="text-lg"><strong>Weight:</strong> {pet.petWeight ? `${pet.petWeight} kg` : 'Weight unavailable'}</p>
          <p className="text-lg"><strong>Sickness:</strong> {pet.petSickness || 'None'}</p>
          <p className="text-lg"><strong>Vaccinated:</strong> {pet.petVaccinated ? 'Yes' : 'No'}</p>
        </div>
        {(onConfirm && !pet.inAdoptionProcess) &&
          <Popconfirm
          title="Are you sure you want to begin the adoption process?"
          onConfirm={handleConfirm}
          okText="Yes"
          cancelText="No"
          >
            <Button type="primary" className="mt-4 h-12">Begin Adoption Process</Button>
          </Popconfirm>
        }
      </div>
    </Modal>
  );
};
