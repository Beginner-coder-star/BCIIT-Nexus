import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import RelatedAlumni from '../components/RelatedAlumni';

const Meetings = () => {
  const { aluId } = useParams();
  const navigate = useNavigate();
  const { alumni } = useContext(AppContext);
  const [aluInfo, setAluInfo] = useState(null);

  useEffect(() => {
    const foundAlumni = alumni.find(alu => alu._id === aluId);
    setAluInfo(foundAlumni);
  }, [alumni, aluId]);

  return aluInfo ? (
    <div className="p-4 sm:p-6">
      {/*--- Alumni Details ----*/}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-auto flex justify-center">
          <img 
            className="border-2 border-black w-56 sm:w-64 h-50 sm:h-80 rounded-lg object-cover" 
            src={aluInfo?.image} 
            alt={aluInfo?.name} 
          />
        </div>

        <div className="flex-1 border border-none rounded-lg p-4 sm:p-6 bg-blue-50 mx-2 sm:mx-0 mt-[-40px] sm:mt-0">
          {/*---- Alumni Info -----*/}
          <p className="flex items-center gap-2 text-2xl sm:text-4xl font-medium mb-4">{aluInfo.name}</p>

          <div className="flex flex-wrap items-center gap-2 text-base sm:text-lg mb-4">
            <p className="text-blue-800">{aluInfo.degree} {aluInfo.batches}</p>
            <button className="py-1 px-3 border-2 text-sm rounded-full border-green-500">
              {aluInfo.place}
            </button>
          </div>

          {/*--- Alumni Details Section ----*/}
          <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
            <p><span className="font-medium">CGPA:</span> <span className="ml-2">{aluInfo.cgpa}</span></p>
            <p><span className="font-medium">Email:</span> <span className="ml-2">{aluInfo.email}</span></p>
            <p><span className="font-medium">UnderGraduate Course:</span> <span className="ml-2">{aluInfo.ug}</span></p>
            <p><span className="font-medium">College Society Involvement:</span> <span className="ml-2">{aluInfo.act}</span></p>
          </div>

          {/*---- Projects Section ----*/}
          <div className="mt-5">
            <p className="font-medium mb-2">Projects:</p>
            <p className="max-w-full sm:max-w-[700px] break-words">{aluInfo.project}</p>
          </div>

          {/*--- LinkedIn Section ----*/}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <p className="font-medium">LinkedIn:</p>
            {aluInfo?.linkedin ? (
              <a href={aluInfo.linkedin} target="_blank" rel="noopener noreferrer">
                <button className="py-1 px-3 bg-blue-600 text-white rounded-full text-xs sm:text-sm">
                  View Profile
                </button>
              </a>
            ) : (
              <p className="text-gray-500 text-sm">Not Available</p>
            )}
          </div>
        </div>
      </div>

      {/*--- Schedule Meeting Button ----*/}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => {
            if (aluInfo?._id) {
              navigate(`/meetingform/${aluInfo._id}`);
            } else {
              console.error("Alumni ID is undefined");
            }
          }}
          className="text-sm sm:text-base bg-blue-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full mt-4 hover:scale-105 transition-all"
        >
          Schedule Meeting
        </button>
      </div>

      <RelatedAlumni aluId={aluId} batches={aluInfo.batches} />
    </div>
  ) : (
    <p className="text-center text-lg">Loading...</p>
  );
};

export default Meetings;
