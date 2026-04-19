import React from 'react'
import { useContext } from 'react'
import {AdminContext} from '../context/AdminContext'
import {NavLink} from 'react-router-dom'
import {assets} from '../assets/assets'

const Sidebar = () => {

    const {aToken} =useContext(AdminContext)
  return (
    <div className='min-h-screen bg-white font-semibold border-right'>
        {
            aToken && <ul className='text-black mt-5'>
                <NavLink className={({isActive})=> `flex items items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-blue-200 border-r-4 border-primary': ''}  `} to={'/add-alumni'}> <img src={assets.add_icon} alt="" />
                <p>Add Alumni</p></NavLink>


                <NavLink className={({isActive})=> `flex items items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-blue-100 border-r-4 border-primary': ''}  `} to={'/add-events'}> <img src={assets.add_icon} alt="" />
                <p>Add Events</p></NavLink>


                <NavLink className={({isActive})=> `flex items items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-blue-100 border-r-4 border-primary': ''}  `} to={'/add-gallery'}> <img src={assets.add_icon} alt="" />
                <p>Add Gallery</p></NavLink>


                <NavLink className={({isActive})=> `flex items items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-blue-100 border-r-4 border-primary': ''}  `} to={'/alumni-list'}> <img src={assets.list_icon} alt="" />
                <p>Alumni List</p></NavLink>

                <NavLink className={({isActive})=> `flex items items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-blue-100 border-r-4 border-primary': ''}  `} to={'/events-list'}> <img src={assets.list_icon} alt="" />
                <p>Events List</p></NavLink>

                <NavLink className={({isActive})=> `flex items items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-blue-100 border-r-4 border-primary': ''}  `} to={'/gallery-list'}> <img src={assets.list_icon} alt="" />
                <p>Gallery List</p></NavLink>
            </ul>
        }
    </div>
  )
}

export default Sidebar