"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";
import { LoaderCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const logoutFn = useAuthStore((state)=> state.logout);
  const isLoading =  useAuthStore((state)=> state.isLoading);
  const router = useRouter()
  return (
    <div className="max-w-[1200px] m-auto">
      <h1>90</h1>
      <Button onClick={
          () => {
            logoutFn()
            router.push('/login')
          }
      }>{isLoading ? <LoaderCircleIcon className="w-4 h-4 animate-spin" /> : "Logout"}</Button>
    </div>
  );
}
