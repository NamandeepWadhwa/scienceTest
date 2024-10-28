'use client';
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { userEmail,userPassword } from "../../lib/user/userState";
import { useAtom } from "jotai";
import sendOtp from'../../lib/otp/sendOtp'
export default function SignUp() {
  const router=useRouter();
  const [email,setEmail]=useAtom(userEmail)
 const [password,setPassword]=useAtom(userPassword);
  const [password2, setPassword2] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(email === "" || password === "" || password2 === ""){
      alert("Please fill in the form");
      return;
    }
    if(password !== password2){
      alert("Passwords do not match");
      return;
    }
    await sendOtp(email);

  router.push(`/otp`)
  


    
  }
  return <>
  <div className="flex flex-col justify-center items-center h-screen">
    <div className="font-bold text-2xl mb-2"> Register

    </div>
    <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
     
      <input
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-300 p-2"
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="border border-gray-300 p-2"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        onChange={(e) => setPassword2(e.target.value)}
        className="border border-gray-300 p-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Register
      </button>
 

    </form>
    <div className="mt-2">
   <span> Already have an account? <Link href="/sign" className="text-blue-600">Sign In</Link></span>
    </div>

  </div>
</>;

}