import { Card, Col, Row, Spin } from 'antd';
import Meta from 'antd/es/card/Meta';
import React, { useState } from 'react';
import { IoIosHeartHalf } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { PetModal } from './PetModal';

export const InfiniteGrid = ({ pets, isRequest }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  const onClose = () => {
    setOpen(false);
    setSelectedPet(null);
  };

  const onConfirm = () => {
    console.log('Adoption process confirmed');
  };

  const handleCardClick = (pet) => {
    if (isRequest) {
      setSelectedPet(pet);
      setOpen(true);
    } else {
      navigate('/individualPet', { state: { pet } });
    }
  };

  return (
    <>
      <Row gutter={[16, 16]} className="p-4">
        {pets.slice(0, 6).map((pet) => (
          <Col
            key={pet.petUrl} // Ensure unique key (using petUrl for simplicity)
            span={12}
            className="flex justify-center items-center"
          >
            <Card
              onClick={() => handleCardClick(pet)}
              hoverable
              cover={
                <img
                  alt={pet.petName}
                  src={pet.petUrl}
                  style={{
                    objectFit: 'cover',
                    height: '150px',
                    width: '170px',
                  }}
                />
              }
              style={{ height: '250px', width: '170px' }} // Ensure cards are consistent in size
            >
              <Meta
                title={pet.petName}
                description={`Age: ${pet.petAge} years`}
                avatar={<IoIosHeartHalf />}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for displaying pet details */}
      {selectedPet && (
        <PetModal
          open={open}
          pet={selectedPet}
          onClose={onClose}
        />
      )}
    </>
  );
};

