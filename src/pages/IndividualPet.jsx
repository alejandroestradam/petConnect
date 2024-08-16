import { Avatar, Button, Flex, Spin, Tag } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Title from 'antd/es/typography/Title';
import { FaUser } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { UserModal } from './components/UserModal';

export const IndividualPet = () => {
  const location = useLocation();
  const pet = location.state?.pet;
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    axios
      .get('https://dummyjson.com/users')
      .then((res) => {
        console.log('data: ', res.data);
        setUsers(res.data.users);
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err);
      });
  }, []);

  const showModal = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const handleConfirm = () => {
    setIsModalVisible(false);
  };

  return (
    <Flex vertical className="p-6">
      <Flex vertical justify='center' className='w-ful mb-4' align='center'>
        <img
          src={"https://hips.hearstapps.com/hmg-prod/images/happy-dog-outdoors-royalty-free-image-1652927740.jpg?crop=0.447xw:1.00xh;0.187xw,0&resize=980:*"}
          alt="pet"
          className="w-48 h-48 object-cover rounded-lg mb-2"
        />
        <Title level={3}>{pet.name}</Title>
      </Flex>
      <Title level={2} className="text-2xl mb-4 text-center">{`${users.length} users interested`}</Title>
      {users.map((user) => (
        <div
          key={user.id}
          className="relative bg-white w-full rounded-lg shadow-lg flex items-center p-4 mb-4 cursor-pointer"
          onClick={() => showModal(user)} // Show modal on click
        >
          <Avatar size={128} src="http://www.cecyteo.edu.mx/Nova/App_themes/Site2015/assets/admin/pages/media/profile/profile_user.jpg" className='bg-white'/>
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
            <Button type="primary">View info</Button>
            {user.contacted && (
              <Button type="primary" className="mt-2">
                Complete Adoption
              </Button>
            )}
          </div>
          <FaUser className="absolute bottom-2 right-2 text-2xl text-gray-500" />
        </div>
      ))}
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