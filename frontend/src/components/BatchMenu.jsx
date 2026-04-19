import React from 'react'
import { batches } from '../assets/assets'
import { Link } from 'react-router-dom'

const BatchMenu = () => {
  // Duplicate batches if more than 5 for round scroll illusion
  const displayBatches = batches.length > 5 ? [...batches, ...batches] : batches;

  return (
    <div className='flex flex-col items-center gap-4 py-16 text-gray-800' id='batches'>
      <h1 className='text-3xl font-medium'>FIND BY BATCH</h1>
      <p className='sm:w-1/3 text-center text-sm'>Discover Your Alumni Community By Their Batches!</p><br />

      <div className='w-full overflow-x-auto scrollbar-hide'>
        <div className='flex gap-4 px-5 pt-5 min-w-max animate-scroll'>
          {displayBatches.map((item, index) => (
            <Link
              onClick={() => scrollTo(0, 0)}
              className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500'
              key={index}
              to={`/alumni/${item.batches}`}
            >
              <img className='w-[200px] sm:w-[200px] mb-2' src={item.image} alt="" />
              <p className='text-2xl text-black-500'>{item.batches}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BatchMenu
