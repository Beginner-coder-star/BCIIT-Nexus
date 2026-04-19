import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

/** Match batch strings despite en-dash / extra spaces (DB vs UI). */
const normalizeBatch = (s) =>
  String(s ?? '')
    .trim()
    .replace(/[\u2013\u2014\u2212]/g, '-')
    .toLowerCase();

/** Match "BCA", "B.C.A", "bca " etc. */
const normalizeDegree = (s) =>
  String(s ?? '')
    .replace(/\./g, '')
    .replace(/\s/g, '')
    .toLowerCase();

/** Same mapping as assets.js — homepage cards imply degree for this batch. */
const MCA_BATCHES = new Set(['2020-22', '2021-23', '2022-24', '2023-25', '2024-26']);
const BCA_BATCHES = new Set(['2020-23', '2021-24', '2022-25']);

const Alumni = () => {
  const { batches } = useParams();
  const navigate = useNavigate();
  const { alumni } = useContext(AppContext);
  const [filterAlu, setFilterAlu] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedDegree, setSelectedDegree] = useState('');

  // When opening a batch from "Find by batch", pre-select the course that card represents.
  useEffect(() => {
    if (!batches) return;
    const key = normalizeBatch(batches);
    if (MCA_BATCHES.has(key)) setSelectedDegree('MCA');
    else if (BCA_BATCHES.has(key)) setSelectedDegree('BCA');
  }, [batches]);

  const applyFilter = useCallback(() => {
    let filtered = [...alumni];
    const routeBatch = normalizeBatch(batches);

    if (batches) {
      filtered = filtered.filter((alu) => normalizeBatch(alu.batches) === routeBatch);
    }

    if (selectedDegree) {
      const want = normalizeDegree(selectedDegree);
      filtered = filtered.filter((alu) => normalizeDegree(alu.degree) === want);
    }

    filtered.sort((a, b) => {
      const na = Number(a.cgpa);
      const nb = Number(b.cgpa);
      if (Number.isFinite(nb) && Number.isFinite(na)) return nb - na;
      if (Number.isFinite(nb)) return -1;
      if (Number.isFinite(na)) return 1;
      return 0;
    });

    setFilterAlu(filtered);
  }, [alumni, batches, selectedDegree]);

  useEffect(() => {
    applyFilter();
  }, [applyFilter]);

  return (
    <div>
      <p className='text-2xl text-black-600'>Browse through the Alumni Batch & Degree</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>

        {/* Mobile Filter Button */}
        <button
          className={`py-1 px-3 border bg-blue-100 rounded text-sm transition-all sm:hidden ${
            showFilter ? 'bg-primary text-white' : ''
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>

        {/* Filter Section */}
        <div
          className={`flex flex-col gap-4 text-sm text-black-600 w-full sm:w-1/5 ${
            showFilter ? 'flex' : 'hidden sm:flex'
          }`}
        >
          {/* Degree Filter */}
          <div className='mt-3 sm:mt-6'>
            <p className='font-bold text-lg'>Degree</p>
            {['BCA', 'MCA'].map((degree) => (
              <p
                key={degree}
                onClick={() => setSelectedDegree(degree === selectedDegree ? '' : degree)}
                className={`bg-blue-100 text-center w-full sm:w-auto px-4 mt-1 py-1.5 border border-blue-400 rounded-full transition-all cursor-pointer ${
                  selectedDegree === degree ? 'bg-blue-400 text-black' : ''
                }`}
              >
                {degree}
              </p>
            ))}
          </div>

          {/* Batch Filter */}
          <div>
            <p className='font-bold text-lg'>Batch</p>
            {[
              '2020-22',
              '2021-23',
              '2022-24',
              '2023-25',
              '2024-26',
              '2020-23',
              '2021-24',
              '2022-25',
            ].map((batch) => (
              <p
                key={batch}
                onClick={() =>
                  normalizeBatch(batches) === normalizeBatch(batch)
                    ? navigate('/alumni')
                    : navigate(`/alumni/${batch}`)
                }
                className={`bg-blue-100 text-center w-full sm:w-auto px-4 mt-1 py-1.5 border border-blue-400 rounded-full transition-all cursor-pointer ${
                  normalizeBatch(batches) === normalizeBatch(batch) ? 'bg-blue-400 text-black' : ''
                }`}
              >
                {batch}
              </p>
            ))}
          </div>
        </div>

        {/* Alumni Profiles */}
        <div className='w-full sm:w-3/4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {filterAlu.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/meetings/${item._id}`)}
              className='border border-blue-600 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
            >
              <img
                className='w-full h-64 object-cover bg-gray-100'
                src={item.image || ''}
                alt={item.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    'data:image/svg+xml,' +
                    encodeURIComponent(
                      '<svg xmlns="http://www.w3.org/2000/svg" width="320" height="256" fill="%2394a3b8"><rect width="100%" height="100%"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23f1f5f9" font-family="sans-serif" font-size="14">Photo</text></svg>'
                    );
                }}
              />
              <div className='p-4 bg-blue-50'>
                <p className='text-blue-600 font-medium text-base'>{item.degree}</p>
                <p className='text-black font-bold text-xl truncate'>{item.name}</p>
                <p className='text-blue-500 text-sm font-bold'>{item.batches}</p>
                <p className='text-black text-sm font-semibold'>CGPA: {item.cgpa}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Alumni;
