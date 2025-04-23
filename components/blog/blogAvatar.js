"use client";
import getRandomProfile from "../../lib/profile/getRandomProfile";
import Image from "next/image";
import { useRouter } from "next/navigation"; 
import { useState,useEffect } from "react"; 

export default function BlogAvatar({ userId }) {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(()=>{
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const profileData = await getRandomProfile(userId);
        if(profileData!=null)setProfile(profileData);
        
        setLoading(false);
      } catch (error) {
        setError(true);
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  },[userId])
  const router = useRouter();    
  return (
    <>
      <div
        className=" flex flex-wrap items-center w-fit"
        role="button"
        onClick={() => {
          router.push(`/blog/user/${userId}?name=${profile.name}`);
        }}
      >
        <div className="w-[50px] h-[50px] rounded-full overflow-hidden border-2 border-black">
          <Image
            className="object-cover w-full h-full"
            src={
              profile.imageUrl ? profile.imageUrl : "/images/userProfile.png"
            }
            width={50}
            height={50}
            alt="author"
          />
        </div>
        <span className=" sm:mt-0 ml-3 text-4xl">
          {profile.name ? profile.name : "Delted User"}
        </span>
      </div>

      {loading && <div className="text-red-500">Loading...</div>}
      {error && <div className="text-red-500">Error in fetching profile</div>}
    </>
  );
}
