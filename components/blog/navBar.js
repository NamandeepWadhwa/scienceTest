"use strict";
"use client";
import axios from "axios";
import {useState,useRef,useEffect, use} from "react";
import Image from "next/image";
import getAllBlogs from "../../lib/blogs/getAllBlogs";


export default  function BlogNavbar(props){
  const {
  setData,
  setLoading,
  setError,
  setCursorId,
  cursorId,
  pageNumber,
  setPageNumber,
 setHasMore}=props;


 
  const [byLikes, setByUpvotes] = useState(false);
  const [byNewest, setNewest] = useState(true);
  const inputRef = useRef(null);
  const [tag, setTag] = useState(null);
useEffect(()=>{
  setData([]);
  setPageNumber(1);
  setCursorId(null);
},[tag,byLikes,byNewest]);



useEffect(()=>{
   const source = axios.CancelToken.source(); 
   setError(false);
  setLoading(true);
  getAllBlogs(byNewest,byLikes,tag,cursorId,source)
  .then((res)=>{
    
    setCursorId(res.cursorId);
    setHasMore(res.blogs.length>0);
    setData((prevData)=>{
      return [...new Set([...prevData,...res.blogs])];
    });
    setLoading(false);
  })
  .catch((error)=>{
   
    if(axios.isCancel(error))return;
    setLoading(false);
    console.log(error);
    setError(true);
  });
  return ()=>{source.cancel(); setError(false);};


},[tag,pageNumber,byLikes,byNewest]);




  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  function handleByLikes() {
    setByUpvotes(!byLikes);
    setCursorId(null);
    setPageNumber(1);
    
  }

  function handlebyDate(){
    setNewest(!byNewest);
    setCursorId(null);
    setPageNumber(1);
  }

  function handleSearch() {
    if (!inputRef.current || inputRef.current.value === tag) return;
    if (inputRef.current.value === "") setTag(null);
    
    else setTag(inputRef.current.value);
    setCursorId(null);
    setPageNumber(1);
  }
 

  return (
    <>
      <div className=" flex items-center justify-center top-0">
        <div
          className="flex width items-center m-5 sm:w-1/2 md:w-1/4 rounded-full border-gray-200 border-2 p-2
         
      "
        >
          <input
            className=" border-0  sm:w-1/2 md:w-1/4 flex-1 focus:outline-none
              
           "
            placeholder="Tag "
            ref={inputRef}
          ></input>
          <button onClick={handleSearch}>
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
          onClick={handleByLikes}
        >
          By Likes
        </button>
        <button
          className={
            byNewest
              ? "text-white bg-red-600 border-2 border-red-600 rounded-full p-2 mr-2"
              : "text-black border-2 border-red-600 rounded-full p-2 mr-2"
          }
          onClick={handlebyDate}
        >
          By Newest
        </button>
      </div>
    </>
  );
}