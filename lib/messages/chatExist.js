const axios=require("axios");
import { getToken } from "../getToekn";
export async function doesChatExist(userId,cancelToken) {
  try{
    
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const endpoint = `${baseUrl}/chatExist`; // or whatever your actual route is

    const res = await axios.get(endpoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${getToken()}`,
      },
      params: { userId },
      cancelToken: cancelToken.token,
    });
   
    
    if(res.status===500)
    {
     
      alert("There was an error please try again");
      return;
    }
    return res.data;
    
  }
  catch(err)
  {
    
   if (!axios.isCancel(err)) alert("There was an error try again later");
  }
  
}

