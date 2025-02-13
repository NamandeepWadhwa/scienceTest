import { getToken } from "../getToekn";
export default async function createBlog(data)
{
  
  const token = getToken();
    if (!token) {
      throw new Error("Please sign in to create a blog");
    }
    const url = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(url + "/createBlog", {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const returnedValue=await res.json();
    if(res.status!=200){
      throw new Error(data.message);  
    }
    return returnedValue; 
  


}