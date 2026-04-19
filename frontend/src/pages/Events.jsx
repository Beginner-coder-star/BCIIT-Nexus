import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 4;
  const navigate = useNavigate();

  // ✅ Fetch Events from Backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/events/list", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        
        

        if (res.data.success) {
          setEvents(res.data.events.reverse()); // latest first
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // ✅ Pagination logic
  const totalPages = Math.ceil(events.length / eventsPerPage);
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  // ✅ Smooth Scroll to Top on Page Change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4">Events</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {currentEvents.map((event) => (
          <div 
            key={event._id}
            className="flex flex-col sm:flex-row bg-blue-50 shadow-lg rounded-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
            onClick={() => navigate(`/event/${event._id}`)}
          >
            <img 
              src={event.evimage} 
              alt={event.title} 
              className="w-full sm:w-1/3 h-40 md:h-48 lg:h-56 object-cover"
            />
            <div className="p-4 w-full sm:w-2/3">
              <h2 className="text-lg sm:text-xl font-semibold text-blue-600">{event.title}</h2>
              <p className="text-xs sm:text-sm text-gray-600">{event.date} | {event.time}</p>
              <p className="text-xs sm:text-sm text-gray-700">{event.venue}</p>
              <p className="text-xs sm:text-sm text-gray-500">
                {event.description?.slice(0, 50)}...
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center items-center mt-6 space-x-2 sm:space-x-4">
        <button 
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className={`text-sm md:text-base px-3 md:px-4 py-1 md:py-2 rounded-md ${
            currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
          }`}
        >
          Previous
        </button>

        <span className="text-sm sm:text-lg font-semibold">
          Page {currentPage} of {totalPages}
        </span>

        <button 
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className={`text-sm md:text-base px-3 md:px-4 py-1 md:py-2 rounded-md ${
            currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Events;
