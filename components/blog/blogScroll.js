"use client";
"use strict";
import getUserBlog from "../../lib/blogs/getUserBlog";
import axios from "axios";
import getRandomUserBlogs from "../../lib/blogs/getRandomUserBlogs";
import { useState, useRef, useCallback,useEffect } from "react";
import { useRouter } from "next/navigation";
import Blog from "./blog";
import deleteBlog from "../../lib/blogs/delteBlog";

export default function BlogScroll({isExternal,userId=null})
  {
    const [data,setData]=useState([]);
    const [hasMore,setHasMore]=useState(false);
    const [loading,setLoading]=useState(false);
    const [cursorId,setCursorId]=useState(null);
    const [error, setError]=useState(false);
    const router=useRouter();

    const notLogeedinUserBlogs=async(source)=>{
      try{
        setLoading(true);
        
        const res=await getRandomUserBlogs(userId,cursorId,source);
        if(res==null){setData([]);return;}
        if(res.blogs.length>0)
        {
          setCursorId(res.cursorId);
          setData((prevData)=>{return [...prevData,...res.blogs]});
          setHasMore(true);
        }
        else
        {
          setHasMore(false);
        }
        setLoading(false);
      }
      catch(err)
      {
        if(axios.isCancel(err)) return;
        setError(true);
        console.log(err);
      }
    }

    const logedUerBlogs=async (source)=>{
      try{      
        
      setLoading(true);
      
      
      const res=await getUserBlog(localStorage.getItem("token"),cursorId,source);
      if(res.blogs.length>0)
      {
        setCursorId(res.cursorId);
        setData((prevData)=>{return [...prevData,...res.blogs]});
        setHasMore(true);
      }
      else
      {
        setHasMore(false);
      }
      setLoading(false);
      
    }
    catch(err)
    {
      setLoading(false);
      if(axios.isCancel(err)) return;
      setError(true);
      console.log(err);
    }

    }
    useEffect(()=>{
      const source = axios.CancelToken.source();
      if(!isExternal)logedUerBlogs(source);
      else notLogeedinUserBlogs(source);
      return (()=>{source.cancel(); setError(false);});
    },[])

    async function handleDelte(blogId) {
      try{
        const res=await deleteBlog(blogId);
        console.log(res);
        if(res===true){
           setData([]);
          setCursorId(null);
          const source = axios.CancelToken.source();
         logedUerBlogs(source);
         return;
        };
        alert("Pleas try again later");
       
        return;

      }
      catch(err)
      {
        console.error(err);
       
      }
      
    }

    const observer=useRef();
    const lastElement=useCallback((node)=>{
      if(loading)return;
      if(observer.current) observer.current.disconnect();
      observer.current=new IntersectionObserver((entries)=>{
        if(entries[0].isIntersecting && hasMore)
        {  const source = axios.CancelToken.source();
         if(!isExternal)logedUerBlogs(source);
         else notLogeedinUserBlogs(source);
        }
       
      });
      if(node) observer.current.observe(node);
    

    },[loading,hasMore]);
    return <>
     <div className="h-4/5 overflow-y-auto mb-48">
          {data &&
            data.map((blog, index) => {
              if (index + 1 === data.length) {
                if(isExternal)return <div key={index} ref={lastElement} className="mb-28 flex-flex-col">
                  <Blog blog={blog}></Blog>
                  </div>
                  else

                return (
                  <div
                    key={index}
                    ref={lastElement}
                    className="mb-28 flex-flex-col"
                  >
                    <Blog blog={blog}></Blog>
                    <div className="flex flex-warp m-5">
                      <button
                        className="mr-2 text-red-600 text-xl border-red-600 border-2 bg-white px-5 pb-1 rounded-2xl
                      hover:bg-red-600 hover:text-white ease-in duration-300"
                      onClick={()=>{router.push(`/blog/myBlogs/editBlog/${blog.id}`)}}
                      >
                        Edit
                      </button>
                      <button
                        className="mr-2 text-red-600 text-xl border-red-600 border-2 bg-white px-5 pb-1 rounded-2xl
                      hover:bg-red-600 hover:text-white ease-in duration-300"
                      onClick={()=>{handleDelte(blog.id)}}

                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              }
              if(isExternal)return <Blog key={index} blog={blog}></Blog>;
              else
              return (
                <div className="flex flex-col">
                  <Blog key={index} blog={blog}></Blog>
                  <div className="flex flex-warp m-5">
                    <button
                      className="mr-2 text-red-600 text-xl border-red-600 border-2 bg-white px-5 pb-1 rounded-2xl
                      hover:bg-red-600 hover:text-white ease-in duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        handleDelte(blog.id);
                      }}
                      className="mr-2 text-red-600 text-xl border-red-600 border-2 bg-white px-5 pb-1 rounded-2xl
                      hover:bg-red-600 hover:text-white ease-in duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          {loading && <div className="text-red-600 text-2xl mx-2 mb-28">Loading</div>}
          {error && <div className="text-red-600 mx-2">There was some error, plase try again later</div>}
          {data.length === 0 && !loading && !error && <div className="text-red-600 text-2xl mx-2 ">No blogs found</div>}
        </div>
      
        
        </>


  }
