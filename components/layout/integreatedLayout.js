"use client";

import { useState, useEffect } from "react";
import SideBar from "./sideBar";
import SideBarMd from "./sideBarMD";
import { getUnredMessages } from "../../lib/messages/getUnreadMessages";
import { useSocket } from "../sockeioContext";
import { tokenState } from "../../lib/stateManagement/tokenState";
import { useAtom } from "jotai";
    

export default function FinalLayout() {
  const [token, setToken] = useAtom(tokenState);
  const socket = useSocket(); // ❗️ Call the hook, don't reference it
  const [unreadMessages, setUnredMessages] = useState(0);
  

  async function getMessages() {
    try {
      const messages = await getUnredMessages();
      console.log(messages);
  
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
   

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
      <SideBar messages={unreadMessages} />
      <SideBarMd messages={unreadMessages} />
    </div>
  );
}
