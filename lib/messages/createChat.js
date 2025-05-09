const axios = require("axios");
import { getToken } from "../getToekn";
export async function createChat(userId) {
  if (!userId) {
    console.log("userId is null");
    return;
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const endpoint = `${baseUrl}/createChat`;

    const res = await axios.post(endpoint,{}, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${getToken()}`,
      },
      params: { userId },
    });
    if(res.status!==200)
    {
      alert("There was an error creating chat, please try again later");
      return null;
    }
    return res.data;
  } catch (err) {
    alert("There was an error creating chat, please try again later");
    console.log(err);
    return null
  }
}
