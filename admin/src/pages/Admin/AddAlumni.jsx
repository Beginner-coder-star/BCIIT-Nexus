import React, { useState, useContext } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddAlumni = () => {
  const [aluImg, setAluImg] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cgpa, setCgpa] = useState('');
  const [ug, setUg] = useState('BCA');
  const [degree, setDegree] = useState('MCA');
  const [linkedin, setLinkedin] = useState('');
  const [project, setProject] = useState('');
  const [place, setPlace] = useState('SEEKING');
  const [act, setAct] = useState('Anukriti- Photography Society');
  const [batches, setBatches] = useState('2020-22');

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!aluImg) {
        return toast.error('Image Not Selected');
      }

      const formData = new FormData();
      formData.append('image', aluImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('cgpa', Number(cgpa));
      formData.append('ug', ug);
      formData.append('degree', degree);
      formData.append('linkedin', linkedin);
      formData.append('project', project);
      formData.append('place', place);
      formData.append('act', act);
      formData.append('batches', batches);

      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const { data } = await axios.post(
        backendUrl + '/api/admin/add-alumni',
        formData,
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        // Reset all fields
        setAluImg(null);
        setName('');
        setEmail('');
        setCgpa('');
        setUg('BCA');
        setDegree('MCA');
        setLinkedin('');
        setProject('');
        setPlace('SEEKING');
        setAct('Anukriti- Photography Society');
        setBatches('2020-22');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Something went wrong!');
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="h-[calc(100vh-3.5rem)] w-screen bg-white p-6 shadow-lg flex flex-col items-center overflow-hidden"
    >
      <p className="mb-3 text-2xl font-semibold text-center underline text-blue-600">ADD ALUMNI</p>

      {/* Upload Section */}
      <div className="flex items-center gap-4 mb-4 text-black justify-center">
        <label htmlFor="alu-img">
          <img
            className="w-24 h-24 bg-gray-100 rounded-full cursor-pointer border-2 border-gray-300"
            src={aluImg ? URL.createObjectURL(aluImg) : assets.upload_area}
            alt=""
          />
        </label>
        <input onChange={(e) => setAluImg(e.target.files[0])} type="file" id="alu-img" hidden />
        <p className="text-black font-semibold">Upload Alumni <br /> Picture</p>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-4xl">
        {/* Left Side */}
        <div className="space-y-2">
          <div>
            <p className="font-semibold text-blue-600">Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Mr/Ms/Mrs.Name"
              className="w-full border-2 border-gray-300 p-1 rounded text-sm"
              required
            />
          </div>

          <div>
            <p className="font-semibold text-blue-600">Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email"
              className="w-full border-2 border-gray-300 p-1 rounded text-sm"
              required
            />
          </div>

          <div>
            <p className="font-semibold text-blue-600">CGPA</p>
            <input
              onChange={(e) => setCgpa(e.target.value)}
              value={cgpa}
              type="number"
              step="0.01"
              className="w-full border-2 border-gray-300 p-1 rounded text-sm"
              required
            />
          </div>

          <div>
            <p className="font-semibold text-blue-600">Placement Status</p>
            <select
              onChange={(e) => setPlace(e.target.value)}
              value={place}
              className="w-full border-2 border-gray-300 p-1 rounded text-sm"
            >
              <option value="PLACED">PLACED</option>
              <option value="SEEKING">SEEKING</option>
            </select>
          </div>
        </div>

        {/* Right Side */}
        <div className="space-y-2">
          <div>
            <p className="font-semibold text-blue-600">Batch</p>
            <select
              onChange={(e) => setBatches(e.target.value)}
              value={batches}
              className="w-full border-2 border-gray-300 p-1 rounded text-sm"
            >
              <option value="2020-22">2020-22</option>
              <option value="2021-23">2021-23</option>
              <option value="2022-24">2022-24</option>
              <option value="2023-25">2023-25</option>
              <option value="2024-26">2024-26</option>
              <option value="2020-23">2020-23</option>
              <option value="2021-24">2021-24</option>
              <option value="2022-25">2022-25</option>
            </select>
          </div>

          <div>
            <p className="font-semibold text-blue-600">Degree</p>
            <select
              onChange={(e) => setDegree(e.target.value)}
              value={degree}
              className="w-full border-2 border-gray-300 p-1 rounded text-sm"
            >
              <option value="MCA">MCA</option>
              <option value="BCA">BCA</option>
            </select>
          </div>

          <div>
            <p className="font-semibold text-blue-600">College Society Involvement</p>
            <select
              onChange={(e) => setAct(e.target.value)}
              value={act}
              className="w-full border-2 border-gray-300 p-1 rounded text-sm"
            >
              <option value="Anukriti- Photography Society">Anukriti- Photography Society</option>
              <option value="Rangmanch- Drama Society">Rangmanch- Drama Society</option>
              <option value="Mridang- Music Society">Mridang- Music Society</option>
              <option value="Chitraansh- Art Society">Chitraansh- Art Society</option>
              <option value="Innovatup- Innovation & Startup Cell">Innovatup- Innovation & Startup Cell </option>
              <option value="NA">NA</option>
            </select>
          </div>

          <div>
            <p className="font-semibold text-blue-600">Undergraduate Course</p>
            <select
              onChange={(e) => setUg(e.target.value)}
              value={ug}
              className="w-full border-2 border-gray-300 p-1 rounded text-sm"
            >
              <option value="BCA">BCA</option>
              <option value="Pursuing BCA">Pursuing BCA</option>
              <option value="B.Sc">B.Sc</option>
              <option value="B.A">B.A</option>
              <option value="B.Com">B.Com</option>
              <option value="B.Voc">B.Voc</option>
              <option value="BBA">BBA</option>
              <option value="B.Tech">B.Tech</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <p className="font-semibold text-blue-600">LinkedIn Profile</p>
            <input
              onChange={(e) => setLinkedin(e.target.value)}
              value={linkedin}
              type="url"
              placeholder="Enter LinkedIn URL"
              className="w-full border-2 border-gray-300 p-1 rounded text-sm"
            />
          </div>
        </div>
      </div>

      {/* Project Section */}
      <div className="mt-4 w-full max-w-4xl">
        <p className="font-semibold text-blue-600">Project</p>
        <textarea
          onChange={(e) => setProject(e.target.value)}
          value={project}
          placeholder="About all projects"
          rows="2"
          className="w-full border-2 border-gray-300 p-1 rounded text-sm"
          required
        ></textarea>
      </div>

      {/* Submit Button */}
      <div className="text-center mt-3">
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-6 rounded-full text-sm hover:bg-blue-700"
        >
          Add Alumni
        </button>
      </div>
    </form>
  );
};

export default AddAlumni;
