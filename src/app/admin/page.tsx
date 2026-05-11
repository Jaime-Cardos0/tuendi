import { Login } from "@/components/UI/Login";
import { LoginProvider } from "@/contexts/LoginContext";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Baza | Admin Login" }

export default function LoginPage(){
    return(
      
      <LoginProvider>
        <Login />
      </LoginProvider>  
    );
}