import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { FormField, FormItem, FormLabel, FormControl,FormMessage,Form } from "../ui/form"
import { Input } from "../ui/input"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../lib/firebase"
import { useNavigate } from "react-router-dom"
 
const formSchema = z.object({
  email: z.string().email({
    message:"please enter valid email"
  }),
  password: z.string(),
})

const LoginForm = () => {
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

 async function onSubmit(values: z.infer<typeof formSchema>) {
     await signInWithEmailAndPassword(auth,values.email,values.password)  .then((userCredential) => {
      const user = userCredential.user;
      console.log(user)
      navigate('/')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode,errorMessage)
      alert("your email or password wrong try again!!")
      location.reload()
    });
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
