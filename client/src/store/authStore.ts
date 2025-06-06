import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AxiosError } from 'axios';
import {
    login,
    register,
    logout,
    refresh,
    SendOtp,
    verifyOtp,
    newPassword
} from "@/api/auhtAPi"

type User = {
    id : string,
    email : string,
    firstname : string,
    lastname : string,
}
const handleApiError = (error: unknown): string => {
    if (error instanceof AxiosError) {
        return error.response?.data?.error || error.message;
    }
    return 'An unexpected error occurred';
}

interface AuthState {
    user : User | null ,
    tempEmail : string | null,
    isAuthenticated : boolean,
    success: string | null;
    isLoading : boolean,
    error : string | null,
    accessToken : string | null ,
    loginFn :  (email: string , password: string) => Promise<void|boolean>,
    registerFn : (email: string, firstname : string , lastname: string , password:string , confirmPassword :string) => Promise<void|boolean>,
    refreshTokenFn : () => Promise<void|boolean>,
    logout : () => Promise<void|boolean>,
    SendOtpFn : (email:string) => Promise<void|boolean>,
    verifyOtpFn : (otp:string) => Promise<void|boolean>,
    newPasswordFn : (password: string , confirmPassword: string) => Promise<void|boolean>


}
export const useAuthStore = create<AuthState>()(persist(
    (set,get) => ({
        user : null,
        isAuthenticated : false,
        isLoading : false,
        success: null,
        error : null,
        tempEmail : null,
        accessToken : null,
        loginFn : async (email , password) => {
             try{
                set({isLoading : true, error : null , success: null});
                const response  =  await login({ email, password });
                if(response.status == 200){
                    set({
                        isLoading:false,
                        isAuthenticated:true,
                        error : null,
                        accessToken : response.data.accessToken,
                        user : response.data.user,
                        success : "login succesful"
                    })
                }
                return true
             }catch(err: any){
                console.error(err)
                set({isLoading:false , error: handleApiError(err)})
                return false
             }
        },
        registerFn : async (email, firstname , lastname, password , confirmPassword ) =>{
            try{
                set({isLoading : true, error : null , success: null});
               
                const response  =  await register({
                    email : email,
                    password : password,
                    confirmPassword : confirmPassword,
                    firstname : firstname,
                    lastname : lastname
                    }
                );

                if(response.status == 201){
                    set({
                        isLoading:false,
                        isAuthenticated:true,
                        error : null,
                        accessToken : response.data.accessToken,
                        user : response.data.user,
                        success : "you have been registerd successfuly"
                    })
                }
                return true
             }catch(err: any){
                console.error(err)
                set({isLoading:false , error: handleApiError(err)})
                return false
             }
        },
        refreshTokenFn : async () =>{
            try{
                set({isLoading : true, error : null});
           
                const response  = await refresh();
                if(response.status == 200){
                    set({
                        isLoading:false,
                        isAuthenticated:true,
                        error : null,
                        accessToken : response.data.accessToken,
                        user: response.data.user
                    })
                }
             }catch(err: any){
                console.error(err)
                set({isLoading:false , error: handleApiError(err)})
             } 
        },
        logout : async () => {
            try{
                set({isLoading : true, error : null , success: null});
         
                const response  = await logout();
                if(response.status == 200){
                    set({
                        isLoading:false,
                        isAuthenticated:false,
                        error : null,
                        accessToken : null,
                        user: null,
                        success : "Log out successful"
                    })
                }
             }catch(err: any){
                console.error(err)
                set({isLoading:false , error: handleApiError(err)})
             } 
        },
        SendOtpFn : async (email) => {
            try{
                set({isLoading : true, error : null});
               
                const response  = await SendOtp({ email : email});
                if(response.status == 200){
                    set({
                        isLoading: false,
                        error : null,
                        tempEmail : email,
                        success: "OTP code have been sent succefully to your email"
                    })
                }
                return true
             }catch(err: any){
                console.error(err)
                set({isLoading:false , error: handleApiError(err)})
                return false
             } 
        },
        verifyOtpFn : async (otp) => {
            const email = get().tempEmail;
            try{
                set({isLoading : true, error : null});
          
                const response  = await verifyOtp({email: email , otp : otp});
                if(response.status == 200){
                    set({
                        isLoading: false,
                        error : null,
                        success: "OTP have been varified"
                    })
                }
                return true
             }catch(err: any){
                console.error(err)
                set({isLoading:false , error: handleApiError(err)})
                return false
             }
        },
        newPasswordFn : async (password, confirmPassword) => {
            const email = get().tempEmail;
            try{
                set({ isLoading: true, error: null, success: null });
                if (!email) {
                    throw new Error('No email stored for password reset');
                }
       
                const response  = await newPassword({
                    email : email,
                    password: password,
                    confirmPassword: confirmPassword
                });
                if(response.status == 200){
                    set({
                        isLoading: false,
                        error : null,
                        tempEmail : null,
                        success: "new password set sucessfully"
                    })
                }
                return true
             }catch(err: any){
                console.error(err)
                set({isLoading:false , error: handleApiError(err)})
                return false
             }  
        },
    }),
    {
        name : 'Auth-Store',
        partialize: (state) => ({
            accessToken: state.accessToken,
            user: state.user,
            isAuthenticated: state.isAuthenticated,
            tempEmail: state.tempEmail,
        })
    }
));