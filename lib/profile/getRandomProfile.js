export default async function getRandomProfile(userId) {
  try {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  
    
    const res = await fetch(`${url}/getRandomProfile?userId=${userId}`, {
      method: "GET",
      cache: "no-store",
    });

    if (res.status !== 200) {
      return null;
    }

    const data = await res.json();
    return data.profile;
  } catch (err) {
    console.error("Error fetching profile:", err);
   
   return null;
  }
}
