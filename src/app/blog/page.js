"use strict";
"use client";
import {useState,useRef,useEffect} from "react";
import Image from "next/image";

export default function Page() {
  const inputRef=useRef(null);
  const [tag,setTag]=useState("");
  useEffect(()=>{
   if(inputRef.current){
     inputRef.current.focus();
   }
  }
  ,[])


  return (
    <div className=" flex flex-col items-center ">
      <div
        className="flex width items-center m-5 bg-gray-200 sm:w-1/2 md:w-1/4 rounded-full border-gray-200 border-2 p-2
      backdrop-blur-lg background-opacity-50"
      >
        <input
          className=" border-0 bg-gray-200 sm:w-1/2 md:w-1/4 flex-1 focus:outline-none "
          placeholder="Tag "
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          ref={inputRef}
        ></input>
        <button onClick={() => setTag("hakai")}>
          <Image
            src="/images/search.png"
            width={22}
            height={25}
            alt="search"
          ></Image>
        </button>
      </div>
    </div>
  );
}