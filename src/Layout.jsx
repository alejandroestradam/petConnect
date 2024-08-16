import React from 'react';
import { Button, Layout as AntdLayout } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import Title from 'antd/es/typography/Title';
// import { IoMdMenu } from 'react-icons/io';
import { FaPowerOff, FaUserAlt } from 'react-icons/fa';
import { CiPower, CiSearch } from 'react-icons/ci';
import { Footer } from 'antd/es/layout/layout';
import { GoHome } from 'react-icons/go';
import { MdHomeFilled, MdOutlinePets } from 'react-icons/md';

const { Header, Content } = AntdLayout;

export const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  const user = {
    firstName: 'Alex',
    lastName: 'Estrada',
    location: 'Zapopan, Jalisco',
    email: 'test@tes.com',
    cellphone: '3111234567',
    password: 'password'
  }

  return (
    <AntdLayout className="min-h-screen relative overflow-hidden">
      <Header className="h-12 fixed z-50 top-0 left-0 p-0 w-full flex justify-between items-center bg-[#DDF1ED]">
        <Button
          className="flex items-center border-0 bg-[#DDF1ED]"
          onClick={() =>
            location.pathname === '/newAccount'
              ? navigate('/')
              : navigate('/home')
          }
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = '#DDF1ED')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = '#DDF1ED')
          }
          onFocus={(e) => (e.currentTarget.style.backgroundColor = '#DDF1ED')}
          onBlur={(e) => (e.currentTarget.style.backgroundColor = '#DDF1ED')}
        >
          <img className="w-12" src="logo.png" alt="logo" />
        </Button>
        <Title className="self-baseline">Pet Connect</Title>
        <Button
          className="flex items-center border-0 bg-[#DDF1ED] mr-4"
          icon={
            <CiPower className="w-8 h-8 text-gray-800 hover:text-gray-500 focus:text-gray-500" />
          }
          onClick={logout}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = '#DDF1ED')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = '#DDF1ED')
          }
          onFocus={(e) => (e.currentTarget.style.backgroundColor = '#DDF1ED')}
          onBlur={(e) => (e.currentTarget.style.backgroundColor = '#DDF1ED')}
        />
      </Header>
      <Content className="pt-16 pb-12 bg-[#58B8A7]">
        {children}
      </Content>
      <Footer className="h-12 fixed bottom-0 left-0 p-0 w-full flex justify-evenly items-center bg-[#DDF1ED]">
        <MdOutlinePets className='w-6 h-6' onClick={()=> navigate('/searchPets')}/>
        <MdHomeFilled className='w-6 h-6' onClick={()=> navigate('/home')}/>
        <FaUserAlt className='w-6 h-6' onClick={()=> navigate('/profile', { state: { user } })}/>
      </Footer>
    </AntdLayout>
  );
};
