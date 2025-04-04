export default async function getBlogInfo(id) {
  try {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(url + `/getBlogInfo?blogId=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status != 200) {
      const data = await res.json();
      console.log(data);
      console.log(data.message)
      throw new Error("Error in fetching blog info");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error in fetching blog info");
  }
}