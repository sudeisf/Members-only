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

const formScehma = z.object({
    email: z.string().email("invalid Email address"),
    firstname : z.string().min(2, "firstname must be at least 2 charachters"),
    lastname : z.string().min(2, "lastname must be at least 2 charachters"),
    password : z.string().min(6,"Password must be at least 6 charachters"),
    confirmPassword : z.string().min(6,"Password must be at least 6 charachters"),
}).refine((data)=> {
    if (data.password !== data.confirmPassword){
        return false;
    }
    return true   
},{
    message: "Passwords do not match",
    path: ["confirmPassword"]
})

export default function Register(){
    function onSubmit(values: z.infer<typeof formScehma>){
        console.log(values);
    }

    const form  = useForm<z.infer<typeof formScehma>>({
        resolver: zodResolver(formScehma),
        defaultValues: {
            email: "",
            firstname: "",
            lastname : "",
            password: "",
            confirmPassword : ""
            
        }
    });

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
                        name="firstname"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-md font-roboto font-medium capitalize">first name</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Enter your first name" className="py-6 text-lg font-roboto rounded-lg shadow-none"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} 
                    />
                     <FormField
                        control={form.control}
                        name="lastname"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-md font-roboto font-medium capitalize">last name</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Enter your last name" className="py-6 text-lg font-roboto rounded-lg shadow-none"/>
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
                                <FormLabel className="text-md font-roboto  font-medium">Password</FormLabel>
                                <FormControl>
                                    <Input {...field} type="password" placeholder="Enter your Password" className="py-6 font-roboto rounded-lg shadow-none"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} 
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-md font-roboto font-medium">Confirm password</FormLabel>
                                <FormControl>
                                    <Input {...field} type="password" placeholder="Enter your Password" className="py-6 font-roboto rounded-lg shadow-none"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} 
                    />
                    
                    
                    <Button className="w-full py-6 rounded-md bg-blue-900 font-roboto font-medium text-md hover:bg-blue-900/90">
                        Sign Up
                    </Button>
                    
                    <div className="flex flex-col">
                        <p className="text-center capitalize font-roboto font-medium text-gray-500">
                            Already have an account?
                            <Link href={'/login'} className="text-center capitalize font-roboto font-medium text-blue-800 ml-1">
                                sign In
                            </Link>
                        </p>
                    </div>
                </form>
            </Form>
        </div>
    )
}