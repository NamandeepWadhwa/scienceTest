const axios = require("axios");
import { getToken } from "../getToekn";
export async function sendMessage(chatId, message) {

  if (!chatId) {
    console.log("userId is null");
    return;
  }
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const endpoint = `${baseUrl}/sendMessage`;

    const res = await axios.post(endpoint,{chatId,message}, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${getToken()}`,
      },
      
     
    });
    if(res.status!==200)
    {
      alert("There was an error sending message, please try again later");
      return null;
    }
    return res.data;
  } catch (err) {
    alert("There was an error sending message, please try again later");
    console.log(err);
  }
}
