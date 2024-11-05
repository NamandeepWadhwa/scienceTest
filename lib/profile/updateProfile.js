export default async function updateProfile(token, name, imageUrl) {
  try {
    console.log('Iam here',name)
    const url = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(url + "/updateProfile", {
      method: "PATCH",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: name,
        imageUrl: imageUrl,
      }),
    });
    const data = await res.json();

    if (res.status != 200) {
      alert(data.message);
      return null;
    }
    alert("Profile updated");
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}
