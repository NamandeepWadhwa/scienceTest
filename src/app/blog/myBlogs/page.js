"use client"
import axios from "axios";
import { useEffect,useState,useRef, useCallback } from "react";
import Link from "next/link";
import Blog from "../../../../components/blog/blog";
import getUserBlog from "../../../../lib/blogs/getUserBlog";

export default function MyBlogs()
{
  const [data,setData]=useState([]);
  const [hasMore,setHasMore]=useState(false);
  const [loading,setLoading]=useState(false);
  const [cursorId,setCursorId]=useState(null);
  const [blog, setBlog]=useState(true);
  const [comment,setCommet]=useState(false);

  function handleBlogCommentClick(){
    setBlog(!blog);
    setCommet(!comment);
    setData([]);
  }


 async function getData(cancelToken=null)
 {
  try{
    
  setLoading(true);
  const res = await getUserBlog(localStorage.getItem("token"),cursorId,cancelToken);
  if(res.blogs.length>0){
    setCursorId(res.cursorId);
    setData((prevData)=>{return [...prevData, ...res.blogs]})
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
  console.log(err);
  alert("There was error in getting the data");
 }
}
useEffect(()=>{
  let source=axios.CancelToken.source();
  getData(source);
  return (()=>{source.cancel();})
},[])

const oberver=useRef();
const lastElement=useCallback((node)=>{
 
  try{
  
  if(oberver.current)oberver.current.disconnect();
  
  oberver.current=new IntersectionObserver((entries)=>{
   
    if(entries[0].isIntersecting && hasMore)
    {
      let source=axios.CancelToken.source();
      getData(source);
     
    }
  });
  if(node)oberver.current.observe(node);
  
}
catch(err)
{
  
  console.log(err);
}
},[loading,hasMore]);

return (
  <>
    <div className="flex flex-wrap justify-between">
      <div className="flex flex-wrap">
        <button
          className={
            blog
              ? "m-3 border-2 text-xl px-3 pb-1 text-white border-red-600  rounded-xl bg-red-600 "
              : "m-3 border-2 text-xl border-red-600 px-3 rounded-xl pb-1 "
          }
          onClick={handleBlogCommentClick}
        >
          Blogs
        </button>
        <button
          className={
            comment
              ? "m-3 border-2 text-xl text-white border-red-600  px-2 rounded-xl bg-red-600 pb-1 "
              : "m-3 border-2 text-xl border-red-600 px-3 rounded-xl pb-1r"
          }
          onClick={handleBlogCommentClick}
        >
          Comments
        </button>
      </div>
      <div className="flex flex-wrap">
        <Link
          href="/blog/myBlogs/createBlog"
          role="button"
          className="m-3 border-red-600 border-2 px-2 rounded-xl hover:text-white hover:bg-red-600 text-xl
        transition-all duration-300 ease-in-out"
        >
          Create Blog
        </Link>
      </div>
    </div>

    {data && data.length === 0 && !loading && (
      <div className="text-red-600 text-2xl">No Blogs</div>
    )}
    <div className="h-4/5 overflow-y-auto mb-48">
      {data &&
        data.map((blog, index) => {
          if (index + 1 === data.length) {
            return (
              <div key={index} ref={lastElement} className="mb-28">
                <Blog blog={blog}></Blog>
              </div>
            );
          }
          return <Blog key={index} blog={blog}></Blog>;
        })}
      {loading && <div className="text-red-600 text-2xl mb-28">Loading</div>}
    </div>
  </>
);

}