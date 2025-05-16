import axios from "axios";
import { getToken } from "../getToekn";

export async function deleteUnreadChat(chatId) {
  try {
    if (!chatId){console.log("ChadId required"); return false;}

    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const endpoint = `${baseUrl}/deleteUnredChat`; // 🛑 removed the extra `/`

    const res = await axios.delete(endpoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${getToken()}`,
      },
      data: { chatId }, // ✅ axios allows DELETE body with `data`
    });

    return res.status === 200;
  } catch (err) {
    if (!axios.isCancel(err)) {
      console.error("Error deleting unread chat:", err);
    }
    return false;
  }
}
