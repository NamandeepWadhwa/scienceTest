"use strict";
"use client";
import {useState,useRef,useEffect} from "react";
import Image from "next/image";
import useBlogSearch from "./useBlogSearch";


export default function BlogNavbar({setData,setLoading,setError,setHasMore,pageNumber,setPageNumber}) {
  const [byLikes,setByUpvotes]=useState(false);
  const[byNewest,setNewest]=useState(true);
  const inputRef=useRef(null);
  const [tag,setTag]=useState("");
 
  useEffect(()=>{
   if(inputRef.current){
     inputRef.current.focus();
   }
  }
  ,[])
   function handleChange(e)
  {
    setTag(e.target.value);
    setPageNumber(1);
  }
  useBlogSearch({query:tag,pageNumber:pageNumber,setData,setError,setLoading,setHasMore});
  

  


  return (
    <>
      <div className="sticky top-0">
        <div className=" flex items-center justify-center top-0">
          <div
            className="flex width items-center m-5 sm:w-1/2 md:w-1/4 rounded-full border-gray-200 border-2 p-2
         
      "
          >
            <input
              className=" border-0  sm:w-1/2 md:w-1/4 flex-1 focus:outline-none
           "
              placeholder="Tag "
              value={tag}
              onChange={handleChange}
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
        <div className="mx-5 flex flex-wrap">
          <button
            className={
              byLikes
                ? "text-white bg-red-600 border-2 border-red-600 rounded-full p-2 mr-2"
                : "text-black border-2 border-red-600 rounded-full p-2 mr-2"
            }
            onClick={() => setByUpvotes(!byLikes)}
          >
            By Likes
          </button>
          <button
            className={
              byNewest
                ? "text-white bg-red-600 border-2 border-red-600 rounded-full p-2 mr-2"
                : "text-black border-2 border-red-600 rounded-full p-2 mr-2"
            }
            onClick={() => setNewest(!byNewest)}
          >
            By Newest
          </button>
        </div>
      </div>
    </>
  );
}