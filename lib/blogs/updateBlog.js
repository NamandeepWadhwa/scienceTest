import axios from "axios";
import { getToken } from "../getToekn";
export default async function (blog)
{
  try{
    console.log(blog);
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await axios({
    method: "POST",
    url:url+"/updateBlog",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${getToken()}`,
    },
    data:blog,
  });
  if(res.status!=200 || res.data===null)
  {
    alert("There was some error while updating the blog");
    return null;
  }
  return res.data;

  }
  catch(err)
  {
    console.log(err);
    alert("There was some error while updating the blog");
    return null;
  }
}