import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const GalleryList = () => {
  const { gallery, aToken, getAllGallery } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllGallery()
    }
  }, [aToken])

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-xl font-medium '>All Gallery Images</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
          gallery.map((item, index) => (
            <div className='border border-purple-400 rounded-xl max-w-56 overflow-hidden cursor-pointer group hover:translate-y-[-10px] transition-all duration-500' key={index}>
              <img className="w-48 h-48 object-cover" src={item.gelimage} alt="gallery" />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default GalleryList
