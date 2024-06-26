import LoginForm from "../components/molecules/LoginForm"
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"


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
    </Card>
  </main>
  )
}

export default Login
