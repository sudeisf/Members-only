import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthenticateContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    
    const API_URL = import.meta.env.VITE_API_URL;
    const checkAuth = async () => {
            setLoading(true);
                try{
                    const res = await axios.get(`${API_URL}/api/user`, { withCredentials: true });
                    if(res.data.user){
                        setIsAuthenticated(true);
                    }else{
                        setIsAuthenticated(false);
                    }
                }catch(err){
                    console.error(err);
                }finally{
                    setLoading(false);
        }
    };

        useEffect(() => {
            checkAuth();
        }, []);


    const logout = async () => {
        try {
            await axios.get(`${API_URL}/api/logout`, { withCredentials: true });
            setIsAuthenticated(false);
            setAuthChange((prev) => !prev); 
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <AuthenticateContext.Provider value={{ isAuthenticated, logout, loading, checkAuth}}>
            {children}
        </AuthenticateContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthenticateContext);
};
