import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import ProtectedRoute from './pages/ProtectedRoute';
import { SearchPets } from './pages/SearchPets';
import { IndividualPet } from './pages/IndividualPet';
import { GiveAdoption } from './pages/GiveAdoption';
import { ProfilePage } from './pages/ProfilePage';
import { NewAcount } from './pages/NewAcount';
import { Layout } from './Layout';
import { AuthProvider } from './AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute><Layout><Home/></Layout></ProtectedRoute>} />
          <Route path="/newAccount" element={<NewAcount/>}/>
          <Route path="/searchPets" element={<ProtectedRoute><Layout><SearchPets/></Layout></ProtectedRoute>}/>
          <Route path="/individualPet" element={<ProtectedRoute><Layout><IndividualPet/></Layout></ProtectedRoute>}/>GiveAdoption
          <Route path="/giveAdoption" element={<ProtectedRoute><Layout><GiveAdoption/></Layout></ProtectedRoute>}/>
          <Route path="/profile" element={<ProtectedRoute><Layout><ProfilePage/></Layout></ProtectedRoute>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
