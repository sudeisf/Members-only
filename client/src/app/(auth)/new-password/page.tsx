"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { LoaderCircle } from "lucide-react"

const formSchema = z.object({
    password:  z.string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be less than 32 characters"),
    confirmPassword: z.string()
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password must be less than 32 characters")
  }).refine((data)=> data.password === data.confirmPassword ,{
    message: "Passwords don't match",
    path: ["confirmPassword"] 
  });

export default function NewPasswordPage() {
  
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver : zodResolver(formSchema),
    defaultValues : {
        password : "",
        confirmPassword: ""
    },
    mode: "onBlur"
  })

   async function onSubmit(values: z.infer<typeof formSchema>) {
    
  }



  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-md mx-auto p-2 md:p-10 font-inter">
        <div className="flex flex-col space-y-2.5 mb-10 md:mt-0 mt-10">
            <h1 className="font-medium font-roboto text-[#3A3D44] text-2xl text-center">Create new Password</h1>
            <p className="text-gray-500 text-center">Create your password if you forgot it , then you have to do forget password again</p>
        </div>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel className="text-md font-roboto font-medium">Password</FormLabel>
              <FormControl>
                <Input
                type="password"
                 className="py-6 text-lg font-roboto rounded-lg shadow-none"
                 placeholder="Enter your new password"   {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel className="text-md font-roboto font-medium">Confirm password</FormLabel>
              <FormControl>
                <Input
                 className="py-6 text-lg font-roboto rounded-lg shadow-none"
                 type="password"
                 placeholder=" Enter your conferming password"  
                 {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full py-6 rounded-md bg-blue-900 font-roboto font-medium text-md hover:bg-blue-900/90"
         type="submit"
        
         >
         Confirm
        </Button>
      </form>
    </Form>
  )
}




