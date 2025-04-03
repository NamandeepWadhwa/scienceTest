export default async function getProfile(token) {
  try {
   
    const url = process.env.NEXT_PUBLIC_BACKEND_URL;

    const res = await fetch(`${url}/getProfile`, {
      method: "GET",
      cache:"no-store",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (res.status !== 200) {
    
      return null;
    }

    const data= await res.json();
    return data.profile;
  } catch (err) {
    console.error("Error fetching profile:", err);
    alert("There is an issue fetching your profile, please try again later.");
    throw new Error("Error in fetchin profile");
  }
}
