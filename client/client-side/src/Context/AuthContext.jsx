import {  createContext, useContext, useState } from "react";



export const AuthenticateContext = createContext();


export const AuthProvider = ({children}) =>{
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('jwtToken'));

    const login = (token)=> {
       localStorage.setItem('jwtToken',token);
       setIsAuthenticated(true);
    }
    const logout =() =>{
        localStorage.removeItem('jwtToken');
        setIsAuthenticated(false);
    }



    return <AuthenticateContext.Provider value={{isAuthenticated, login , logout}} >
            {children}
             </AuthenticateContext.Provider>
}

export const useAuth = () =>{
       return useContext(AuthenticateContext)
}