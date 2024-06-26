import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { FormField, FormItem, FormLabel, FormControl,FormMessage,Form } from "../ui/form"
import { Input } from "../ui/input"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
 
const formSchema = z.object({
  email: z.string().email({
    message:"please enter valid email"
  }),
  password: z.string(),
})

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

 async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("user login successfull")
  }

  const [visibility,setVisibility] = useState("password")
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email:</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password:</FormLabel>
              <FormControl>
              <div className="flex items-center">
            <Input placeholder="" {...field} type={visibility} className="mr-2"/>
            <Button onClick={() => setVisibility(visibility === "password" ? "text" : "password")}>
              {visibility === "password" ? <Eye /> : <EyeOff />}
            </Button>
          </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Login</Button>
      </form>
    </Form>
  )
}

export default LoginForm
