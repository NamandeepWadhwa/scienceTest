import axios from "axios";



export default async function verifyUser(email) {
  try {
    const url= process.env.NEXT_PUBLIC_BACKEND_URL;
    const endpoint = `${url}/verifyUser`; // or whatever your actual route is
    const res=await axios.get(endpoint, {
      headers: {
        "Content-Type": "application/json",
      },
      params: { email },
    });
    if (res.status !== 200) {
      alert(res.data.message);
      return null;
    }
    return res.data;

  }
  catch (err) {
    alert("An error occurred while creating the account, please try again");
    console.log(err);
    return null;
  }
}