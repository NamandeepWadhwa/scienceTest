"use client"
import SideBar from "./sideBar";
import SideBarMd from "./sideBarMD";
import { getUnredMessages } from "../../lib/messages/getUnreadMessages";
import {useState,useEffect}from "react";
export default   function FinalLayout()
{
const [unreadMessages,setUnredMessages]=useState(0);
async function getMessages() {
try{
  const messages=await getUnredMessages();
  setUnredMessages(messages);
}
catch(err)
{
  console.error(err);
  return;
}
  
}
useEffect(()=>{
  getMessages();

},[])

    return  <div className="sticky top-0 w-full flex justify-center bg-navbar z-50 h-14"> 
    <SideBar messages={unreadMessages}/>
    <SideBarMd messages={unreadMessages}/>
    </div>
}