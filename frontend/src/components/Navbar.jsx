import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  const handleLogout = () => {
  navigate("/logout");
  };

  return (

    <div className='flex items-center justify-between text-sm py-2 mb-5 border-b border-b-blue-500'>
      <img onClick={() => navigate('/')} className='w-44 cursor-pointer' src={assets.bciitnexux_logo} alt="BCIITNexus Logo" style={{ width: "150px", height: "auto" }} />

      <ul className='hidden md:flex items-start gap-5 font-medium'>
        <NavLink to='/'><li className='py-1'>HOME</li></NavLink>
        <NavLink to='/alumni'><li className='py-1'>ALUMNI</li></NavLink>
        <NavLink to='/events'><li className='py-1'>EVENTS</li></NavLink>
        <NavLink to='/gallery'><li className='py-1'>GALLERY</li></NavLink>
      </ul>

      <div className='flex items-center gap-4'>
        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />

        {/* Mobile Menu */}
        <div className={` ${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img className='w-36' src={assets.bciitnexux_logo} alt="" />
            <img className='w-7' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
          </div>

          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            <NavLink onClick={() => setShowMenu(false)} to='/'>HOME</NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/alumni'>ALUMNI</NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/events'>EVENTS</NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/gallery'>GALLERY</NavLink>
          </ul>

          <div className='flex flex-col items-center mt-4 gap-3'>
            {
              token ? (
                <>
                  <NavLink to="/my-profile" onClick={() => setShowMenu(false)} className='bg-blue-500 text-white px-6 py-2 rounded-full'>My Profile</NavLink>
                  <button onClick={handleLogout} className='text-red-500 underline'>Logout</button>
                </>
              ) : (
                <button onClick={() => { setShowMenu(false); navigate('/login'); }} className='bg-primary text-white px-8 py-3 rounded-full font-light'>Create Account</button>
              )
            }
          </div>
        </div>

        {/* Desktop Profile/Login */}
        {
          token ? (
            <div className='hidden md:flex items-center gap-2 cursor-pointer group relative'>
              <NavLink to="/my-profile">
                <img className='w-4 rounded-full' src={assets.profile_pic} alt="profile" />
              </NavLink>

              <button onClick={handleLogout} className='text-red-500 text-sm font-medium'>
                Logout
              </button>
            </div>
          ) : (
            <button onClick={() => navigate('/login')} className='bg-primary text-white px-5 py-1.5 rounded-full font-light hidden md:block'>Create Account</button>
          )
        }
      </div>
    </div>
  );
};

export default Navbar;
