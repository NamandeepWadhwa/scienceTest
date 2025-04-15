
"use server";
import  getBlogInfo from "../../../../lib/blogs/getBlogInfo";
import BlogAvatar from "../../../../components/blog/blogAvatar";
import BlogComment from "../../../../components/comments/getBlogComments";
import UpVotes from "../../../../components/blog/upVote";
import Image from "next/image";
export default async function Page({params}) {
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
const {id}=params;
try{
  const blog=await getBlogInfo(id);
 
  return (
    <>
      <div className="mx-5 flex flex-col overflow-y-auto h-screen pb-20 focus:outline-none">
        <BlogAvatar userId={blog.userId} />
        <div className="flex flex-col md:flex-row flex-warp md:items-center justify-between mt-5 ml-3 md:ml-0">
          <span className="text-3xl">{blog.title}</span>
          <div className="flex flex-wrap items-center mt-3 md:mt-0">
            <span className="mr-3">{formatDate(blog.createdAt)}</span>
<UpVotes blogId={blog.id} upVotes={blog.upvotes}/>
          </div>
        </div>
        <div
          className="prose prose-lg mt-5 max-w-none text-black"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></div>
        <BlogComment  blogId={blog.id} />
      </div>
    </>
  );
}
catch(error)
{
  console.log(error);
  return <div className="text-red-500">Error in fetching blog</div>;
}

}