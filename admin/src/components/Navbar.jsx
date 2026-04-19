import React, {useContext} from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import {useNavigate} from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate()

    const {aToken,setAToken} = useContext(AdminContext)
    const logout = ()=> {
        navigate('/')
            aToken && setAToken('')
            aToken && localStorage.removeItem('aToken')
    }
  return (
    <div className='flex justify-between items-center px-4 bg-white sm:px-10 py-3 border-b'>
        <div className='flex items-center gap-2 text-xs'>
          <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" style={{ width: "150px", height: "auto" }} /> 
          <p className='border-2 cursor-pointer px-2.5 py-0.5 rounded-full border-blue-600'> {aToken ? 'Admin' : 'Alumni'}</p>
        
        </div>
        <button onClick={logout} className='bg-primary text-white text-sm px-10 py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar