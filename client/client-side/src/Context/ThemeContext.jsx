import { createContext, useContext, useEffect, useState, useMemo } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        
        document.documentElement.classList.toggle("dark", darkMode);
       
        localStorage.setItem("theme", darkMode ? "dark" : "light");
        
        if (!darkMode) {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);
    

    const toggleTheme = () => setDarkMode((prev) => !prev);

    const value = useMemo(() => ({ darkMode, toggleTheme }), [darkMode]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
