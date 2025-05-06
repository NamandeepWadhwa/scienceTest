"use client";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react"; // Import signOut from next-auth
import { useEffect } from "react";
import { useAtom } from "jotai";
import { tokenState } from "../../lib/stateManagement/tokenState";
import Link from "next/link";
import { useSocket } from "../sockeioContext";


export default function SideBarMd({messages}) {
  const socket=useSocket();
  const [token,setToken]=useAtom(tokenState);
  useEffect(()=>{
  setToken(localStorage.getItem('token'));
  },[])
  const router = useRouter();

  // Update handleSignOut to use signOut from NextAuth
  const handleSignOut = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("Name");
   socket.disconnect();
  
    await signOut({ callbackUrl: "/signin" }); // Redirect after sign out
  };



  return (
    <>
      <div className="hidden md:flex justify-between text-reguarlText m-5 text-lg">
        <ul className="flex space-x-8">
          <li>
            <Link href="/" className="hover:text-gray-600">
              Home
            </Link>
          </li>

          <li>
            <Link href="/blog" className="hover:text-gray-600">
              Blogs
            </Link>
          </li>
          {token && (
            <>
              {" "}
              <li>
                <Link href="/blog/myBlogs" className="hover:text-gray-600">
                  My Content
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-gray-600">
                  Profile
                </Link>
              </li>
              <li>
                <div className="flex flex-wrap">
                  <Link href="/chats" className="hover:text-gray-600">
                    Chats
                  </Link>
                  <Link
                    href="/chats"
                    className={
                      messages === 0
                        ? "hidden"
                        : "bg-red-600 border-red-600 text-white border-2 rounded-full w-6 h-6 flex items-center justify-center text-sm"
                    }
                  >
                    {messages}
                  </Link>
                </div>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="hidden md:block absolute right-0 m-5">
        {!token && (
          <button
            className="text-lg hover:text-gray-600 text-reguarlText"
            onClick={() => router.push("/signin")}
          >
            Sign In
          </button>
        )}
        {token && (
          <button
            className="text-lg hover:text-gray-600 text-reguarlText"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        )}
      </div>
    </>
  );
}
