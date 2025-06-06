"use strict";

import UserAvatar from "./userAvatar";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function Blog(blog) {

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  const router=useRouter();
  
  return (
    <div
      className="flex flex-col border-b-2 border-gray-200  mt-5 cursor-pointer"
      id={blog.blog.id}
      role="button"
      onClick={()=>{
        router.push(`/blog/${blog.blog.id}`);

      }}
    >
      <div className="flex flex-wrap items-center py-2">
        <UserAvatar userId={blog.blog.userId} />
       
        <div className="flex flex-wrap">
          {blog.blog.tags.map((tag, index) => (
            <span
              className="mx-2 bg-red-600 text-white border-2 border-red-600 rounded-lg"
              id={`tag-${index}`}
              key={index}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="m-5 text-2xl">{blog.blog.title}</div>
      <div className="flex flex-wrap">
        <span className="ml-5">{formatDate(blog.blog.createdAt)}</span>
        <div className="flex flex-wrap ml-5">
          <span>
            <Image src="/images/heart.png" width={25} height={25} alt="likes" />
          </span>
          <span>{blog.blog.upvotes}</span>
        </div>
      </div>
    </div>
  );
}
