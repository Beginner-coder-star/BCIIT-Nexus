import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Alumni from './pages/Alumni';
import MyProfile from './pages/MyProfile';
import Navbar from './components/Navbar';
import Meetings from './pages/Meetings';
import Events from './pages/Events';
import Footer from './components/Footer';
import Meetingform from './pages/Meetingform';
import RelatedAlumni from './components/RelatedAlumni';
import EventDetails from './components/EventDetails';
import Gallery from './pages/Gallery';
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer/>
      <Navbar /> 

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alumni" element={<Alumni />} />
        <Route path="/alumni/:batches" element={<Alumni />} />
        <Route path="/event/:id" element={<EventDetails />} />

        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/meetings/:aluId" element={<Meetings />} />
        <Route path="/meetingform/:aluId" element={<Meetingform />} /> {/* Ensuring it works for all alumni */}
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
