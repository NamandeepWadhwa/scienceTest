"use client"
import BlogAvatar from "../../../../../components/blog/blogAvatar";
import MainChat from "../../../../../components/message/mainChat";
export default function Message({params}){

  const id=params.messageId
  return <><BlogAvatar userId={id}/>
  <MainChat otherUserId={id}/></>
}