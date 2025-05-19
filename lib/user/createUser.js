export default async function createUser(email,password){
  try{

    
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(url + "/createUser", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email:email,
      password:password
    }),
  
  });
  const data=await res.json();
  if(res.status!=200){
    alert(data.message);
    return null
  }
  return data
}
catch(err){
  alert('An error occured while creating the account please try again')
  console.log(err)
  return null
}
}