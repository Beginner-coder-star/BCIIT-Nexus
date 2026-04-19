import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/events/${id}`);
        if (res.data.success) {
          setEvent(res.data.event);
        }
      } catch (err) {
        console.error("Error fetching event details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) return <h2 className="text-center mt-10 text-lg">Loading Event...</h2>;

  if (!event) {
    return <h2 className="text-center text-2xl font-bold mt-10">Event Not Found</h2>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
        <img
          src={event.evimage}
          alt={event.title}
          className="w-full md:w-1/2 h-64 md:h-auto object-cover"
        />
        <div className="p-6 flex flex-col justify-center w-full md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-800">{event.title}</h1>
          <p className="text-lg text-gray-600 mt-2">
            📅 {event.date} | 🕒 {event.time}
          </p>
          <p className="text-lg text-gray-700 mt-1">📍 {event.venue}</p>
          <p className="text-md text-gray-500 mt-4">{event.description}</p>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
