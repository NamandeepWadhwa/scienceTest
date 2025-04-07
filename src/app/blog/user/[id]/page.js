"use client";
import { useSearchParams } from "next/navigation";
import { useEffect,useState} from "react";
import BlogAvatar from "../../../../../components/blog/blogAvatar";
import BlogScroll from "../../../../../components/blog/blogScroll";
import Image from "next/image";

export default function UserPage({ params }){
  const [name,setName]=useState("");
    const searchParams = useSearchParams();
  
  useEffect(() => {
   
   setName(searchParams.get("name"));
  }, [searchParams]);
 
  const  id  = params.id;
  return (
    <>
      <div className="ml-2 flex items-center mx-3 mt-3 mb-3 flex-wrap">
        <BlogAvatar userId={id} />
        {localStorage.getItem("token") &&
          localStorage.getItem("Name").toLowerCase() !== name.toLowerCase() && (
            
              <div className="flex items-center ml-3 flex-warp mt-2">
                <Image src="/images/heart.png" height={30} width={30}></Image>
                <span className="text-blue-500">Message</span>
              </div>
          
          )}
      </div>

      <BlogScroll isExternal={true} userId={id} />
    </>
  );
}