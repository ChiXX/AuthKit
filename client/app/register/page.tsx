import React from "react";
import RegisterForm from "../components/auth/RegisterForm/RegisterForm";

export default function page(){
    return <div className="auth-page w-full h-full flex justify-center items-center">
        <RegisterForm />
    </div>
}