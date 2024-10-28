"use client"; // Ensure this is a client component
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import getUser from "../../lib/user/getUser";
import { signIn, useSession } from "next-auth/react";

export default function Sign() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data: session } = useSession(); // Move useSession here

  useEffect(() => {
    if (session?.user?.token) {
      localStorage.setItem("token", session.user.token);
      alert("You are now logged in");
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);

    if (email === "" || password === "") {
      alert("Please fill in the form");
      return;
    }
    const data = await getUser(email, password);
    if (data) {
      alert("You are now logged in");
      localStorage.setItem("token", data.token);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-2xl font-bold mb-4">Sign In</div>

      {/* Sign in with Google Button */}
      <button onClick={() => signIn("google", { callbackUrl: "/" })}>
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
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-2"
        />
        <input
          type="password"
          placeholder="Password"
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
