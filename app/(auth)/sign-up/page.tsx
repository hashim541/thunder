// app/sign-up/page.tsx
'use client'
import { useRouter } from "next/navigation";
import React from "react";

const SignUpPage = () => {
  const router = useRouter();

  const handleSignUp = () => {
    router.push("/sign-in");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>
        <p className="mb-4">To sign up, please use the sign-in page.</p>
        <button
          onClick={handleSignUp}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Go to Sign-In
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
