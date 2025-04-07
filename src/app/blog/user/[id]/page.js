"use client";
import { useSearchParams } from "next/navigation";
import { useEffect,useState} from "react";
import BlogAvatar from "../../../../../components/blog/blogAvatar";
export default function UserPage({ params }){
  const [name,setName]=useState("");
    const searchParams = useSearchParams();
  
  useEffect(() => {
   
   setName(searchParams.get("name"));
  }, [searchParams]);
 

  console.log(searchParams);
  const  id  = params.id;
  return <><div className="ml-3">
    <BlogAvatar userId={id}/>
    {localStorage.getItem("token") && name.toLowerCase()!=localStorage.getItem("Name").toLowerCase() && <div>you can now message</div>} 
   
    </div></>
}