import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Meetingform = () => {
  const { aluId } = useParams();
  const { alumni } = useContext(AppContext);
  const [aluInfo, setAluInfo] = useState(null);

  useEffect(() => {
    if (aluId) {
      const foundAlumni = alumni.find((alu) => alu._id === aluId);
      setAluInfo(foundAlumni);
    }
  }, [alumni, aluId]);

  return aluInfo ? (
    <div className="flex justify-center items-start min-h-screen p-2">
      <div className="w-full max-w-3xl shadow-lg border border-gray-300 p-6 rounded-lg">
        <p className="text-center text-blue-600 mb-4">
          You need to fill out the form, and the alumni will connect with you soon!
        </p>
        <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">
          Connect with {aluInfo.name}
        </h2>

        {/* Form */}
        <form 
          action={`https://formsubmit.co/${aluInfo.email}`} 
          method="POST" 
          encType="multipart/form-data"
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Left Column: Student Details */}
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block font-medium">Your Name</label>
              <input type="text" name="Name" required className="w-full border rounded p-2" />
            </div>

            {/* Email */}
            <div>
              <label className="block font-medium">Your Email</label>
              <input type="email" name="Email" required className="w-full border rounded p-2" />
            </div>

            {/* Course & Semester */}
            <div>
              <label className="block font-medium">Course & Semester</label>
              <input type="text" name="Course&semester" required className="w-full border rounded p-2" />
            </div>

            {/* Batch */}
            <div>
              <label className="block font-medium">Batch</label>
              <input type="text" name="Batch" required className="w-full border rounded p-2" />
            </div>

            {/* Meeting Type */}
            <div>
              <label className="block font-medium">Meeting Type</label>
              <select name="Meeting_type" required className="w-full border rounded p-2">
                <option value="Video Conferencing">Video Conferencing</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="WhatsApp">WhatsApp</option>
              </select>
            </div>
          </div>

          {/* Right Column: Links & Questions */}
          <div className="space-y-4">
            {/* WhatsApp Link */}
            <div>
              <label className="block font-medium">WhatsApp Profile Link</label>
              <input type="url" name="Whatsapp_link" className="w-full border rounded p-2" />
            </div>

            {/* LinkedIn Link */}
            <div>
              <label className="block font-medium">LinkedIn Profile Link</label>
              <input type="url" name="Linkedin_link" className="w-full border rounded p-2" />
            </div>

            {/* College ID Upload */}
            <div>
              <label className="block font-medium">Upload College ID</label>
              <input 
                type="file" 
                name="College_ID" 
                accept="image/*" 
                required 
                className="w-full border rounded p-2"
              />
            </div>

            {/* Question */}
            <div>
              <label className="block font-medium">
                What type of question would you like to ask an alumnus?
              </label>
              <textarea name="Question" required className="w-full border rounded p-2" rows="4"></textarea>
            </div>
          </div>

          {/* Submit Button (Spans both columns) */}
          <div className="md:col-span-2">
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <p className="text-center mt-6 text-red-500">Loading...</p>
  );
};

export default Meetingform;
