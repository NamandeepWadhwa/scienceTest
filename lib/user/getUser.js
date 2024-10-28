export default async function getUser(email,password){
  try{
     const url = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(url + "/getUser", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
     const data = await res.json();
    if(res.status!==200){
     
      
      return null;
    }
    return data


  }
  catch (err){
    alert("An error occured pleas try again")
    console.log(err);

  }
}