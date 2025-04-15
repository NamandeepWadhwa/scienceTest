import axios from "axios";
export default async function checkUpvotes(blogId,token) {
  try{
 const url = process.env.NEXT_PUBLIC_BACKEND_URL;
 const res=await axios({
  method:"GET",
  url:url+"/checkUpvote",
  headers:{
    "Content-Type":"Application/Json",
    "Authorization":`JWT ${token},`
  },
  query:{blogId}
 });
 if(res.status()!=200)
 {
  const message=res.data.message
  alert(message);
  return;
 }
 return res.data;
}
 catch(err)
 {
 alert("There was some error please try again");
 console.log(err);
 return;
 }

}