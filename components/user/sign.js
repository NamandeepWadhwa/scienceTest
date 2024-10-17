'use client';
import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
export default function Sign(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if(email === "" || password === ""){
      alert("Please fill in the form");
      return;
    }
    console.log(email, password);
  } 
  console.log(process.env.NEXT_PUBLIC_CLIENT_ID);
  return (
    <>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-2xl font-bold mb-4">Sign In</div>
        <button onClick={()=>{ console.log("I am here");
          signIn("google",{redirect:false})
        }}>
          <div className="flex items-center hover:text-blue-600">
            <Image
              src="/images/googleLogo.png"
              width={40}
              height={40}
              alt="Google"
              className="mr-2"
            />
            <spna>Sign in with Google</spna>
          </div>
        </button>
        <div className="mb-2">OR</div>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email" onClick={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-2"
          />
          <input
            type="password"
            placeholder="Password" onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-2"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Sign In
          </button>
        </form>
        <div className="mt-2">
          <span > 
            Don't have a account? <Link href="/register" className="text-blue-600">Register</Link>
          </span>
        </div>
      </div>
    </>
  );
}