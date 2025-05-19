'use client';
import Image from "next/image";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import Link from "next/link";
import { tokenState } from "../../lib/stateManagement/tokenState";
import { useSocket } from "../sockeioContext";
import { useUnreadMessage } from "../unreadMessagContext";


export default function SideBar() {
  const {unreadMessages, setUnredMessages} = useUnreadMessage();
  const socket=useSocket();
  const router=useRouter();
    const [token,setToken]=useAtom(tokenState);
    useEffect(()=>{
    setToken(localStorage.getItem('token'));
    },[])
    const handleSignOut = async () => {
      localStorage.removeItem("token");
      localStorage.removeItem("Name");
      setToken(null); // Clear the token state
     
      if(socket)socket.disconnect();
      router.push("/signin");

     
      setOpen(false); // Redirect after sign out
    };



  const [open, setOpen] = useState(false);


  return (
    <>
      <div className="flex flex-col absolute right-0 w-1/2">
        <div className="md:hidden absolute right-0 mt-5 mx-5 z-20">
          <button
            onClick={(e) => {
              e.preventDefault();
              setOpen(!open);
            }}
          >
            <Image
              src="/images/hamburger.png"
              width={30}
              height={30}
              alt="Menu"
            />
          </button>
        </div>
        <div
          className={`md:hidden bg-navbar h-screen w-2/3 absolute right-0 z-10 text-lg justify-center items-center text-reguarlText ${
            open ? "flex flex-col" : "hidden"
          } `}
        >
          <ul
            className="space-y-5"
            onClick={(e) => {
              const isLink = e.target.closest("a"); // Detect if a <Link> (which renders as <a>) was clicked
              if (isLink) {
                setOpen(false); // Do something, like close the navbar
              }
            }}
          >
            <li>
              <Link href="/" className="hover:text-gray-600 text-lg">
                Home
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-gray-600 text-lg">
                Blogs
              </Link>
            </li>
            {token && (
              <>
                <li>
                  <Link
                    href="/blog/myBlogs"
                    className="hover:text-gray-600 text-lg"
                  >
                    My Content
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className="hover:text-gray-600 text-lg">
                    Profile
                  </Link>
                </li>
                <li>
                  <div className="flex">
                    <Link href="/chats" className="hover:text-gray-600 text-lg">
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
            <li>
              {!token && (
                <button
                  className="text-lg hover:text-gray-600 text-reguarlText"
                  onClick={() => {
                    router.push("/signin");
                    setOpen(false);
                  }}
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
            </li>
          </ul>
        </div>
      </div>
    </>
  );

}