"use client";
import UserAvatar from "../blog/userAvatar";

export function Comment({userId,content,createdAt}) {
    function formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }

  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-2">
      <div className="flex flex-wrap items-center mt-5">
        <UserAvatar userId={userId} />
      </div>
      <div className="flex flex-warp justify-between ">
        <span className="mt-2 mx-3">{content}</span>
        <span>{formatDate(createdAt)}</span>

      </div>
    </div>
  );
}