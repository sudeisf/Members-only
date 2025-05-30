import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const clearAllPersistedStores = () => {

  localStorage.removeItem("auth-store");
  localStorage.removeItem("user-store");
  localStorage.removeItem("notification-store");
  localStorage.removeItem("theme");
};

export const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      loading: true,

      // Login function
      login: async (credentials) => {
        set({ loading: true });
        try {
          const res = await axios.post(`${API_URL}/api/login`, credentials, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (res.status === 200) {
            set({ isAuthenticated: true });
            return { success: true };
          }
        } catch (error) {
          console.error("Login error:", error);
          return { 
            success: false, 
            error: error.response?.data?.msg || "An error occurred",
            type: error.response?.data?.type
          };
        } finally {
          set({ loading: false });
        }
      },

      // UI-blocking check
      checkAuth: async () => {
        set({ loading: true });
        try {
          const res = await axios.get(`${API_URL}/api/user`, {
            withCredentials: true,
          });
          set({ isAuthenticated: !!res.data.user });
        } catch (err) {
          console.error("Auth error:", err);
          set({ isAuthenticated: false });
        } finally {
          set({ loading: false });
        }
      },

      // Silent check, doesn't affect `loading`
      silentCheckAuth: async () => {
        try {
            set({ loading: true });
          const res = await axios.get(`${API_URL}/api/user`, {
            withCredentials: true,
          });
          set({ isAuthenticated: !!res.data.user });
        } catch (err) {
          console.warn("Silent auth check failed:", err);
          set({ isAuthenticated: false , loading : false });
        }
      },

      logout: async () => {
        try {
          await axios.get(`${API_URL}/api/logout`, { withCredentials: true });
          // Clear all persisted stores
          clearAllPersistedStores();
          // Reset auth state
          set({ isAuthenticated: false });
        } catch (err) {
          console.error("Logout error:", err);
        }
      },
    }),
    {
      name: "auth-store",
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated }),
    }
  )
);
