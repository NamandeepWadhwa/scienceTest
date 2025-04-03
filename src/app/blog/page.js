"use strict";
"use client";
import {useState,useRef, useCallback} from "react";
import BlogNavbar from "../../../components/blog/navBar";
import Blog from "../../../components/blog/blog";



export default function HomePage() {
  const [data,setData]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(false);
  const [cursorId, setCursorId]=useState(null);
  const[pageNumber,setPageNumber]=useState(1);
  const [hasMore,setHasMore]=useState(true);
 const navBlogProps = {
   setData,
   setLoading,
   setError,
   setCursorId,
   cursorId,
   pageNumber,
   setPageNumber,
   setHasMore,
 };

  const oberver=useRef();
  const lestElement=useCallback((node)=>{
    
    if(loading)return;
    if(oberver.current)oberver.current.disconnect();
   
    oberver.current=new IntersectionObserver((entries)=>{

      if(entries[0].isIntersecting && hasMore){
        
        
        setLoading(true);
        setPageNumber((prevPageNumber)=>prevPageNumber+1);
        
      }
    });
     if (node) oberver.current.observe(node);

  },[loading,hasMore]);

  
  return (
    <>
     
        <BlogNavbar
          {...navBlogProps}
        ></BlogNavbar>
        {loading && <h1>Loading...</h1>}
        {error && <h1>Error...</h1>}
        <div className="h-4/5 overflow-y-auto"> 
          {data &&
            data.map((blog, index) => {
              if (index + 1 === data.length)
                return (
                  <div key={index} ref={lestElement} className="mb-28">
                    <Blog blog={blog} />
                  </div>
                );
              return <Blog key={index} blog={blog} />;
            })}
        </div>
     
    </>
  );
}
