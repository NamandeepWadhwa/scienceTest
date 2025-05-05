const axios=require("axios");
import { getToken } from "../getToekn";
export async function getUnredMessages() {
  try{
    const token=getToken();
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const endpoint = `${baseUrl}/getUnredMessages`; // or whatever your actual route is

    const res = await axios.get(endpoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${getToken()}`,
      },
    });
    console.log(res.data);
    if(res.status===500)
    {
      alert("There was an error getting messsages, please try again");
      return;
    }
    return res.data;
    
  }
  catch(err)
  {
    alert("There was an error getting messages, try again later");
  }
  
}

