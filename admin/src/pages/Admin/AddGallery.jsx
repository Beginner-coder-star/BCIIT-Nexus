import React, { useState, useContext, useRef } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddGallery = () => {
  const [gelimage, setGelImage] = useState(null);
  const fileInputRef = useRef(null); // Ref to reset file input
  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!gelimage) {
      return toast.error('Please select an image');
    }

    try {
      const formData = new FormData();
      formData.append('gelimage', gelimage);

      const { data } = await axios.post(`${backendUrl}/api/admin/add-gallery`, formData, {
        headers: { aToken },
      });

      if (data.success) {
        toast.success(data.message);
        setGelImage(null); // Clear preview
        fileInputRef.current.value = ''; // Reset file input
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to upload image');
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-screen w-screen bg-white p-6 flex flex-col items-center"
    >
      <h2 className="text-2xl font-semibold text-blue-600 underline mb-6">Upload Gallery Image</h2>

      {/* Choose File */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={(e) => setGelImage(e.target.files[0])}
        className="mb-4"
      />

      {/* Preview Image */}
      {gelimage && (
        <div className="mb-6 flex justify-center">
          <img
            src={URL.createObjectURL(gelimage)}
            alt="Preview"
            className="max-w-[600px] w-full h-auto border rounded shadow"
          />
        </div>
      )}

      {/* Upload Button */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Upload
      </button>
    </form>
  );
};

export default AddGallery;
