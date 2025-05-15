import { tokenState } from "../lib/stateManagement/tokenState";
import {useAtom} from "jotai";
import { useEffect, useState,useContext,createContext } from "react";
import { useSocket } from "./sockeioContext";
import { getUnredMessages } from "../lib/messages/getUnreadMessages";

const UnreadMessageContext = createContext();
export const UnreadMessageProvider = ({ children }) => {
  const [unreadMessages, setUnredMessages] = useState(0);
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
    if (token) {
      getMessages();
    }

    if (socket) {
      socket.on("UNREAD_MESSAGE", getMessages);
    }

    return () => {
      if (socket) {
        socket.off("UNREAD_MESSAGE", getMessages);
      }
    };
  }, [socket, token]);

  return (
    <UnreadMessageContext.Provider value={{unreadMessages, setUnredMessages}}>
      {children}
    </UnreadMessageContext.Provider>
  );
};
export const useUnreadMessage = () => {
  return useContext(UnreadMessageContext);
};

