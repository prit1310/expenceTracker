import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
   async function logout() {
      signOut(auth)
        .then(() => {
          console.log("User signed out...");
          navigate('/login');
        })
        .catch((error) => {
          console.log("Error occurred...", error);
        });
    }
    
    logout();
  }, [navigate]);

  return (
    <>
    </>
  );
};

export default Logout;
