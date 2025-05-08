"use client"
import {useState, useEffect, useRef, useCallback}from "react";
import { useSocket } from "../sockeioContext";
import { doesChatExist } from "../../lib/messages/chatExist";
import axios from "axios";
import GetMessages from "./getMessges";

export default function MainChat({otherUserId})
{
  const [messages,setMessages]=useState([]);
  const socket=useSocket();
  const[cursorId,setCursorId]=useState(null);
  const[loading,setLoading]=useState(false);
  const [hasMore,setHasMore]=useState(null);
  const[chatExist, setChatExist]=useState(false);
  const messageRef=useRef(null);
  const [chatId,seetChatId]=useState(null);
  
 
  const handleNewMessage=(newMesage)=>
  {
      setMessages((preMessage)=>{return [...preMessage,newMesage]})
  }
const handleScroll = (e) => {
  const top = e.target.scrollTop;
  if (top === 0 && hasMore && !loading) {
    setLoading(true);
    handleOldMessage(); // Load older messages
    setLoading(false);
  }
};
const handleOldMessage = () => {
  if (!messageRef.current) return;

  const container = messageRef.current;
  const prevScrollHeight = container.scrollHeight;

  setLoading(true);

  const data = GetMessages(cursorId, otherUserId);
  const arr = data.arr.reverse();

  if (arr.length > 0) {
    setMessages((prevMessages) => {
      const updated = [...arr, ...prevMessages];

      // Wait for DOM update
      setTimeout(() => {
        const newScrollHeight = container.scrollHeight;
        container.scrollTop = newScrollHeight - prevScrollHeight;
      }, 0);

      return updated;
    });

    setCursorId(data.cursorId);
    setHasMore(true);
  } else {
    setHasMore(false);
  }

  setLoading(false);
};



  useEffect(()=>{
    if(!socket)return;
    socket.on("NEW_MESSAGE_RECEIVED", handleNewMessage);
    return (()=>{
      socket.off("NEW_MESSAGE_RECEIVED", handleNewMessage);
    })
    
  },[socket]);
  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchChat = async () => {
      try {
        const res = await doesChatExist(otherUserId, source);
       
      
        if (res.isExist === false) {
          setMessages([]);
          setChatExist(false);
          handleOldMessage();
        } else {
          setChatExist(true);
          seetChatId(res.chatId);
          handleOldMessage();
          
          
        }
      } catch (err) {
       if (!axios.isCancel(err)) {
         console.error("Error checking chat existence", err);
       }
      }
    };

    fetchChat();

    return () => {
      source.cancel(); // Properly clean up the request
    };
    


  }, [otherUserId]);

  useEffect(()=>{
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  },[])

  return (
    <>
      <div className="flex flex-col h-4/5">
        
        <div className="flex- flex-col overflow-y-auto p-4" ref={messageRef} onScroll={handleScroll}
        >
          {messages.map((message, index) => {
            const isCurrentUser = message.senderId !== otherUserId;
          

            return (
              <div
                key={index}
                
               
                className={`flex ${
                  isCurrentUser ? "justify-end" : "justify-start"
                } mb-2`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-xs ${
                    isCurrentUser
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-200 text-black rounded-bl-none"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input area fixed at the bottom */}
        <div className="border-t p-4">
          <div className="flex items-center gap-2">
            <input
              className="flex-1 border rounded px-3 py-2"
              type="text"
              placeholder="Type a message..."
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );

}
