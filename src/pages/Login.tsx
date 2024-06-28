import { Link } from "react-router-dom";
import LoginForm from "../components/molecules/LoginForm";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/card";
import backgroundImg from "../assets/form.jpg"; 

const Login = () => {
  return (
    <main className="flex flex-col h-screen justify-center items-center bg-cover" style={{ backgroundImage: `url(${backgroundImg})` }}>
      <div className="relative w-full h-full z-10 flex flex-col items-center justify-center">
        <h1 className="text-3xl text-white font-bold mb-10">LOGIN PAGE</h1>
        <Card className="w-1/3">
          <CardHeader>
            <CardTitle>
              Hello User
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
          <CardFooter>
            <Link to="/register" className="text-blue-500 hover:underline">New here? Create account</Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
};

export default Login;
