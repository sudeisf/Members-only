import { UserPen } from "lucide-react";

export default function EditProfile() {
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
                    <h1 className="text-2xl font-Rubik text-black dark:text-white">Sudeis Fedlu</h1>
                    <p className="text-xl font-Rubik text-gray-500 dark:text-gray-400">
                        Tech enthusiast & <br /> Developer
                    </p>
                </div>
            </div>
            <form action="">
                <div className="mt-4 p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <div className="flex flex-col gap-3 mt-2">
                                <label className="text-black dark:text-white font-semibold" htmlFor="firstname">First name</label>
                                <input className="bg-white dark:bg-dark-background text-black dark:text-white p-2 w-full rounded-md border-2 dark:border-gray-600" placeholder="Sudeis" type="text" name="firstname" id="firstname" />
                            </div>
                            <div className="flex flex-col gap-3 mt-2">
                                <label className="text-black dark:text-white font-semibold" htmlFor="lastname">Last name</label>
                                <input className="bg-white dark:bg-dark-background text-black dark:text-white p-2 w-full rounded-md border-2 dark:border-gray-600" placeholder="Fedlu" type="text" name="lastname" id="lastname" />
                            </div>
                            <div className="flex flex-col gap-3 mt-2">
                                <label className="text-black dark:text-white font-semibold" htmlFor="email">Email</label>
                                <input className="bg-white dark:bg-dark-background text-black dark:text-white p-2 w-full rounded-md border-2 dark:border-gray-600" placeholder="sudeis@gmail.com" type="email" name="email" id="email" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-col gap-3 mt-2">
                                <label className="text-black dark:text-white font-semibold" htmlFor="password">Password</label>
                                <input className="bg-white dark:bg-dark-background text-black dark:text-white p-2 w-full rounded-md border-2 dark:border-gray-600" placeholder="••••••••" type="password" name="password" id="password" />
                            </div>
                            <div className="flex flex-col gap-3 mt-2">
                                <label className="text-black dark:text-white font-semibold" htmlFor="confirm-password">Confirm Password</label>
                                <input className="bg-white dark:bg-dark-background text-black dark:text-white p-2 w-full rounded-md border-2 dark:border-gray-600" placeholder="••••••••" type="password" name="confirm-password" id="confirm-password" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 p-4">
                    <button className="bg-black dark:bg-white text-white dark:text-black rounded-md p-2 w-full md:w-20">Update</button>
                    <button className="bg-white dark:bg-dark-background text-black dark:text-white rounded-md p-2 border-2 border-black dark:border-white w-full md:w-20">Discard</button>
                </div>
            </form>
        </div>
    );
}
