import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme === "dark"; // True if "dark", otherwise false
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark"); // Add 'dark' class for dark mode
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark"); // Remove 'dark' class for light mode
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    const toggleTheme = () => {
        setDarkMode((prevDarkMode) => !prevDarkMode);
    };

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

