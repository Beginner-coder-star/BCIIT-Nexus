import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const normBatch = (s) =>
  String(s ?? '')
    .trim()
    .replace(/[\u2013\u2014\u2212]/g, '-')
    .toLowerCase()

const RelatedAlumni = ({batches,aluId}) => {


const {alumni}= useContext(AppContext)
const [relAlu,setRelAlu]= useState([])
const navigate = useNavigate()
useEffect (()=>{
    if(alumni.length > 0 && batches ){
        const b = normBatch(batches)
        const alumniData = alumni.filter(
          (alu) => normBatch(alu.batches) === b && String(alu._id) !== String(aluId)
        )

        setRelAlu(alumniData)
    }
},[alumni,batches,aluId])
  return (
    <div className="flex flex-col items-center gap-4 my-16 text-black-900 md:mx-10">
      <h1 className="text-4xl font-medium text-center">--- Related Alumni ---</h1>
<p className="text-lg text-center mt-1">Browse more related alumni from the same batch</p>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {relAlu.slice(0, 5).map((item, index) => (
          <div
            key={item._id} // Added key prop for React list rendering
            onClick={() => {navigate(`/meetings/${item._id}`); scrollTo(0,0)}}
            className="border border-blue-600 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
          >
            <img
              className="w-full h-72 object-cover"
              src={item.image}
              alt={item.name}
            />

            <div className="p-4">
              <p className="text-blue-600 font-medium text-base">{item.degree}</p>
              <p className="text-black font-bold text-xl truncate">{item.name}</p>
              <p className="text-blue-500 text-sm font-bold">{item.batches}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate('/alumni')
          window.scrollTo(0, 0) // Fixed scrollTo function
        }}
        className="bg-blue-500 text-black-600 px-12 py-3 rounded-full m-10"
      >
        More
      </button>
    </div>
  )
}

export default RelatedAlumni
