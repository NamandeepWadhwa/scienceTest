export default async function getTestUser(email, password)
{
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  try{
    const res = await fetch(url + "/getTestUser", {
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
    if (res.status !== 200) {
      console.log(data.message);
      return null;
    }
    return data;

  }
  catch(err){

    console.log(err)
    return null
  }
}
