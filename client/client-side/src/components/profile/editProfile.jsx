import { UserPen } from "lucide-react";
import {useUserStore}  from "../../store/userStore"
import { useEffect , useState } from "react";
import { LoaderCircle } from "lucide-react";
import { UpdateProfile } from "../../services/userServices";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

const profileSchema = z
  .object({
    firstname: z.string().min(2).max(30).optional(),
    lastname: z.string().min(2).max(30).optional(),
    newPassword: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.newPassword && data.newPassword.length < 6) {
        return false;
      }
      return true;
    },
    {
      message: "New password must be at least 6 characters",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword || data.confirmPassword) {
        return data.newPassword === data.confirmPassword;
      }
      return true;
    },
    {
      message: "Passwords must match",
      path: ["confirmPassword"],
    }
  );

export default function EditProfile() {

    const isLoading = useUserStore((state) => state.isLoading);
    const user = useUserStore((state)=> state.user);
    const error = useUserStore((state)=> state.error);
    const getUserProfile = useUserStore((state) => state.getUserProfile);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [message, setMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: {
          firstname: user?.firstname || "",
          lastname: user?.lastname || "",
          newPassword: "",
          confirmPassword: "",
        },
      });

      useEffect(() => {
        if (!user) getUserProfile();
        if (user) {
          reset({
            firstname: user.firstname,
            lastname: user.lastname,
            newPassword: "",
            confirmPassword: "",
          });
        }
      }, [getUserProfile, user, reset]);


      const onSubmit = async (values) => {
        try {
          setSubmitLoading(true);
          const { firstname, lastname, newPassword, confirmPassword } = values;
    
         
          const payload = {};
          if (firstname !== user.firstname) payload.firstname = firstname;
          if (lastname !== user.lastname) payload.lastname = lastname;
          if (newPassword && confirmPassword) {
            payload.newPassword = newPassword;
            payload.confirmPassword = confirmPassword;
          }
    
          if (Object.keys(payload).length === 0) {
            setMessage("No changes made.");
            return;
          }
    
          const res = await UpdateProfile(payload);
    
          toast.success("Profile updated successfully.");
          getUserProfile(); 
        } catch (err) {
          console.error(err);
          toast.error("Failed to update profile.");
        } finally {
          setSubmitLoading(false);
        }
      };

      const handleDiscard = () => {
        if (user) {
          reset({
            firstname: user.firstname || "",
            lastname: user.lastname || "",
            newPassword: "",
            confirmPassword: "",
          });
          toast.success("Changes discarded.");
        }
      };

      if (isLoading) {
        return (
          <div className="flex items-center justify-center h-screen">
            <LoaderCircle className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        );
      }
    if (error) return <div>Error: {error}</div>;
    if (!user) return <div>No user data available</div>;
    

    return (
        <div className="w-[90%] md:w-[70%] mx-auto mt-5 bg-[#F9FAFB] dark:bg-dark-background p-4">
            <h1 className="font-new-amsterdam text-black dark:text-white text-xl flex gap-3 p-4 border-b-2 border-black dark:border-white items-center">
                <UserPen size={30} className="dark:text-white" /> Account preference
            </h1>
            <div className="flex flex-col md:flex-row gap-4 mt-8 items-center md:items-start">
                <div className="flex justify-center items-center w-28 h-28 bg-black dark:bg-white text-white dark:text-black rounded-full border-2 border-black dark:border-white">
                    <h1 className="text-3xl">S</h1>
                </div>
                <div className="text-center md:text-left">
                    <h1 className="text-2xl font-Rubik text-black dark:text-white">{user.firstname} {user.lastname}</h1>
                    <p className="text-xl font-Rubik text-gray-400 dark:text-gray-400">
                        {user.email}
                    </p>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-4 p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <div className="flex flex-col gap-3 mt-2">
                                <label className="text-black dark:text-white font-semibold" htmlFor="firstname">First name</label>
                                <input {...register("firstname")} className="bg-white dark:bg-dark-background text-black dark:text-white p-2 w-full rounded-md border-2 dark:border-gray-600" placeholder="firstname" type="text" name="firstname" id="firstname" />
                                {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname.message}</p>}
                            </div>
                            <div className="flex flex-col gap-3 mt-2">
                                <label className="text-black dark:text-white font-semibold" htmlFor="lastname">Last name</label>
                                <input {...register("lastname")} className="bg-white dark:bg-dark-background text-black dark:text-white p-2 w-full rounded-md border-2 dark:border-gray-600" placeholder="lastname" type="text" name="lastname" id="lastname" />
                                {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname.message}</p>}
                            </div>
                            <div className="flex flex-col gap-3 mt-2">
                                <label className="text-black dark:text-white font-semibold" htmlFor="email">Email</label>
                                <input disabled  defaultValue={user.email} className="bg-white dark:bg-dark-background text-black dark:text-white p-2 w-full rounded-md border-2 dark:border-gray-600" placeholder="email" type="email" name="email" id="email" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-col gap-3 mt-2">
                                <label className="text-black dark:text-white font-semibold" htmlFor="password">Password</label>
                                <input {...register("newPassword")}  className="bg-white dark:bg-dark-background text-black dark:text-white p-2 w-full rounded-md border-2 dark:border-gray-600" placeholder="••••••••" type="password" name="password" id="password" />
                                {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}
                            </div>
                            <div className="flex flex-col gap-3 mt-2">
                                <label className="text-black dark:text-white font-semibold" htmlFor="confirm-password">Confirm Password</label>
                                <input  {...register("confirmPassword")} className="bg-white dark:bg-dark-background text-black dark:text-white p-2 w-full rounded-md border-2 dark:border-gray-600" placeholder="••••••••" type="password" name="confirm-password" id="confirm-password" />
                                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 p-4">
                    <button disabled={submitLoading} className="bg-black dark:bg-white text-white text-center dark:text-black rounded-md p-2 w-full md:w-20">{submitLoading ?  <LoaderCircle className="w-4 h-4 animate-spin text-white mx-auto  " /> : "Update"}</button>
                    <button onClick={handleDiscard} className="bg-white dark:bg-dark-background text-black dark:text-white rounded-md p-2 border-2 border-black dark:border-white w-full md:w-20">Discard</button>
                </div>
                {message && <p className="text-center mt-2 text-sm text-blue-600">{message}</p>}
            </form>
        </div>
    );
}
