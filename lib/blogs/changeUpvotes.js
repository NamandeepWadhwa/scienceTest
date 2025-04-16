import axios from 'axios'
export default async function changeUpvotes(isUpvoted,blogId,token) {
  try{
    const res = await axios({
      method: "POST",
      url: process.env.NEXT_PUBLIC_BACKEND_URL + "/changeUpvotes",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
      data: {
        isUpvoted,
        blogId,
      },
    });
    if(res.status!=200)
    {
      const message=res.data.message;
      alert(message);
     throw new Error(message);
    }
    return;
  }
  catch(err)
  {
   throw err;

  }
  
}