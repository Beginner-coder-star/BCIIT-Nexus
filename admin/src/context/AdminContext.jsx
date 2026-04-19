import { createContext, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') || '');
    const [alumni, setAlumni] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [events, setEvents] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getAllAlumni = async () => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/all-alumni', {}, { headers: { aToken } });
            if (data.success) {
                setAlumni(data.alumni);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const getAllGallery = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/gallery/list', { headers: { aToken } });
            if (data.success) {
                setGallery(data.gallery);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const getAllEvents = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/events/list', { headers: { aToken } });
            if (data.success) {
                setEvents(data.events);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const value = {
        aToken, setAToken,
        backendUrl,
        alumni, getAllAlumni,
        gallery, getAllGallery,
        events, getAllEvents,
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;
