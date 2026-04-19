import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const EventsList = () => {
  const { events, aToken, getAllEvents } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllEvents();
    }
  }, [aToken]);

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-xl font-medium">All Events</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {events.map((event, index) => (
          <div
            key={index}
            className="border border-blue-400 rounded-xl max-w-56 overflow-hidden cursor-pointer group hover:translate-y-[-10px] transition-all duration-500"
          >
            <img
              className="w-48 h-48 object-cover"
              src={event.evimage}
              alt="event"
            />
            <div className="p-1">
              <p className="text-blue-600 font-sm text-base">{event.title}</p>
              <p className="text-black text-sm truncate">{event.date}</p>
              <p className="text-blue-500 text-sm font-bold">{event.venue}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsList;
