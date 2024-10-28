export default async function sendOtp(email){
  try{
  
    const url = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(url + "/sendOtp",{
      method:"POST",
      headers:{
          'Content-type':'application/json'
      },
      body:JSON.stringify({
        email:email,
      }),
    });
    if(res.status!==200){
      const data=await  res.json();
      alert(data.message)

      return false;
    }
    return true


  }
  catch(error){
    alert("An error occured please try again")
    console.log(error)
    return false

  }

}