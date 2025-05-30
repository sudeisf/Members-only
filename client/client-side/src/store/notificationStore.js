import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import socket from "../services/sharedSocket"; // Use shared socket

export const useNotificationStore = create(
  persist(
    (set, get) => ({
      notifications: [],
      isLoading: false,
      addNotification: (notification) =>
        set((state) => ({
          notifications: [notification, ...state.notifications],
        })),
      getNotificationCount: () => {
        return get().notifications.filter((n) => !n.is_read).length;
      },
      clearNotifications: () => set({ notifications: [] }),
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
            }));
          }
        } catch (error) {
          console.error("Error marking notification as read:", error);
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
            }));
          }
        } catch (error) {
          console.error("Error marking all notifications as read:", error);
        }
      },
      getNotifications: async () => {
        try {
          console.log("Fetching notifications");
          set({ isLoading: true });
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/notifications`, {
            withCredentials: true,
          });
          if (response.data.success === true) {
            set({ isLoading: false, notifications: response.data.notifications });
          }
        } catch (err) {
          console.error("Error fetching notifications:", err);
          set({ isLoading: false });
        }
      },
    }),
    { name: "notification-store" }
  )
);

socket.on("notification:new", (data) => {
  console.log("New notification received:", data);
  const { addNotification } = useNotificationStore.getState();
  addNotification(data);
});