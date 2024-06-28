import RegisterForm from "../components/molecules/RegisterForm"
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"
import backgroundImg from "../assets/form.jpg"; 

const Register = () => {
  return (
    <main className="flex flex-col h-screen justify-center items-center bg-cover" style={{ backgroundImage: `url(${backgroundImg})` }}>
    <h1 className="text-3xl text-white font-bold mb-10"><b>REGISTER PAGE</b></h1>
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
