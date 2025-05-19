export default async function verifyOtp(email,otp){
  try{
    console.log(email,otp)
    const url = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res =await  fetch(url + "/verifyOtp", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body:JSON.stringify({
        email:email,
        otp:otp
      })
    });
    const data=await res.json();
   
    
   
    if(res.status!==200){ alert(data.message);return false;}
    return true;

  }
  catch(error){
    alert("Some error occured pleas try again")
    console.log(error)
    return false;
  }
}