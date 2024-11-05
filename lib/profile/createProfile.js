export default async function createProfile(token, name, imageUrl) {
  try {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(url + "/createProfile", {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: name,
        imageUrl: imageUrl,
      }),
    });
    const data=await res.json();
   
    if(res.status!=200){
    alert(data.message)
      return null;
    }
    alert("profile created");
    return data;
  
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}
