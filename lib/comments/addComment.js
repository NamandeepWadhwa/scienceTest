import axios from 'axios';
export default async function addComment(content,blogId,token,cancelToken=null)
{
  try{
    const res = await axios({
      method: "POST",
      url: process.env.NEXT_PUBLIC_BACKEND_URL + "/addComment",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
      data: {
        content,
        blogId,
      },
      cancelToken: cancelToken.token,
    });
    
    if(res.status!=200)
    {
      alert("Error in adding comment");
      return null;
    }
 
    return res.data;
  }
  catch(err)
  {
    if(axios.isCancel(err)) return;
    console.log(err);
    return null;
  }
}