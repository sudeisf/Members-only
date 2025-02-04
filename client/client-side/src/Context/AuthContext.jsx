import {  createContext, useContext, useState, useEffect } from "react";



export const AuthenticateContext = createContext();


export const AuthProvider = ({children}) =>{
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)


    const API_URL = import.meta.env.VITE_API_URL;


    useEffect(()=>{
            axios.get(`${API_URL}/api/user`
                ,{
                    withCredentials: true
                }
            ).then((res)=>{
                setIsAuthenticated(true)
                setLoading(false)
            })
            .catch((err)=>{
                setIsAuthenticated(false)
                setLoading(false)
    }).finally(()=>{
        setLoading(false)
    })},[])




    return <AuthenticateContext.Provider value={{isAuthenticated, login , logout}} >
            {children}
             </AuthenticateContext.Provider>
}


export const useAuth = () =>{
       return useContext(AuthenticateContext)
}