"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { tokenState } from "../../lib/stateManagement/tokenState";
import Link from "next/link";
import { useSocket } from "../sockeioContext";
import { useUnreadMessage } from "../unreadMessagContext";


export default function SideBarMd() {
  const {unreadMessages, setUnredMessages} = useUnreadMessage();
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
    setToken(null); // Clear the token state
   if(socket)socket.disconnect();
   router.push("/signin");
 
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
          {localStorage.getItem("token") && (
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
                      unreadMessages === 0
                        ? "hidden"
                        : "bg-red-600 border-red-600 text-white border-2 rounded-full w-6 h-6 flex items-center justify-center text-sm"
                    }
                  >
                    {unreadMessages}
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
