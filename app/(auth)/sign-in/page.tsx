// app/sign-in/page.tsx
'use client'
import { signIn } from "next-auth/react";
import React from "react";
import { FaGoogle } from "react-icons/fa";

const SignInPage = () => {
  const handleSignIn = () => {
    signIn("google",{
      callbackUrl: `${window.location.origin}/dashboard`,
    });
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <button
        onClick={ () => handleSignIn()}
        className="px-4 py-2 bg-blue-500 text-white rounded flex items-center gap-3"
      >
        <FaGoogle />
        Sign In with Google
      </button>
    </div>
  );
};

export default SignInPage;
