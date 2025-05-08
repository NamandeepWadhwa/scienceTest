"use client";
import { useSearchParams } from "next/navigation";
import { useEffect,useState} from "react";
import BlogAvatar from "../../../../../components/blog/blogAvatar";
import BlogScroll from "../../../../../components/blog/blogScroll";
import Image from "next/image";
import { canSendMessage } from "../../../../../lib/messages/canSendMeesage";
import { useRouter } from "next/navigation";
 

export default function UserPage({ params }){
  const router=useRouter();
   
  const id = params.id;
  const [name,setName]=useState("");
    const searchParams = useSearchParams();
    const [messageAllowed,setMessageAllowed]=useState(false);
  
  useEffect(() => {
   
   setName(searchParams.get("name"));
  }, [searchParams]);
  async function isAllwed() {
    try{
      const data=await canSendMessage(id);
      console.log(data);
      if(data.canSendMessage===true)setMessageAllowed(true);

    }
    catch(err)
    {
      console.log(err);
      return;
    }
    
  }
  useEffect(()=>{
    if(!localStorage.getItem("token"))return;
isAllwed();
  
  },[id]);

  return (
    <>
      <div className="ml-2 flex items-center mx-3 mt-3 mb-3 flex-wrap">
        <BlogAvatar userId={id} />

         
            {messageAllowed && localStorage.getItem("Name") &&
              <div className="flex items-center ml-3 flex-warp mt-2" role="button" onClick={()=>{
                router.push(`/blog/message/${id}`);
              }}>
                <Image src="/images/message.png" height={30} width={30}></Image>
                <span> Message</span>
               
              </div>
}
          
          
      </div>

      <BlogScroll isExternal={true} userId={id} />
    </>
  );
}