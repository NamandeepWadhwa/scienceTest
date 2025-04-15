import axios from 'axios'
export default async function changeUpvotes(upVoted,blogId,token) {
  try{
    const res = await axios({
      method: "POST",
      url: process.env.NEXT_PUBLIC_BACKEND_URL + "/checkUpvote",
      headers:{
        "Content-Length":"Application/Json",
        "Authorization":`JWT ${token}`,
        data:{
          blogId:blogId,
          upVoted:upVoted
        }
      }
    });
    if(res.status()!=200)
    {
      const message=res.data.message;
      alert(message);
      return;
    }
    return res.data;
  }
  catch(err)
  {
    alert("There was some error please try again");
    return;
  }
  
}