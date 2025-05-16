// SocketContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { tokenState } from "../lib/stateManagement/tokenState";
import { useAtom } from "jotai";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [tokenValue] = useAtom(tokenState);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!tokenValue) return;
    

    const newSocket = io("http://localhost:8080", {
      auth: {
        token: tokenValue,
      },
    });

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
    });

    newSocket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [tokenValue]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
