"use client"
import {useState, useEffect, useRef, useCallback}from "react";
import { useSocket } from "../sockeioContext";
import { doesChatExist } from "../../lib/messages/chatExist";
import axios from "axios";
import { getMessages } from "../../lib/messages/getMessages";
import { createChat } from "../../lib/messages/createChat";
import { sendMessage } from "../../lib/messages/sendMessag";
export default function MainChat({otherUserId})
{
  const [messages,setMessages]=useState([]);
  const socket=useSocket();
  const[cursorId,setCursorId]=useState(null);
  const[loading,setLoading]=useState(false);
  const [hasMore,setHasMore]=useState(null);
  const[chatExist, setChatExist]=useState(false);
  const messageRef=useRef(null);
  const [content,setContent]=useState("");
  const [chatId,seetChatId]=useState(null);
  
  
 
  const handleNewMessage=useCallback((newMesage)=>
  {
      setMessages((preMessage)=>{return [...preMessage,newMesage]})
  },[]);
const handleScroll = (e) => {
  const top = e.target.scrollTop;
  if (top === 0 && hasMore && !loading) {
    const source = axios.CancelToken.source();
    setLoading(true);
    handleOldMessage(source,chatId); // Load older messages
    setLoading(false);
  }
};
const handleOldMessage = async (source,chatId) => {
  if (!messageRef.current || loading) return;
  if(messages.length>0)
  {
    setCursorId(messages[0].id);
  }

  const container = messageRef.current;
  const prevScrollHeight = container.scrollHeight;

  setLoading(true);


  try {
   
    
    const data = await getMessages(cursorId, chatId,source);
    if(!data || data.messages.length===0) return; 
  
    const arr = data.messages.reverse();

    if (arr.length > 0) {
      setMessages((prevMessages) => [...arr, ...prevMessages]);
      console.log(data);
      setCursorId(data.cursorId);
      setHasMore(true);

      // Wait for React to render the new messages, then adjust scroll
      requestAnimationFrame(() => {
        const newScrollHeight = container.scrollHeight;
        container.scrollTop = newScrollHeight - prevScrollHeight;
      });
    } else {
      setHasMore(false);
    }
  } catch (err) {
    console.error("Failed to load old messages:", err);
  }

  setLoading(false);
};

const handleSendMessage=async()=>
{
  
  if(!content || content.trim()==="")return;
  
  if(!chatId)
  {
    const data=await createChat(otherUserId,content);
    
    if(data===null){return;
    
    }
    const chatId = data.chatId;
    seetChatId(chatId);
     const message = await sendMessage(chatId, content);
     
     if (message !== null && message !== undefined){ handleNewMessage(message);
      setContent("");
     }
     return;
   
    
  }
   const message = await sendMessage(chatId, content);
   
if (message !== null && message !== undefined) {
  console.log("here");
  handleNewMessage(message);
  setContent("");
}
return;


}


useEffect(() => {
  if(!socket || !chatId) return;
  socket.emit("JOIN_CHAT", chatId);
  return () => {
    socket.emit("LEAVE_CHAT", chatId);
  };

},[socket,chatId]);

  useEffect(()=>{
    if(!socket)return;
    socket.on("NEW_MESSAGE_RECEIVED", handleNewMessage);
    return (()=>{
      socket.off("NEW_MESSAGE_RECEIVED", handleNewMessage);
    })
    
  },[socket,handleNewMessage]);
  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchChat = async () => {
      try {
        const res = await doesChatExist(otherUserId, source);
       
      
        if (res.isExist === false) {
          setMessages([]);
          setChatExist(false);
          
          
        } else {
         
          setChatExist(true);
          seetChatId(res.chatId);
          handleOldMessage(source,res.chatId);
          
          
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
        
        <div className="flex flex-col overflow-y-auto p-4 flex-grow" ref={messageRef} onScroll={handleScroll}
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
              onChange={(e) => setContent(e.target.value)}
              value={content}
              
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );

}
