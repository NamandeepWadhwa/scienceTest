"use client";
import getRandomProfile from "../../lib/profile/getRandomProfile";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function UserAvatar({ userId }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const profile = await getRandomProfile(userId);
        if (profile) {
          setProfile(profile);
        }
        setLoading(false);
      } catch (e) {
        console.log(e);
        setError(true);
      }
    };
    fetchData();
  }, [userId]); // Added userId here to trigger the effect when it changes

  return (
    <>
      {error && <p className="text-red-500">Failed to load profile.</p>}
      {loading && <p className="text-gray-500">Loading...</p>}
      {profile && (
        <>
          <div className="mx-3 w-[50px] h-[50px] rounded-full overflow-hidden border-2 border-black">
            <Image
              loading="lazy"
              className="object-cover w-full h-full"
              src={
                profile.imageUrl ? profile.imageUrl : "/images/userProfile.png"
              }
              width={50}
              height={50}
              alt="author"
            />
          </div>

          <span className="mr-5 text-2xl">{profile.name}</span>
        </>
      )}
      {!profile && (
        <>
          <div className="mx-3">
            <Image
              className="rounded-full border-2 border-black"
              src="/images/userProfile.png"
              width={50}
              height={50}
              alt="author"
            />
          </div>
          <span className="mr-5 text-2xl">Delted User</span>
        </>
      )}
    </>
  );
}
