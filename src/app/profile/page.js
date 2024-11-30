"use client";
import UserProfile from "../../../components/user/profile/profile";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import getProfile from "../../../lib/profile/getProfile";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
       
        router.push("/sign"); // Correct path to sign page
        return;
      }

      try {
        const data = await getProfile(token); // Assuming this is your API function
        if (data) {
          setProfile(data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        router.push("/");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchProfile();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; // Show loading message or spinner
  }

  return <UserProfile profile={profile} />;
}
