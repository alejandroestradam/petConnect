import { Avatar, Button, Flex, Spin, Tag, Modal, notification } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Title from 'antd/es/typography/Title';
import { FaUser } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { UserModal } from './components/UserModal';

export const IndividualPet = () => {
  const location = useLocation();
  const pet = location.state?.pet;
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [adoptionCompleted, setAdoptionCompleted] = useState(false); // To track if adoption is completed

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://dummyjson.com/users')
      .then((res) => {
        const filteredUsers = res.data.users.filter((user) =>
          pet.userIdInterested.includes(user.id)
        );
        setUsers(filteredUsers);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [pet.userIdInterested]);

  const showModal = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const handleConfirm = () => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === selectedUser.id ? { ...user, contacted: true } : user
      )
    );
    setIsModalVisible(false);
  };

  const completeAdoption = (user) => {
    Modal.confirm({
      title: 'Complete Adoption',
      content: `Are you sure you want to complete the adoption for ${user.firstName} ${user.lastName}?`,
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => {
        notification.success({
          message: 'Adoption Completed',
          description: `${user.firstName} ${user.lastName} has successfully completed the adoption process!`,
          placement: 'topRight',
        });
        // Remove user cards and display "Adoption Completed"
        setUsers([]);
        setAdoptionCompleted(true);
      },
    });
  };

  return (
    <Flex vertical className="p-6">
      <Flex vertical justify='center' className='w-full mb-4' align='center'>
        <img
          src={pet.petUrl}
          alt="pet"
          className="w-48 h-48 object-cover rounded-lg mb-2"
        />
        <Title level={3}>{pet.petName}</Title>
      </Flex>
      {adoptionCompleted ? (
        <Title level={2} className="text-2xl mb-4 text-center">Adoption Completed</Title>
      ) : (
        <>
          <Title level={2} className="text-2xl mb-4 text-center">{`${users.length} users interested`}</Title>
          {users.map((user) => (
            <div
              key={user.id}
              className="relative bg-white w-full rounded-lg shadow-lg flex items-center p-4 mb-4"
            >
              <Avatar size={128} src={user.image} className='bg-white' />
              {user.contacted && (
                <Tag color="green" className="absolute top-1 right-0">
                  Contacted
                </Tag>
              )}
              <div className="flex flex-col justify-center items-center w-2/3 p-4">
                <div className="flex items-center justify-center">
                  <h2 className="text-xl font-bold mb-2">{`${user.firstName} ${user.lastName}`}</h2>
                </div>
                <p className="text-gray-600 mb-2">{user.address.city || 'Zapopan'}</p>
                {!user.contacted && (
                  <Button type="primary" onClick={() => showModal(user)}>View info</Button>
                )}
                {user.contacted && (
                  <Button type="primary" className="mt-2" onClick={() => completeAdoption(user)}>
                    Complete Adoption
                  </Button>
                )}
              </div>
              <FaUser className="absolute bottom-2 right-2 text-2xl text-gray-500" />
            </div>
          ))}
        </>
      )}
      <UserModal
        open={isModalVisible}
        user={selectedUser}
        onClose={handleModalClose}
        onConfirm={handleConfirm}
      />
      {loading && (
        <div className="flex justify-center items-center py-4">
          <Spin />
          <span className="ml-2">Loading...</span>
        </div>
      )}
    </Flex>
  );
};

