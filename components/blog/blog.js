"use strict";

import Image from "next/image";

export default function Blog(blog) {

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  
  return (
    <div
      className="flex flex-col border-b-2 border-gray-200 mx-5 mt-5 cursor-pointer"
      id={blog.blog.id}
      role="button"
    >
      <div className="flex flex-wrap items-center py-2">
        <div className="mx-5">
          <Image
            className="rounded-full border-2 border-black"
            src="/images/search.png"
            width={50}
            height={50}
            alt="author"
          />
        </div>
        <span className="mr-5 text-2xl">Author Name</span>
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
        <span className="ml-5">{formatDate(blog.blog.updatedAt)}</span>
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
