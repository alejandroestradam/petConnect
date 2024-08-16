import { Flex, Tabs } from 'antd';
import axios from 'axios';
import React, { useContext, useEffect, useState, useMemo } from 'react';
import { InfiniteGrid } from './components/InfiniteGrid';
import { Profile } from './components/Profile';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

export const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  useEffect(() => {
    if (!user) {
      navigate('/'); // Navigate to login page if no user found
    }
  }, []);

  const locations = ['Phoenix', 'Houston', 'Washington', 'Seattle', 'Jacksonville'];

  // Array of random pet names
  const petNames = ['Buddy', 'Max', 'Bella', 'Lucy', 'Charlie', 'Daisy', 'Rocky', 'Molly', 'Bailey', 'Sadie', 'Oscar', 'Coco'];

  // Helper function to get a random item from an array
  const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const getRandomUserIds = () => {
    const numOfUsers = Math.floor(Math.random() * 3) + 1;
    const userIds = [];
    for (let i = 0; i < numOfUsers; i++) {
      userIds.push(Math.floor(Math.random() * 11));
    }
    return userIds;
  };

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const dogResponse = await axios.get('https://api.thedogapi.com/v1/images/search', {
          params: { limit: 6 },
          headers: { 'x-api-key': 'your_dog_api_key' }
        });

        const catResponse = await axios.get('https://api.thecatapi.com/v1/images/search', {
          params: { limit: 6 },
          headers: { 'x-api-key': 'your_cat_api_key' }
        });

        const dogData = dogResponse.data.map((dog) => ({
          petName: getRandomItem(petNames), // Randomized pet name
          petType: 'Dog',
          petLocation: getRandomItem(locations),
          petAge: Math.floor(Math.random() * 10) + 1,
          petWeight: Math.floor(Math.random() * 30) + 5,
          petSickness: 'None',
          petVaccinated: Math.random() > 0.5,
          userIdInterested: getRandomUserIds(),
          userIdPutInAdoption: Math.floor(Math.random() * 1000),
          petUrl: dog.url,
        }));

        const catData = catResponse.data.map((cat) => ({
          petName: getRandomItem(petNames), // Randomized pet name
          petType: 'Cat',
          petLocation: getRandomItem(locations),
          petAge: Math.floor(Math.random() * 10) + 1,
          petWeight: Math.floor(Math.random() * 10) + 3,
          petSickness: 'None',
          petVaccinated: Math.random() > 0.5,
          userIdInterested: getRandomUserIds(),
          userIdPutInAdoption: `owner${Math.floor(Math.random() * 1000)}`,
          petUrl: cat.url,
        }));

        setPets([...dogData, ...catData]);
      } catch (error) {
        console.error('Error fetching pet data:', error);
      }
    };

    fetchPets();
  }, []);

  const requestPets = useMemo(() => pets.slice(0, 6), [pets]);
  const waitingPets = useMemo(() => pets.slice(6, 12), [pets]);

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
                  children: <InfiniteGrid pets={requestPets} isRequest={true}/>,
                },
                {
                  key: '2',
                  label: 'Waiting Adoptions',
                  children: <InfiniteGrid pets={waitingPets} isRequest={false}/>,
                },
              ]
            }
        />
      </Flex>
    </Flex>
  );
};

