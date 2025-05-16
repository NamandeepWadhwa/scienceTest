"use client";
import { useEffect,useState,useCallback } from "react";
import { getUserChat } from "../../lib/messages/getUserChat";
import { getUserUnreadChat } from "../../lib/messages/getUserUnreadChat";
import { useSocket } from "../sockeioContext";
import { useUnreadMessage } from "../unreadMessagContext";
import { getUnredMessages } from "../../lib/messages/getUnreadMessages";
import UserAvatar from "../blog/userAvatar"
import { deleteUnreadChat } from "../../lib/messages/deletUnReadMessage";
import { useRouter } from "next/navigation";

export default function ChatHomePage() {
  const {unreadMessage, setUnredMessages} = useUnreadMessage();
  const [chats, setChats] = useState([]);
  const socket = useSocket();
  const router = useRouter();
  
  async function handleClickChat(chatId,otherUserId){
    const deleted= await deleteUnreadChat(chatId);
    if(deleted)
    {
      const newUnreadMessage = await getUnredMessages();
      setUnredMessages(newUnreadMessage);
      router.push(`blog/message/${otherUserId}`);
    }


  }


  const handleNewMessage = useCallback(
    async (data) => {
      const { chatId, senderId } = data;

      setChats((prevChats) => {
        const existingChatIndex = prevChats.findIndex(
          (chat) => chat.chatId === chatId
        );

        let updatedChats = [...prevChats];

        if (existingChatIndex !== -1) {
          const updatedChat = {
            ...updatedChats[existingChatIndex],
            count: updatedChats[existingChatIndex].count + 1,
          };

          updatedChats.splice(existingChatIndex, 1);
          updatedChats = [updatedChat, ...updatedChats];
        } else {
          updatedChats = [
            {
              chatId,
              otherUserId: senderId,
              count: 1,
            },
            ...updatedChats,
          ];
        }

       
        updatedChats.sort((a, b) => b.count - a.count);

        return updatedChats;
      });
      // Optional: keep global unread state in sync
      const newUnreadMessage = await getUnredMessages();
      setUnredMessages(newUnreadMessage);
    },
    [setChats, setUnredMessages]
  );

  async function getChats() {
    try {
      const chatData = await getUserChat();
      const unreadChatData = await getUserUnreadChat();

      let unreadList = {};
      unreadChatData.forEach((chat) => {
        unreadList[chat.chatId] = chat.count;
      });

      const finalChatData = chatData.map((chat) => ({
        chatId: chat.chatId,
        otherUserId: chat.participant,
        count: unreadList[chat.chatId] || 0,
      }));

     
      finalChatData.sort((a, b) => b.count - a.count);

      setChats(finalChatData);
    } catch (err) {
      console.error("Failed to load chats:", err);
    }
  }
  
  useEffect(()=>{
    if(!socket) return;
    socket.on("UNREAD_MESSAGE", handleNewMessage);
    return () => {
      socket.off("UNREAD_MESSAGE", handleNewMessage);
    };
  },[socket,handleNewMessage]);

  useEffect(()=>{

    getChats();

  },[])
  return (
    <>
    {chats.length<=0 && <span className="text-center text-2xl">No Chats</span>}
    {  chats.length>0 &&
        <div className="flex flex-col h-screen overflow-y-auto">
        {chats.map((chat, index) => {
          return (
            <div key={index} className="m-2 w-full border-b-2 flex items-center flex-wrap p-2" role="button"
            onClick={async ()=>await handleClickChat(chat.chatId,chat.otherUserId)}>
              <div className="flex  items-center">
                <UserAvatar userId={chat.otherUserId} />
              </div>
              {chat.count > 0 && (
                <span className="text-red-600 mx-1 py-2">New Message {chat.count}</span>
              )}
            </div>
          );
        })}
      </div>
}
    </>
  );
  

}