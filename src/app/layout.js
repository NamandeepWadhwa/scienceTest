'use client';
import Image from "next/image";
import "./globals.css";
import { useState,useEffect } from "react";

export default function RootLayout({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <html lang="en">
      <body>
        <div className="relative h-screen">
          <div className="relative h-14 w-full flex justify-center bg-navbar">
            <div className="absolute left-0  m-5 bg-red-600 ">Logo</div>
            <div className="hidden md:flex justify-between text-white m-5 text-lg">
              <ul className="flex space-x-8">
                <li>
                  <a href="#" className="hover:text-gray-600">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-600">
                    Pic of the Day
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-600">
                    Blogs
                  </a>
                </li>
              </ul>
            </div>

            <div className="hidden md:block absolute right-0 m-5 ">
              <button className=" text-lg hover:text-gray-600 text-white">
                Sign In
              </button>
            </div>

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
                className={`md:hidden bg-navbar h-screen  w-2/3 absolute right-0 z-10  justify-center items-center  ${
                  open ? "flex flex-col" : "hidden"
                } `}
              >
                <span>Home</span>
                <span>Home</span>
                <span>Home</span>
              </div>
            </div>
          </div>

          <div className="bg-background">{children}</div>
          <div className="absolute bottom-0 bg-footer h-1/2 w-full z-0"></div>
        </div>
      </body>
    </html>
  );
}
