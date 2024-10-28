'use client'
import { useState } from "react"
import sendOtp from "../../../lib/otp/sendOtp";
import { useSearchParams } from "next/navigation";
import verifyOtp from "../../../lib/otp/verifyOpt";
import createUser from "../../../lib/user/createUser";
import { userEmail,userPassword } from "../../../lib/user/userState";
import { useAtom } from "jotai";
export default function Home(){
  const[email,setEmail]=useAtom(userEmail);
  const[password,setPassword]=useAtom(userPassword);
  const [opt, setOpt]=useState("");
  const [disable,setdisable]=useState(false);

  async function handleSubmit(){
    if (!opt) {
      alert("enter the otp");
      return;
    }

    const verified = await verifyOtp(email, opt);
    console.log(verified);
    if(verified){
      const data = await createUser(email, password);
      if(data){alert("user created");localStorage.token=data.token;}
    }
      
  }
  async function handleDisable(){
    setdisable(true);
    await sendOtp(email)
    setTimeout(()=>{
      setdisable(false)
    },5000)
  }
 
  return (
    <>
      <div className="min-h-full flex flex-col justify-center items-center">
        <div className="m-3">
          <input
            placeholder="Enter you otp"
            onChange={(e) => {
              setOpt(e.target.value);
            }}
            className=" border-2 border-navbarr p-2 rounded-lg"
          />
        </div>

        <div className="my-3">
          <button onClick={handleSubmit}className="border-2 mx-3 border-red-600  w-24 p-2 rounded-lg text-red-600 hover:bg-red-600 hover:text-white">
            Submit
          </button>
          <button className= {`border-2 border-sky-500 w-24 p-2 rounded-lg ${
              disable
                ? "text-gray-500 opacity-50 cursor-not-allowed"
                : "text-sky-500 hover:bg-sky-500 hover:text-white"
            }`}
          disabled={disable}
          onClick={handleDisable}>
            Resend
          </button>
        </div>
      </div>
    </>
  );
  
}