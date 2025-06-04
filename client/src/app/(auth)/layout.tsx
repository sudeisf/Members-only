import type { Metadata } from "next";
import Image from "next/image";
import {ArrowLeft, ArrowRight, } from "lucide-react"
import Link from "next/link";

export const metadata: Metadata = {
    title: "Authentication",
    description: "auth pages",
  };


  export default function AuthLayout({
    children,
  } : Readonly < {
    children : React.ReactNode
  }>) {
        return (
            <div className="min-h-dvh flex flex-col dark:bg-gray-900">
                <div className="w-full flex justify-between px-4 py-2">
                    <div className=" flex items-center gap-4">
                    <Link href={'/'}  className="border-1 border-gray-300 dark:border-gray-700 shadow-xs rounded-md p-2 w-fit hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                        <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-300 stroke-1" />
                    </Link>
                    <p className="font-roboto font-medium text-gray-600 dark:text-gray-300">Home page</p>
                    </div>
                    <div className="flex items-center justify-center gap-2 px-2">
                        <Image src={'/lock.svg'} alt={"lock icon"} width={20} height={20} className="dark:invert" /> 
                        <p className="md:text-md text-lg font-medium font-roboto text-gray-700 dark:text-gray-200 capitalize">members only</p>
                    </div>
                </div>
                <div className="w-full px-3 sm:px-5 max-w-[1250px] mx-auto flex-grow">
                    <main className="w-full">
                        {children}
                    </main>
                </div>
                <footer className="py-3 sm:py-4 w-full border-gray-200 dark:border-gray-700">
                    <div className="border-t w-fit mt-2 py-2 mx-auto">
                        <p className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} Members Only. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        )
  }