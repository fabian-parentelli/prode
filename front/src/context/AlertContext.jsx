import { Snackbar, Loader } from 'fara-comp-react';
import { createContext, useContext, useState } from "react";

const AlertContext = createContext();
export const useAlertContext = () => useContext(AlertContext);

const AlertProvider = ({ children }) => {

    const [loading, setLoading] = useState(false);
    const [textLoader, setTextLoader] = useState(false);
    const [snack, setSnack] = useState({ open: false, message: '', status: 'success' });

    const showAlert = (message, status = 'success') => {
        setSnack({ open: true, message, status });
        setTimeout(() => { setSnack({ open: false, message: '', status: 'success' }) }, 4000);
    };

    return (
        <AlertContext.Provider value={{ showAlert, setLoading, setTextLoader }}>
            {children}
            
            <Snackbar snack={snack} />
            <Loader loading={loading} text={textLoader} />
        </AlertContext.Provider>
    );
};

export default AlertProvider;