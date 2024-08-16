import {Flex, Tabs} from 'antd';
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { InfiniteGrid } from './components/InfiniteGrid';
import { Profile } from './components/Profile';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

export const Home = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate();
  const [pets, setPets] = useState([])
  
  useEffect(() => {
    axios.get('https://freetestapi.com/api/v1/animals')
    .then((res) => {
      console.log('data: ', res.data)
      setPets(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  },[])

  return (
    <Flex justify="center" vertical>
      <Flex justify='center'>
        <Profile user={user}/>
      </Flex>
      <Flex align="center" justify="space-around" className="mb-8 mt-16">
        <button
          className="w-40 h-20 bg- rounded-2xl text-xl bg-[#ED6A5A]"
          style={{
            backgroundImage: `url('cat.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          onClick={()=> navigate('/searchPets')}
        >
          New Adoption
        </button>
        <button
          className="w-40 h-20 bg-[#F2BE22] rounded-2xl text-xl"
          style={{
            backgroundImage: `url('dog.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          onClick={()=> navigate('/giveAdoption')}
        >
          Give in adoption
        </button>
      </Flex>
      <Flex align="center" justify="center" vertical className='p-6 w-full'>
        <Tabs
          size="large"
          defaultActiveKey="1"
          centered
          items={
              [
                {
                  key: '1',
                  label: 'Adoptions Requests',
                  children: <InfiniteGrid pets={pets}/>,
                },
                {
                  key: '2',
                  label: 'Waiting Adoptions',
                  children: <InfiniteGrid pets={pets}/>,
                },
              ]
            }
        />
        {/* <Title level={3}>Your Pets</Title> */}
      </Flex>
    </Flex>
  );
}
