const axios = require("axios");
import { getToken } from "../getToekn";
export async function getMessages(cursorId, chatId, cancelToken) {
  try {
    if (chatId === null) return [];

    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const endpoint = `${baseUrl}/getMessages`;

    const res = await axios.get(endpoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${getToken()}`,
      },
      params: { chatId, cursorId },
      cancelToken: cancelToken.token,
    });
   
    if (res.status !== 200) {
      alert("There was an error getting messgaes, please try again");
      console.log(res.data);
      return [];
    }

    return res.data;
  } catch (err) {
    if (!axios.isCancel(err)) {
      console.log(err);
      alert("There was an error getting messages, try again later");
    }
  }
}
