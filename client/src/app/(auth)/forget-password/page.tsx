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
import {ChevronLeftIcon} from "lucide-react"

const formScehma = z.object({
    email: z.string().email("invalid Email address"),
})




export default function ForgotPassword(){
    function onSubmit(values: z.infer<typeof formScehma>){
        console.log(values);
    }

    const form  = useForm<z.infer<typeof formScehma>>({
        resolver: zodResolver(formScehma),
        defaultValues: {
            email: ""
        }
    });


    return (
           <div className="w-full max-w-[500px] mx-auto mt-10 md:md-0 px-4 sm:px-6">
             <div className="flex flex-col justify-center text-center">
                <h1 className="font-roboto font-medium text-2xl">Forgot Password</h1>
                <p className="font-roboto font-medium text-gray-500">Enter your email to reset your password</p>
            </div>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4 sm:p-8 items-center">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-md font-roboto font-medium">Email</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Enter your Email" className="py-6 text-lg font-roboto rounded-lg shadow-none"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} 
                    />
                    <Button className="w-full py-6 rounded-md bg-blue-900 font-roboto font-medium text-md hover:bg-blue-900/90">
                        Reset
                    </Button>
                    <div className="w-full">
                            <Link href={'/login'} className="text-center capitalize font-roboto flex gap-4 w-full items-center mx-auto font-medium text-blue-800 ml-1">
                                <ChevronLeftIcon className="w-5 h-5" /> Remembered password
                            </Link>
                    </div>
                    </form>
                    
                </Form>
           </div>
    )
}
