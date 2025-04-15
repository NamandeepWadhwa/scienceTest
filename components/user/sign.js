"use client"; // Ensure this is a client component
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import getUser from "../../lib/user/getUser";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import getTestUser from "../../lib/user/getTestUser";
import { useAtom } from "jotai";
import { tokenState } from "../../lib/stateManagement/tokenState";

export default function Sign() {

  const [token, setToken] = useAtom(tokenState);
  const router=useRouter();
  const [email, setEmail] = useState("testUser@xyz.com");
  const [password, setPassword] = useState("TestPassword@123");
  const { data: session } = useSession(); // Move useSession here

  useEffect(() => {
    if(token)router.push("/profile");
     if (session?.user?.token  &&(session.user.token !== localStorage.getItem("token"))) 
    { 
        setToken(session.user.token);
       localStorage.setItem("token", session.user.token);
       router.push("/profile");
     }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (email === "estUser@xyz.com" || password === "TestPassword@123")
      {
     const data = await getTestUser(email, password);
 
      if (data) {
        alert("You are now logged in");
        localStorage.setItem("token", data.token);
        setToken(data.token);
         router.push("/profile");
      }
      else{
        alert("Error occured");
      }
      
     
      
    }
    else{
    const data = await getUser(email, password);
    if (data) {
      alert("You are now logged in");
      setToken(data.token);
      localStorage.setItem("token", data.token);
      router.push("/profile");
    }
  }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-2xl font-bold mb-4">Sign In</div>

      {/* Sign in with Google Button */}
      <button
        onClick={() => {
          console.log("Signing in with callbackUrl /profile");
          signIn("google", { callbackUrl: "/profile" });
        }}
      >
        <div className="flex items-center hover:text-blue-600">
          <Image
            src="/images/googleLogo.png"
            width={40}
            height={40}
            alt="Google"
            className="mr-2"
          />
          <span>Sign in with Google</span>
        </div>
      </button>

      <div className="mb-2">OR</div>

      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 p-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Sign In
        </button>
      </form>

      <div className="mt-2">
        <span>
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600">
            Register
          </Link>
        </span>
      </div>
    </div>
  );
}
