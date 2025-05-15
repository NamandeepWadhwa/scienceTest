"use client";

import { useEffect } from "react";
import SideBar from "./sideBar";
import SideBarMd from "./sideBarMD";
import { getUnredMessages } from "../../lib/messages/getUnreadMessages";
import { useSocket } from "../sockeioContext";
import { tokenState } from "../../lib/stateManagement/tokenState";
import { useAtom } from "jotai";

import{ useUnreadMessage } from "../unreadMessagContext";
    

export default function FinalLayout() {
   const {unreadMessages, setUnredMessages} = useUnreadMessage();
  const socket = useSocket();
  const [token] = useAtom(tokenState);

  

  async function getMessages() {
    try {
      const messages = await getUnredMessages();
      setUnredMessages(messages);

      
  
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    console.log("Socket is", socket);
   

    if (token) {
      getMessages();
    }

      if (socket) {
        socket.on("UNREAD_MESSAGE", getMessages);
      }

      // Clean up the socket listener when component unmounts
      return () => {
        if (socket) {
          socket.off("UNREAD_MESSAGE", getMessages);
        }
      };
  }, [socket,token]); 

  return (
    <div className="sticky top-0 w-full flex justify-center bg-navbar z-50 h-14">
      <SideBar />
      <SideBarMd/>
    </div>
  );
}
