import axios from "axios";

export default async function deleteUserComment(blogId, cursorId , cancelToken = null) {
  try {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await axios({
      method: "GET",
      url: url + "/getBloComments",
      headers: {
        "Content-Type": "application/json",
      },
      params: { blogId, cursorId },
      cancelToken: cancelToken.token,
    });
 

    if (res.status != 200) {
      alert("Error in fetching comments");
      return null;
    }
    return res.data;
  } catch (err) {
    if (axios.isCancel(err)) return;
    alert("Error in fetching comments");
    console.log(err);
    return null;
  }
}