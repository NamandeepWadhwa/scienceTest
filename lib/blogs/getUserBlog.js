import axios from "axios";

export default async function getUserBlog(token,cursorId,cancelToken) 
{
  try{
    
    const url=process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await axios({
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json",
      },
      url: url + "/getUserBlogs",
      params: { cursorId },
      cancelToken: cancelToken.token,
    });
    if(res.status !== 200) {
      throw new Error("Error in fetching blogs");
    }
    return res.data;


  }
  catch(err)
  {
    throw err;
  }
}
