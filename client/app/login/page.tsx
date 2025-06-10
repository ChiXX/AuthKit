import React from "react";
import LoginForm from "../components/auth/LoginForm/LoginForm";

export default function page(){
    return <div className="auth-page w-full h-full flex justify-center items-center">
        <LoginForm />
    </div>
}