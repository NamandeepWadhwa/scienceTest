"use strict";
"use client";
import {useState,useRef, useCallback} from "react";
import BlogNavbar from "../../../components/blog/navBar";



export default function HomePage() {
  const [data,setData]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(false);
  const [hasMore,setHasMore]=useState(true);
  const[pageNumber,setPageNumber]=useState(1);

  const oberver=useRef();
  const lestElement=useCallback((node)=>{
    console.log(node);
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
      <div className="overflow-y-auto h-full">
        <BlogNavbar
          setData={setData}
          setLoading={setLoading}
          setError={setError}
          setHasMore={setHasMore}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        ></BlogNavbar>
        {loading && <h1>Loading...</h1>}
        {error && <h1>Error...</h1>}
        <div>
          {data &&
            data.map((d, index) => {
              if (index + 1 === data.length)
                return (
                  <h1 className="mb-48" ref={lestElement} key={index}>
                    {d}
                  </h1>
                );
              return <h1 key={index}>{d}</h1>;
            })}
        </div>
      </div>
    </>
  );
}
