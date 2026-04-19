import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendUrl =
    String(import.meta.env.VITE_BACKEND_URL ?? "")
      .trim()
      .replace(/\/$/, "") || "http://localhost:4000";
  const [alumni, setAlumni] = useState([]);
  const [events, setEvents] = useState([]);
  const [gallery, setGallery] = useState([]);

  const getAlumniData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/alumni/list`);
      if (data.success) setAlumni(data.alumni);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getEventsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/events/list`);
      if (data.success) setEvents(data.events);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getGalleryData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/gallery/list`);
      if (data.success) setGallery(data.gallery);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAlumniData();
    getEventsData();
    getGalleryData();
  }, []);

  const value = {
    alumni,
    events,
    gallery,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
