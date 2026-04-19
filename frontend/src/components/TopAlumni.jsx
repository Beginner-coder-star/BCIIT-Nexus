import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopAlumni = () => {
  const navigate = useNavigate()
  const { alumni } = useContext(AppContext)

  // Sort alumni by CGPA in descending order and pick top 10
  const topToppers = [...alumni]
    .filter(item => item.cgpa) // Optional: only include those with cgpa
    .sort((a, b) => b.cgpa - a.cgpa)
    .slice(0, 8)

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-black-900 md:mx-10">
      <h1 className='text-3xl font-medium'>TOP ALUMNI</h1>
      <p className='sm:w-1/3 text-center text:sm'>Connect with our Toppers!</p>

      <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {topToppers.map((item) => (
          <div
            key={item._id}
            onClick={() => {
              navigate(`/meetings/${item._id}`)
              window.scrollTo(0, 0)
            }}
            className="border border-blue-600 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
          >
            <img
              className="w-full h-72 object-cover"
              src={item.image}
              alt={item.name}
            />
            <div className="p-4 bg-blue-50">
              <p className="text-blue-600 font-medium text-base">{item.degree}</p>
              <p className="text-black font-bold text-xl truncate">{item.name}</p>
              <p className="text-blue-500 text-sm font-bold">{item.batches}</p>
              <p className="text-gray-700 text-sm">CGPA: {item.cgpa}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          navigate('/alumni')
          window.scrollTo(0, 0)
        }}
        className="bg-blue-600 text-white px-12 py-3 rounded-full m-10 hover:scale-105 transition-all"
      >
        More...
      </button>
    </div>
  )
}

export default TopAlumni
