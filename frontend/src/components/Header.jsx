import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20'>
        {/*----------left side----*/}
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px] '>
            <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-right md:leading-tight'>Your Alumni Network Just a Click Away 
                <br/> Find, Connect, and Engage!</p>
            <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
                <img className='w-14 h-12' src= {assets.group_profiles} alt="" />
                <p className='font-semibold text-lg sm:text-xl'> 
    Turn Guidance into Growth <br className='hidden sm:block'/> Schedule a Meeting for a Brighter Future
</p>
            </div>
            <a href='#batches' className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-blue-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300' >
                Schedule Meeting <img className='w-3' src={assets.arrow_icon}/>
            </a>
        </div>

        {/* -----right side */}
        <div className='md:w-1/2 relative'>
            <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt="" />
        </div>
    </div>


  )
}

export default Header