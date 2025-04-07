"use client"
import { useState} from "react";
import Link from "next/link";
import BlogScroll from "../../../../components/blog/blogScroll";

export default function MyBlogs()
{
  const [blog, setBlog] = useState(true);
  const [comment, setCommet] = useState(false);
  function handleBlogCommentClick() {
    setBlog(!blog);
    setCommet(!comment);

  }


 

return (
  <>
    <div className="flex flex-wrap justify-between">
      <div className="flex flex-wrap">
        <button
          className={
            blog
              ? "m-3 border-2 text-xl px-3 pb-1 text-white border-red-600  rounded-xl bg-red-600 "
              : "m-3 border-2 text-xl border-red-600 px-3 rounded-xl pb-1 "
          }
          onClick={handleBlogCommentClick}
        >
          Blogs
        </button>
        <button
          className={
            comment
              ? "m-3 border-2 text-xl text-white border-red-600  px-2 rounded-xl bg-red-600 pb-1 "
              : "m-3 border-2 text-xl border-red-600 px-3 rounded-xl pb-1r"
          }
          onClick={handleBlogCommentClick}
        >
          Comments
        </button>
      </div>
      <div className="flex flex-wrap">
        <Link
          href="/blog/myBlogs/createBlog"
          role="button"
          className="m-3 border-red-600 border-2 px-2 rounded-xl hover:text-white hover:bg-red-600 text-xl
        transition-all duration-300 ease-in-out"
        >
          Create Blog
        </Link>
      </div>
    </div>

    
    <BlogScroll isExternal={false} userId={null}/>
  </>
);

}