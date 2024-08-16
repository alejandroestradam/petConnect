import { Card, Col, Row, Spin } from 'antd';
import Meta from 'antd/es/card/Meta';
import React, { useEffect, useRef, useState } from 'react'
import { IoIosHeartHalf } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { PetModal } from './PetModal';

export const InfiniteGrid = ({pets, isRequest}) => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  const [displayedPets, setDisplayedAnimals] = useState([]);
  const observerRef = useRef();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const loadMoreAnimals = () => {
      if (loading) return;

      setLoading(true);
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      setDisplayedAnimals((prevAnimals) => [
        ...prevAnimals,
        ...pets.slice(startIndex, endIndex),
      ]);
      setLoading(false);
    };

    loadMoreAnimals();
  }, [currentPage, pets, loading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayedPets.length < pets.length) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [displayedPets, pets.length]);
  return (
    <>
      <Row gutter={[16, 16]} className="p-4">
        {displayedPets.map((pet) => (
          <Col
            key={pet.id}
            span={12}
            className="flex justify-center items-center"
          >
            <Card
              onClick={() => isRequest ? setOpen(true) : navigate('/individualPet', { state: { pet } })}
              hoverable
              cover={
                <img
                  alt={pet.name}
                  src={"https://hips.hearstapps.com/hmg-prod/images/happy-dog-outdoors-royalty-free-image-1652927740.jpg?crop=0.447xw:1.00xh;0.187xw,0&resize=980:*"}
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
                title={pet.name}
                description={'1 month'}
                avatar={<IoIosHeartHalf />}
              />
            </Card>
          </Col>
        ))}
      </Row>
      {loading && (
        <div className="flex justify-center items-center py-4">
          <Spin />
          <span className="ml-2">Loading...</span>
        </div>
      )}
      <div ref={observerRef} style={{ height: '1px' }} />
    </>
  )
}
