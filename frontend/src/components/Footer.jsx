import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'> 
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <img className='mb-5 w-40' src={assets.bciitnexux_logo} alt="" />
                <p className='w-full md:w-2/3 text-black-500 leading-6'>
                BCIITNexus is a dedicated platform connecting students and alumni of BCIIT. Here, you can explore alumni profiles, view their career journeys, and schedule interactive sessions to gain valuable insights. Whether you're seeking mentorship, networking opportunities, or inspiration from past graduates, BCIITNexus bridges the gap between students and their alumni community. Stay connected, stay inspired!
                </p>
            </div>
            




            <div>
                <p className='text-xl font-medium mb-5'>
                    BCIIT Info
                </p>
                <ul className='flex flex-col gap-2 text-black-500'>
                    <li>www.bciit.ac.in</li>
                    <li>director@bciit.ac.in</li>
                    <li>91-11-49020144</li>

                </ul>
            </div>

    


            <div>
            <p className='text-xl font-medium mb-5'>
                    Get In Touch
                </p>
                <ul className='flex flex-col gap-2 text-black-500'>
                    <li>mca24_rupeshkumarsingh@bciit.ac.in</li>
                    <li>+91 7011512756</li>

                </ul>
            </div>
        </div>
        <div>
            <hr className=''/>
            <p className='py-5 text-center'>Copyright 2025@ BCIITNexux - All Right Reserved</p>
        </div>
    </div>
  )
}

export default Footer