import axios from 'axios';
export default async function getAllBlogs(byNewest, upvotes, tag,cursorId,cancelToken) {
  try{
  const latest = byNewest ? "newest" : "Oldest";
  const  byUpvotes=upvotes?"true":"false";
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await axios({
    method: "GET",
    url: url + "/getBlogs",
    params: { latest, byUpvotes, tag, cursorId },
    cancelToken: cancelToken.token,
  });
  if(res.status!=200){
    throw new Error("Error in fetching blogs");
  }
  return res.data;
}
catch(error){
 throw error;
}
}