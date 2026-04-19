import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'

const AlumniList = () => {
  const{alumni, aToken, getAllAlumni} = useContext(AdminContext)
  useEffect(()=>{
    if (aToken) {
      getAllAlumni()
    }
  }, [aToken]
  )
  
  
  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-xl font-medium '>All Alumni</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
          alumni.map((item,index)=>(
            <div className='border border-blue-400 rounded-xl max-w-56 overflow-hidden cursor-pointer group hover:translate-y-[-10px] transition-all duration-500 cursor-pointer' key={index}> <img className="w-48 h-48 object-cover" src= {item.image} alt="alumni" />
            <div className='p-1'>
            <p className='text-blue-600 font-sm text-base'>{item.degree}</p>
              <p className='text-black text-sm truncate'>{item.name}</p>
              <p className='text-blue-500 text-sm font-bold '>{item.batches}</p>
              
            </div>
              </div>
          ))
            
          
        }
      </div>
    </div>
  )
}

export default AlumniList