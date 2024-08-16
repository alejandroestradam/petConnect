import { Flex, Select, Spin } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
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

  useEffect(() => {
    setLoading(true)
    axios
      .get('https://freetestapi.com/api/v1/animals')
      .then((res) => {
        console.log('data: ', res.data);
        setPets(res.data);
        setFilteredPets(res.data);
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err);
      });
  }, []);

  const handleFilterChange = (value, key) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  useEffect(() => {
    const applyFilters = () => {
      let filtered = pets;

      if (filters.type) {
        filtered = filtered.filter((pet) => pet.type === filters.type);
      }

      if (filters.location) {
        filtered = filtered.filter((pet) => pet.location === filters.location);
      }

      if (filters.age) {
        filtered = filtered.filter((pet) => pet.age === filters.age);
      }

      if (filters.size) {
        filtered = filtered.filter((pet) => pet.size === filters.size);
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

  const handleConfirm = () => {
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

      {filteredPets.map((pet) => (
        <div
          key={pet.id}
          className="relative bg-white w-full rounded-lg shadow-lg flex items-center p-4 mb-4 cursor-pointer"
          onClick={() => showModal(pet)} // Show modal on click
        >
          <img
            src={"https://hips.hearstapps.com/hmg-prod/images/happy-dog-outdoors-royalty-free-image-1652927740.jpg?crop=0.447xw:1.00xh;0.187xw,0&resize=980:*"}
            alt="pet"
            className="w-1/2 h-48 object-cover rounded-lg"
          />
          <div className="flex flex-col justify-center items-center w-2/3 p-4">
            <h2 className="text-xl font-bold mb-2">{pet.name}</h2>
            <p className="text-gray-600 mb-2">{pet.location || 'Zapopan'}</p>
            <p className="text-gray-600 mb-2">{pet.age || '10 years'}</p>
            <p className="text-gray-600 mb-2">{pet.weight_kg ? `${pet.weight_kg} kg` : 'Weight unavailable'}</p>
          </div>
          <MdOutlinePets className="absolute bottom-2 right-2 text-4xl text-gray-500" />
        </div>
      ))}
      <PetModal
        open={isModalVisible}
        pet={selectedPet}
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
