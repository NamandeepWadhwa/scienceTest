"use client";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react"; // Import signOut from next-auth
import { useEffect } from "react";
import { useAtom } from "jotai";
import { tokenState } from "../../lib/stateManagement/tokenState";
import Link from "next/link";

export default function SideBarMd() {
  const [token,setToken]=useAtom(tokenState);
  useEffect(()=>{
  setToken(localStorage.getItem('token'));
  },[])
  const router = useRouter();

  // Update handleSignOut to use signOut from NextAuth
  const handleSignOut = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("Name");
  
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
                <Link href="/chats" className="hover:text-gray-600">
                  Chats
                </Link>
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
