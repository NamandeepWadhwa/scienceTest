"use client";
import axios from "axios";
import deleteComment from "../../lib/comments/deletUserComment";
import UserAvatar from "../blog/userAvatar";

export default  function UserComment({userId,content,createdAt,setData,setCursorId, getComments,commentId}) {
    function formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
   async function handleDelte() {
    try{
   
      const success=await deleteComment(commentId);
      if(success)
        {
          setCursorId(null);
          setData([]);
          const source=axios.CancelToken.source();
          await getComments(source);
        }  

    }
    catch(err)
    {
      return;
    }
    
   }
  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-2">
      <div className="flex flex-wrap items-center mt-5">
        <UserAvatar userId={userId} />
      </div>
      <div className="flex flex-warp justify-between mx-2 ">
        <span className="mt-2 mx-3">{content}</span>
        <span >{formatDate(createdAt)}</span>

      </div>
      <div className="mx-3 mt-5">
        <button className="text-xl bg-white border-2 border-red-600 text-red-600 hover:text-white hover:bg-red-600
       duration-300  ease-in-out rounded-xl pb-1 px-3" onClick={handleDelte}>Delete</button>
      </div>
    </div>
  );
}