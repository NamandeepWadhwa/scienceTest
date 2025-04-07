import axios from "axios";
export default async function getRandomUserBlogs(
  userId,
  cursorId = null,
  cancelToken = null,
) {
  try {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await axios({
      method: "GET",
      url: url + "/getRandomUserBlogs",
      params: { userId, cursorId },
      headers: {
        "Content-Type": "application/json",
      },
      cancelToken: cancelToken.token,
    });
    console.log(res);
    if (res.status != 200) {
     
      return null;
    }
    return res.data;
  } catch (err) {
    console.error("Error fetching random user blogs:", err);
    return null;
  }
}