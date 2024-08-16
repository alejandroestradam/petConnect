/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Select, Spin, Button, Tag } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdOutlinePets } from 'react-icons/md';
import { filterConfig } from '../helpers/const';
import Title from 'antd/es/typography/Title';
import { PetModal } from './components/PetModal';
const { Option } = Select;

export const SearchPets = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    location: '',
    age: '',
    size: ''
  });

  const locations = ['Phoenix', 'Houston', 'Washington', 'Seattle', 'Jacksonville'];
  const petNames = ['Buddy', 'Max', 'Bella', 'Lucy', 'Charlie', 'Daisy', 'Rocky', 'Molly', 'Bailey', 'Sadie', 'Oscar', 'Coco'];

  const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

  useEffect(() => {
    setLoading(true);

    const fetchPets = async () => {
      try {
        const dogResponse = await axios.get('https://api.thedogapi.com/v1/images/search', {
          params: { limit: 10 },
          headers: { 'x-api-key': 'your_dog_api_key' }
        });

        const catResponse = await axios.get('https://api.thecatapi.com/v1/images/search', {
          params: { limit: 10 },
          headers: { 'x-api-key': 'your_cat_api_key' }
        });

        const dogData = dogResponse.data.map((dog) => ({
          petName: getRandomItem(petNames),
          petType: 'Dog',
          petLocation: getRandomItem(locations),
          petAge: Math.floor(Math.random() * 10) + 1,
          petWeight: Math.floor(Math.random() * 30) + 5,
          petSickness: 'None',
          petVaccinated: Math.random() > 0.5,
          petUrl: dog.url,
          inAdoptionProcess: false // Add a status flag for adoption process
        }));

        const catData = catResponse.data.map((cat) => ({
          petName: getRandomItem(petNames),
          petType: 'Cat',
          petLocation: getRandomItem(locations),
          petAge: Math.floor(Math.random() * 10) + 1,
          petWeight: Math.floor(Math.random() * 10) + 3,
          petSickness: 'None',
          petVaccinated: Math.random() > 0.5,
          petUrl: cat.url,
          inAdoptionProcess: false // Add a status flag for adoption process
        }));

        const combinedPets = [...dogData, ...catData];
        setPets(combinedPets);
        setFilteredPets(combinedPets);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching pets:', error);
      }
    };

    fetchPets();
  }, []);

  const handleFilterChange = (value, key) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      type: '',
      location: '',
      age: '',
      size: ''
    });
    setFilteredPets(pets); // Reset to show all pets
  };

  useEffect(() => {
    const applyFilters = () => {
      let filtered = pets;

      if (filters.type) {
        filtered = filtered.filter((pet) => pet.petType.toLowerCase() === filters.type);
      }

      if (filters.location) {
        filtered = filtered.filter((pet) => pet.petLocation.toLowerCase() === filters.location.toLowerCase());
      }

      if (filters.age) {
        filtered = filtered.filter((pet) =>
          filters.age === 'puppy' ? pet.petAge < 2 : pet.petAge >= 2
        );
      }

      if (filters.size) {
        filtered = filtered.filter((pet) =>
          filters.size === 'small' ? pet.petWeight < 15 : pet.petWeight >= 15
        );
      }

      setFilteredPets(filtered);
    };

    applyFilters();
  }, [filters, pets]);

  const showModal = (pet) => {
    setSelectedPet(pet);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedPet(null);
  };

  const handleConfirm = (pet) => {
    setPets((prevPets) =>
      prevPets.map((p) =>
        p.petUrl === pet.petUrl ? { ...p, inAdoptionProcess: true } : p
      )
    );
    setIsModalVisible(false);
  };

  return (
    <Flex vertical className="p-6">
      <Title className="text-2xl mb-4 text-center">Find a friend</Title>
      <Flex justify="space-between" className="mb-4">
        {filterConfig.map((filter) => (
          <Select
            className='mx-1'
            key={filter.key}
            value={filters[filter.key] || undefined} // Bind value to filters state
            showSearch={filter.showSearch}
            placeholder={filter.placeholder}
            onChange={(value) => handleFilterChange(value, filter.key)}
            style={{ width: filter.width }}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {filter.options.map((option) => (
              <Option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </Option>
            ))}
          </Select>
        ))}
      </Flex>

      {/* Reset Filters Button */}
      <Flex justify="center" className="mb-4">
        <Button type="primary" onClick={resetFilters}>Reset Filters</Button>
      </Flex>

      {filteredPets.map((pet) => (
        <div
          key={pet.petUrl}
          className="relative bg-white w-full rounded-lg shadow-lg flex items-center p-4 mb-4 cursor-pointer"
          onClick={() => showModal(pet)} // Show modal on click
        >
          {pet.inAdoptionProcess && (
            <Tag color="orange" className="absolute top-1 right-0">
              In Process
            </Tag>
          )}
          <img
            src={pet.petUrl}
            alt="pet"
            className="w-1/2 h-48 object-cover rounded-lg"
          />
          <div className="flex flex-col justify-center items-center w-2/3 p-4">
            <h2 className="text-xl font-bold mb-2">{pet.petName}</h2>
            <p className="text-gray-600 mb-2">{pet.petLocation}</p>
            <p className="text-gray-600 mb-2">{`${pet.petAge} years`}</p>
            <p className="text-gray-600 mb-2">{`${pet.petWeight} kg`}</p>
          </div>
          <MdOutlinePets className="absolute bottom-2 right-2 text-4xl text-gray-500" />
        </div>
      ))}
      <PetModal
        open={isModalVisible}
        pet={selectedPet}
        onClose={handleModalClose}
        onConfirm={() => handleConfirm(selectedPet)} // Pass the selected pet to confirm
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
