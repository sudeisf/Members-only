import { create } from "zustand"
import { persist } from "zustand/middleware"
import {fetchUserData} from "../services/userServices"

export const useUserStore = create(persist(
    (set) => ({
        user : null, 
        isLoading : false,
        erorr: null,
        getUserProfile: async () => {
            set({isLoading:true , erorr:null});
            try{
                const response  = await fetchUserData()
                if (response){
                    set({
                        isLoading : false,
                        user : response
                    })
                }
            }catch(error){
                set({ error: err.message, isLoading: false });
            }
        }
    }),
    {
        name : "user-store",
        partialize: (state) => ({ user: state.user }), 
    }
)
);
;