import { Link } from "react-router-dom"
import LoginForm from "../components/molecules/LoginForm"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/card"


const Login = () => {
  return (
    <main className="flex flex-col h-screen justify-center items-center">
    <h1 className="text-2xl mb-10"><b>LOGIN PAGE</b></h1>
    <Card className="w-1/3">
      <CardHeader>
        <CardTitle>
          Hello User
        </CardTitle>
      </CardHeader>
      <CardContent>
        <LoginForm></LoginForm>
      </CardContent>
      <CardFooter>
        <Link to={"/register"}><u>New here? create account</u></Link>
      </CardFooter>
    </Card>
  </main>
  )
}

export default Login
