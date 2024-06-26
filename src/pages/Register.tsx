import RegisterForm from "../components/molecules/RegisterForm"
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"


const Register = () => {
  return (
    <main className="flex flex-col h-screen justify-center items-center">
    <h1 className="text-2xl mb-10"><b>REGISTER PAGE</b></h1>
    <Card className="w-1/3">
      <CardHeader>
        <CardTitle>
          Hello User
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RegisterForm></RegisterForm>
      </CardContent>
    </Card>
  </main>
  )
}

export default Register
