/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Button, Flex } from 'antd'
import React, { useEffect } from 'react'
import { CiEdit } from 'react-icons/ci'
import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Text } = Typography

export const Profile = ({user}) => {
  const navigate = useNavigate()
  useEffect(() => {
    if (!user) {
      navigate('/'); // Navigate to login page if no user found
    }
  }, []);

  return (
    <Flex vertical justify='center' align='center'>
      <Avatar size={128} src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" className='bg-white'/>
      <Flex justify='center' align='center'>
        <Flex vertical className='ml-5 mt-2'>
          <Text className='self-center text-white font-bold'>{user?.firstName}, {user?.lastName}</Text>
          <Text className='self-center text-white font-bold'>{user?.location}</Text>
        </Flex>
        {/* <Button icon={}/> */}
        <CiEdit className='w-6 h-6 ml-2 text-white' onClick={()=> navigate('/profile', { state: { user } })}/>
      </Flex>
    </Flex>
  )
}
