import { createContext, useContext, useEffect, useState, useMemo } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        // Toggle the 'dark' class based on darkMode state
        document.documentElement.classList.toggle("dark", darkMode);
        // Persist the theme preference to localStorage
        localStorage.setItem("theme", darkMode ? "dark" : "light");
        // Disable the default browser dark mode if not in darkMode
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
