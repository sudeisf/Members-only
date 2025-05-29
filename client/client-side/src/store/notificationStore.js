import { create } from "zustand";
import { persist } from "zustand/middleware";
import{io} from "socket.io-client"
import axios from "axios";


socket.current = io(import.meta.env.VITE_API_URL, { withCredentials: true });


export const useNotificationStore  = create(persist(
    (set) => ({
        notifications : [],
        isLoading : false,
        addNotification: (notification) =>
            set((state) => ({
              notifications: [notification, ...state.notifications],
            })),
        clearNotifications: () => set({ notifications: [] }),
        markasRead : async (id) =>{
            try{
                const response = await axios.patch(`${import.meta.env.VITE_API_URL}/notifications/${id}/read`,
                    {
                        withCredentials : true
                    }
                );
                if(response.data.success == true){
                    set({
                        notifications : state.notifications.map((notify)=>{
                            notify.id === id ? {...notify, is_read : true} : notify
                        })
                    })
                }
            }
            catch(error) {
                console.error('Error marking notification as read:', error);
        }},
        markAllAsRead : async () => {
            try{
                const response = await axios.patch(`${import.meta.env.VITE_API_URL}/notifications/read-all`,
                    {
                        withCredentials : true
                    }
                );
                if(response.data.success == true){
                    set({
                        notifications : state.notifications.map((notify)=>({
                            ...notify, is_read: true
                        }))
                    })
                }
            }
            catch(error) {
                console.error('Error marking notification as read all:', error);
        }} ,
        getNotifications : async () => {
            try{
              set({isLoading:true})
              const response  = await axios.get(`${import.meta.env.VITE_API_URL}/notifications`,
                {
                    withCredentials : true
                });
                if(response.data.success == true){
                    set({isLoading : false , notifications :  response.data.notifications})
                }
            }catch(error){
                console.error("Error fetching notifications:", error);
                set({ isLoading: false });
            }
        }
        
    }),
    {
        name: "notification-store",
    }
))

socket.on("notification:new", (data) => {
    const { addNotification } = useNotificationStore.getState();
    addNotification(data);
  });