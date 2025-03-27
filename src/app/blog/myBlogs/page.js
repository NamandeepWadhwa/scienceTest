import axios from "axios";
import { useEffect,useState,useRef,useMemo } from "react";

export default function MyBlogs()
{
  const [data,setData]=useState([]);
  const [hasMore,setHasMore]=useState(false);
  const [loading,setLoading]=useState(false);
  const [cursorId,setCursorId]=useState(null);

 async function getData(cancelToken=null)
 {
  try{
    
  setLoading(true);
  const res=await somefunction(cursorId,cancelToken);
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




}