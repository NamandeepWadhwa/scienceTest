import axios from "axios";
import { getToken } from "../getToekn";

export default async function getUserComments(cancelToken,curosrId)
{
  try{
     const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
     const endpoint = `${baseUrl}/getUserComments`; 
    const resa = await axios({
      method: "GET",
      url: endpoint,
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${getToken()}`,
      },
      params: { curosrId },
      cancelToken: cancelToken.token,
    });
    if(resa.status!=200)
    {
      alert("There was some error please try again later");
      return {comments:[],curosrId:null};
    }
    return resa.data;

  }
  catch(error)
  {
      console.log(error);

      throw error;
  }
}

