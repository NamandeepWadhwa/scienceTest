export default async function getBlogInfo(id) {
  try {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(url + `/getBlogInfo?blogId=${id}`, {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status != 200) {
      const message = res.data.message;
      alert(message);
      throw new Error("Error in fetching blog info");
    }
    
    const data = await res.json();

    return data;

  } catch (error) {
    console.log(error);
    throw new Error("Error in fetching blog info");
  }
}