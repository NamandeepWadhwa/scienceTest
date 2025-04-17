import axios from "axios";
import { getToken } from "../getToekn";

export default async function deleteBlog(blogId) {
  if (!blogId) {
    alert("Blog ID is required");
    return false;
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const endpoint = `${baseUrl}/deleteBlog`; // or whatever your actual route is

    const res = await axios.delete(endpoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${getToken()}`,
      },
      params: { blogId },
    });

    // Accept 200 or 204 as success for DELETE
    if (res.status !== 200 && res.status !== 204) {
      alert("Please try again");
      return false;
    }

    alert("Blog deleted successfully");
    return true;
  } catch (err) {
    console.error("Error deleting blog:", err);
    alert("Please try again");
    return false;
  }
}
