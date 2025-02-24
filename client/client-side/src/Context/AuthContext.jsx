import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthenticateContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [authChange, setAuthChange] = useState(false); // 🔄 State trigger for re-fetching auth

    const API_URL = import.meta.env.VITE_API_URL;

    // 🔄 Runs on mount & when authChange updates (login/logout)
    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true);
            try {
                await axios.get(`${API_URL}/api/user`, { withCredentials: true });
                setIsAuthenticated(true);
            } catch (err) {
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [authChange]); // 👈 Re-run when login/logout happens

    const logout = async () => {
        try {
            await axios.get(`${API_URL}/api/logout`, { withCredentials: true });
            setIsAuthenticated(false);
            setAuthChange((prev) => !prev); // 🔄 Trigger re-fetching auth status
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <AuthenticateContext.Provider value={{ isAuthenticated, logout, loading }}>
            {children}
        </AuthenticateContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthenticateContext);
};
