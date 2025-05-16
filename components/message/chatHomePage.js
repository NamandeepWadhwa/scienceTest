"use client";
import { useEffect,useState,useCallback } from "react";
import { getUserChat } from "../../lib/messages/getUserChat";
import { getUserUnreadChat } from "../../lib/messages/getUserUnreadChat";
import { useSocket } from "../sockeioContext";
import { useUnreadMessage } from "../unreadMessagContext";
import { getUnredMessages } from "../../lib/messages/getUnreadMessages";

export default function ChatHomePage() {
  const {unreadMessage, setUnredMessages} = useUnreadMessage();
  const [chats, setChats] = useState([]);
  const socket = useSocket();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



const handleNewMessage=useCallback(async ()=>{
  const newUnreadMessage=await getUnredMessages();
  setUnredMessages(newUnreadMessage);
},[])

async function getChats(){
  try{
    const chatData = await getUserChat();
    const unreadChatData = await getUserUnreadChat();

     let unreadList={};
     unreadChatData.forEach((chat)=>{
      unreadList[chat.chatId]=chat.count;
     });
     const finalChatData=chatData.map((chat)=>{
      
      return {
        chatId: chat.chatId,
        otherUserId: chat.participant,
        count: unreadList[chat.id] || 0,
      };
     });

    setChats(finalChatData);

 

   
  }
  catch(err){
    console.error("Failed to load chats:", err);
  }
}

  useEffect(()=>{
    if(!socket) return;
    socket.on("UNREAD_MESSAGE", handleNewMessage);
    return () => {
      socket.off("UNREAD_MESSAGE", handleNewMessage);
    };
  },[]);

  useEffect(()=>{

    getChats();

  },[])
  return <>{chats.map((chat,index)=>{
    return <div key={index}>{chat.count}</div>
  })}</>
  

}