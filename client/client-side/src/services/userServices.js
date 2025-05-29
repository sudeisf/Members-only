import axios from "axios"
const API_URL = import.meta.env.VITE_API_URL;

export async function fetchUserData() {
        try{
            const res = await axios.get(`${API_URL}/api/user`,
                {
                    withCredentials : true
                }
            )
            if (!res.data){
                throw Error("Failed to fetch profile");
            }
            return  res.data.user;
        }catch(e){
            console.error("User fetch error:", error.message);
            throw error;
        }
}

export async function UpdateProfile(payload) {
    try{
        const res = await axios.patch(`${API_URL}/api/update`,
            {
                firstname : payload.firstname,
                lastname : payload.lastname,
                newPassword : payload.newPassword,
                confirmPassword : payload.confirmPassword
            },
            {
                withCredentials : true
            }
        );
        if (!res.data){
            throw Error("Failed to fetch profile");
        }
        return  res.data;
    }catch(error){
        console.error("update  error:", error.message);
        throw error;
    }
}