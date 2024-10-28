export default async function getUser(email) {
  try {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(url + "/getAuthUser", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    const data = await res.json();
    if (res.status !== 200) {
      alert(data.message);

      return null;
    }
    return data;
  } catch (err) {
    alert("An error occured pleas try again");
    console.log(err);
  }
}
