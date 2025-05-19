const axios=require("axios");
import { getToken } from "../getToekn";
export async function getUnredMessages() {
  if(getToken()===null)return;
  console.log(getToken());
  try{
    
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const endpoint = `${baseUrl}/getUnredMessages`; // or whatever your actual route is

    const res = await axios.get(endpoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${getToken()}`,
      },
    });
   
    if(res.status===500)
    {
      console.log(res.data);
      alert("There was an error getting messsages, please try again");
      return;
    }
    return res.data;
    
  }
  catch(err)
  {
    console.error(err);
    alert("There was an error getting messages, try again later");
  }
  
}

