import { useState, useEffect } from "react";

export default function Alert({ message, onClose }) {
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false); // Track fade-out effect

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadingOut(true); // Start fade-out effect
      setTimeout(() => {
        setVisible(false); // Remove alert after fade-out
        onClose && onClose();
      }, 500); // Match the CSS transition duration
    }, 5000); // Show alert for 5 seconds before fading out

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-5 right-5 bg-red-500 text-white px-4 py-2 rounded-md shadow-md flex items-center space-x-2 transition-opacity duration-500 ${
        fadingOut ? "opacity-0" : "opacity-100"
      } animate-slide-in`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v2m0 4h.01M5 19h14c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"
        />
      </svg>
      <span>{message}</span>
      <button
        onClick={() => {
          setFadingOut(true);
          setTimeout(() => setVisible(false), 500);
        }}
        className="ml-2 text-white font-bold"
      >
        &times;
      </button>
    </div>
  );
}
