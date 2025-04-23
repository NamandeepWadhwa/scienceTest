"use client";
import  Comment  from "./comment";
import{useState,useEffect, useCallback,useRef}from "react"
import axios from "axios";
import getBlogComments from "../../lib/comments/getBlogComments";
import addComment from "../../lib/comments/addComment";
export default function BlogComment({ blogId})
{

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [curserId, setCurserId] = useState(null);
    const[hasMore,setHasMore]=useState(false);
    const [content,setContent]=useState("");

  async function handleSubmit()
  {
    try{
    
      if(content.length==0)
      {
        alert("Please enter a comment");
        return;
      }
      const source=axios.CancelToken.source();
      const comment=await addComment(content,blogId,localStorage.getItem("token"),source);
      console.log(comment);
     
      if(comment==null)
      {
       
        return;
      }
      setData((prevData) => {
        return [comment, ...prevData];
      });
      
      setContent("");
      return;
    }
    catch(err)
    {
      if(axios.isCancel(err)) return;
      alert("Error in adding comment");
      return;
    }



  }


   async function getComments(source)
  {
try {

  setLoading(true);
  
  const res= await getBlogComments(blogId,curserId,source);
  if(res==null)
  {
    return;
  }

  if (res.curserId) setCurserId(res.curserId);
  if(res.comments.length>0)setHasMore(true);
  else setHasMore(false);
  
    setData((prevData) => {
      return [...prevData, ...res.comments];
    });
    setLoading(false);
    return;
} catch (err) {
  if (axios.isCancel(err)) return;
  setLoading(false);
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
            onChange={(e)=>{setContent(e.target.value);
         
             
            }}
            type="text"
            value={content}
            className="w-4/5 px-4 py-2  focus:outline-none "
          />
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg ml-2" onClick={handleSubmit}>
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
            content={d.content}
            createdAt={d.createdAt}
          />
        </div>
      );
     })}
     {loading && <span className="text-2xl text-red-600">Loading</span>}
     {error && <span className="text-2xl text-red-600"> There was an error in loading comments</span>}
     {data.length==0 && !loading && !error && <span className="text-2xl text-red-600">No comments yet</span>}
    </div>
  );
}