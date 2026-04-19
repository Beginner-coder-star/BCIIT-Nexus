import React, { useState, useContext } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddEvents = () => {
  const [evimage, setEvImage] = useState(null);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [venue, setVenue] = useState('');
  const [description, setDescription] = useState('');

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!evimage) {
        return toast.error('Event image not selected');
      }

      const formData = new FormData();
      formData.append('evimage', evimage);
      formData.append('title', title);
      formData.append('date', date);
      formData.append('time', time);
      formData.append('venue', venue);
      formData.append('description', description);

      const { data } = await axios.post(backendUrl + '/api/admin/add-events', formData, {
        headers: { aToken },
      });

      if (data.success) {
        toast.success(data.message);
        setEvImage(null);
        setTitle('');
        setDate('');
        setTime('');
        setVenue('');
        setDescription('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Error while adding event');
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="h-[calc(100vh-3.5rem)] w-screen bg-white p-6 shadow-lg flex flex-col items-center overflow-hidden"
    >
      <p className="mb-3 text-2xl font-semibold text-center underline text-blue-600">ADD EVENTS</p>

      {/* Upload Section */}
      <div className="flex items-center gap-4 mb-4 text-black justify-center">
        <label htmlFor="event-img">
          <img
            className="w-40 h-40 bg-gray-100 rounded-xl cursor-pointer border-2 border-gray-300 object-cover"
            src={evimage ? URL.createObjectURL(evimage) : assets.upload_area}
            alt=""
          />
        </label>
        <input onChange={(e) => setEvImage(e.target.files[0])} type="file" id="event-img" hidden />
        <p className="text-black font-semibold">Upload Event <br /> Image</p>
      </div>

      {/* Event Fields */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-4xl">
        <div className="space-y-2">
          <div>
            <p className="font-semibold text-blue-600">Title</p>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              placeholder="Event Title"
              className="w-full border-2 border-gray-300 p-1 rounded text-sm"
              required
            />
          </div>

          <div>
            <p className="font-semibold text-blue-600">Date</p>
            <input
              onChange={(e) => setDate(e.target.value)}
              value={date}
              type="date"
              className="w-full border-2 border-gray-300 p-1 rounded text-sm"
              required
            />
          </div>

          <div>
            <p className="font-semibold text-blue-600">Time</p>
            <input
              onChange={(e) => setTime(e.target.value)}
              value={time}
              type="text"
              className="w-full border-2 border-gray-300 p-1 rounded text-sm"
              required
            />
          </div>

          <div>
            <p className="font-semibold text-blue-600">Venue</p>
            <input
              onChange={(e) => setVenue(e.target.value)}
              value={venue}
              type="text"
              placeholder="Venue"
              className="w-full border-2 border-gray-300 p-1 rounded text-sm"
              required
            />
          </div>
        </div>

        <div className="space-y-2 col-span-1">
          <div>
            <p className="font-semibold text-blue-600">Description</p>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder="Event Description"
              rows="6"
              className="w-full border-2 border-gray-300 p-1 rounded text-sm"
              required
            ></textarea>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center mt-3">
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-6 rounded-full text-sm hover:bg-blue-700"
        >
          Add Event
        </button>
      </div>
    </form>
  );
};

export default AddEvents;
