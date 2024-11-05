'use client';
import Image from "next/image";
import { useState } from "react";
export default function SideBar() {

  const [open, setOpen] = useState(false);
  return<>
  <div className="flex flex-col absolute right-0 w-1/2">
    <div className="md:hidden absolute right-0 mt-5 mx-5 z-20">
      <button
        onClick={(e) => {
          e.preventDefault();
          setOpen(!open);
        }}
      >
        <Image src="/images/hamburger.png" width={30} height={30} alt="Menu" />
      </button>
    </div>
    <div
      className={`md:hidden bg-navbar h-screen w-2/3 absolute right-0 z-10 text-lg justify-center items-center text-reguarlText ${
        open ? "flex flex-col" : "hidden"
      } `}
    >
      <ul className="space-y-5">
        <li>
          <a href="#" className="hover:text-gray-600 text-lg">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-600 text-lg">
            POTD
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-600 text-lg">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-600 text-lg">
            Home
          </a>
        </li>
        <li>
          <button className=" text-lg hover:text-gray-600">Button</button>
        </li>
      </ul>
    </div>
  </div>;
</>;

}