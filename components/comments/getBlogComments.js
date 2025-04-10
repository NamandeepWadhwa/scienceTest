"use client";
import { Comment } from "./comment";
import{useState,useEffect, useCallback,useRef}from "react"
import getAllBlogs from "../../lib/blogs/getAllBlogs";
import axios from "axios";
import { DecimationAlgorithm } from "chart.js";
export default function BlogComment({ userId})
{

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [cursorId, setCursorId] = useState(null);
    const[hasMore,setHasMore]=useState(false);


   async function getComments(source)
  {
try {
  setLoading(true);
  
  const res= await getAllBlogs(false, true, "", cursorId, source);
  if (res.cursorId) setCursorId(res.cursorId);
  if(res.blogs.length>0)setHasMore(true);
  else setHasMore(false);
  
    setData((prevData) => {
      return [...prevData, ...res.blogs];
    });
    setLoading(false);
    return;
} catch (err) {
  if (axios.isCancel(err)) return;
  setError(true);
  console.log(err);
  return;
}
  }

  useEffect(()=>{
  const source=axios.CancelToken.source();
  getComments(source);
  return (()=>{source.cancel(); setError(false);})
  

  },[])

      const observer = useRef();
      const lastElement = useCallback((node) => {
      
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && hasMore) {
            const source = axios.CancelToken.source();
            getComments(source);
          }
         
        });
         if (node) observer.current.observe(node);
      }, [loading, hasMore]);
  return (
    <div className="flex flex-col">
      {localStorage.getItem("token") && localStorage.getItem("Name") && (
        <div className="w-full border-b-2 mt-10 pb-2 flex flex-warp justify-between ">
          <input
            placeholder="Add a comment..."
            className="w-4/5 px-4 py-2  focus:outline-none "
          />
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg ml-2">
            Submit
          </button>
        </div>
      )}
     {data.length>0 && data.map((d,index)=>{
      if(index+1==data.length)return (
        <div key={index} ref={lastElement}>
          <Comment
            userId={d.userId}
            content={d.title}
            createdAt={d.createdAt}
          />
        </div>
      );
      return (
        <div key={index}>
          <Comment
            userId={d.userId}
            content={d.title}
            createdAt={d.createdAt}
          />
        </div>
      );
     })}
     {loading && <span className="text-2xl text-red-600">Loading</span>};
     {error && <span className="text-2xl text-red-600"> There was an error in loading comments</span>}
    </div>
  );
}