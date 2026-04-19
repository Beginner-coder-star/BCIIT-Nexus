import { useState } from "react";
import { createContext } from "react";

export const AlumniContext = createContext()

const AlumniContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [dToken, setDToken] = useState(() => localStorage.getItem('dToken') || '');


    const value={
        dToken, setDToken,
        backendUrl,
    }
    return (
        <AlumniContext.Provider value={value}>
            {props.children}
            </AlumniContext.Provider>
    )
}

export default AlumniContextProvider;