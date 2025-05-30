import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";
import socket from "../services/sharedSocket";


const storage = createJSONStorage(() => localStorage);

export const useNotificationStore = create(
  persist(
    (set, get) => ({
      notifications: [],
      isLoading: false,
      error: null,
      lastSync: null,
      addNotification: (notification) =>
        set((state) => ({
          notifications: [notification, ...state.notifications],
          lastSync: new Date().toISOString(),
        })),
      getNotificationCount: () => {
        return get().notifications.filter((n) => !n.is_read).length;
      },
      clearNotifications: () => set({ 
        notifications: [],
        lastSync: new Date().toISOString(),
      }),
      markAsRead: async (id) => {
        try {
          const response = await axios.patch(
            `${import.meta.env.VITE_API_URL}/api/notifications/${id}/read`,
            {},
            { withCredentials: true }
          );
          if (response.data.success === true) {
            set((state) => ({
              notifications: state.notifications.map((notify) =>
                notify.id === id ? { ...notify, is_read: true } : notify
              ),
              lastSync: new Date().toISOString(),
            }));
          }
        } catch (error) {
          console.error("Error marking notification as read:", error);
          set({ error: "Failed to mark notification as read" });
        }
      },
      markAllAsRead: async () => {
        try {
          const response = await axios.patch(
            `${import.meta.env.VITE_API_URL}/api/notifications/read-all`,
            {},
            { withCredentials: true }
          );
          if (response.data.success === true) {
            set((state) => ({
              notifications: state.notifications.map((notify) => ({
                ...notify,
                is_read: true,
              })),
              lastSync: new Date().toISOString(),
            }));
          }
        } catch (error) {
          console.error("Error marking all notifications as read:", error);
          set({ error: "Failed to mark all notifications as read" });
        }
      },
      getNotifications: async () => {
        try {
          set({ isLoading: true, error: null });
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/notifications`,
            { withCredentials: true }
          );
          if (response.data.success === true) {
            set({ 
              isLoading: false, 
              notifications: response.data.notifications,
              lastSync: new Date().toISOString(),
            });
          }
        } catch (err) {
          console.error("Error fetching notifications:", err);
          set({ 
            isLoading: false, 
            error: "Failed to fetch notifications" 
          });
        }
      },
      clearStore: () => {
        set({
          notifications: [],
          isLoading: false,
          error: null,
          lastSync: null,
        });
        // Clear from localStorage
        localStorage.removeItem("notification-store");
      },
      syncWithServer: async () => {
        const state = get();
        const lastSync = state.lastSync;
        
        // If no last sync or last sync was more than 5 minutes ago
        if (!lastSync || (new Date() - new Date(lastSync)) > 5 * 60 * 1000) {
          await get().getNotifications();
        }
      },
    }),
    {
      name: "notification-store",
      storage,
      partialize: (state) => ({
        notifications: state.notifications,
        lastSync: state.lastSync,
      }),
      onRehydrateStorage: () => (state) => {
        // Called after hydration is finished
        if (state) {
          state.syncWithServer();
        }
      },
    }
  )
);

socket.on("notification:new", (data) => {
  console.log("New notification received:", data);
  const { addNotification } = useNotificationStore.getState();
  addNotification(data);
});

storage.getItem = async (name) => {
  try {
    const value = localStorage.getItem(name);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error reading from storage:", error);
    return null;
  }
};

storage.setItem = async (name, value) => {
  try {
    localStorage.setItem(name, JSON.stringify(value));
  } catch (error) {
    console.error("Error writing to storage:", error);
  }
};

storage.removeItem = async (name) => {
  try {
    localStorage.removeItem(name);
  } catch (error) {
    console.error("Error removing from storage:", error);
  }
};