import React from 'react'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AddAlumni from './pages/Admin/AddAlumni';
import AddEvents from './pages/Admin/AddEvents';
import AddGallery from './pages/Admin/AddGallery';
import AlumniList from './pages/Admin/AlumniList';
import EventsList from './pages/Admin/EventsList';
import GalleryList from './pages/Admin/GalleryList';
import {Route, Routes} from 'react-router-dom';

const App = () => {

  const {aToken}= useContext(AdminContext)
  

  return aToken ? (
    <div>
      
      <ToastContainer /> 
      <Navbar/>
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
          <Route path="/" element={ <></>} />
          <Route path="/add-alumni" element={ <AddAlumni/>} />
          <Route path="/add-events" element={ <AddEvents/>} />
          <Route path="/add-gallery" element={ <AddGallery/>} />
          <Route path="/alumni-list" element={ <AlumniList/>} />
          <Route path="/events-list" element={ <EventsList/>} />
          <Route path="/gallery-list" element={ <GalleryList/>} />
        </Routes>

      </div>
    </div>
  ) :(
    <>
    <Login />
    <ToastContainer />
    </>
  )
}

export default App
