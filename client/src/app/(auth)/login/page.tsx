"use client"
import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {z} from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormItem,
    FormMessage
} from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Roboto } from "next/font/google"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"
import { LoaderCircleIcon } from "lucide-react"
import { toast } from "sonner"

const formScehma = z.object({
    email: z.string().email("invalid Email address"),
    password : z.string().min(6,"Password must be at least 6 charachters")
})

export default function Login(){
    const router = useRouter();
    const isLoading = useAuthStore((state)=>state.isLoading);
    const error = useAuthStore((state)=>state.error);
    const success = useAuthStore((state)=>state.success);
    const isAuthenticated = useAuthStore((state)=>state.isAuthenticated)
    const loginFn = useAuthStore((state)=>state.loginFn);

    const form  = useForm<z.infer<typeof formScehma>>({
        resolver: zodResolver(formScehma),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    
    async function onSubmit(values: z.infer<typeof formScehma>){
        const result  = await loginFn(values.email,values.password);
        if(result){
            toast(success || "Login successful");
            router.push('/')
        }else{
            toast(error || "login failed")
        }
    }
        

   
    return (
        <div className="w-full max-w-[500px] mx-auto px-4 mt-10 md:mt-0 sm:px-6">
            <div className="flex flex-col justify-center text-center">
                <h1 className="font-roboto font-medium text-2xl">Wellcom back!</h1>
                <p className="font-roboto font-medium text-gray-500">We missed you please enter your details</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4 sm:p-8 items-center">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-md font-roboto font-bold-700">Email</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Enter your Email" className="py-6 text-lg font-roboto rounded-lg shadow-none"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} 
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-md font-roboto font-semibold font-bold-700">Password</FormLabel>
                                <FormControl>
                                    <Input {...field} type="password" placeholder="Enter your Password" className="py-6 font-roboto rounded-lg shadow-none"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} 
                    />
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div className="flex gap-2 items-center">
                            <Checkbox
                                defaultChecked
                                className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                            />
                            <p className="font-roboto font-medium text-gray-600">Remeber me</p>
                        </div>
                        <Link href={'/forget-password'} className="font-medium capitalize font-roboto text-blue-800"> 
                            forget password?
                        </Link>
                    </div>
                    
                    <Button disabled={isLoading} className="w-full py-6 rounded-md bg-blue-900 font-roboto font-medium text-md hover:bg-blue-900/90">
                        {isLoading ? <LoaderCircleIcon className="w-5 h-5 animate-spin" /> : "Sign In"}
                    </Button>
                    
                    <div className="flex flex-col">
                        <p className="text-center capitalize font-roboto font-medium text-gray-500">
                            Don't have an account?
                            <Link href={'/register'} className="text-center capitalize font-roboto font-medium text-blue-800 ml-1">
                                sign Up
                            </Link>
                        </p>
                    </div>
                </form>
            </Form>
        </div>
    )
}