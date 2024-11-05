"use client";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react"; // Import signOut from next-auth

export default function SideBarMd() {
  const router = useRouter();

  // Update handleSignOut to use signOut from NextAuth
  const handleSignOut = async () => {
    localStorage.removeItem("token");
    await signOut({ callbackUrl: "/signin" }); // Redirect after sign out
  };

  const token = localStorage.getItem("token");

  return (
    <>
      <div className="absolute left-0 m-5 bg-red-600">Logo</div>
      <div className="hidden md:flex justify-between text-reguarlText m-5 text-lg">
        <ul className="flex space-x-8">
          <li>
            <a href="#" className="hover:text-gray-600">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-600">
              Pic of the Day
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-600">
              Blogs
            </a>
          </li>
        </ul>
      </div>

      <div className="hidden md:block absolute right-0 m-5">
        {!token && (
          <button
            className="text-lg hover:text-gray-600 text-reguarlText"
            onClick={() => router.push("/signin")}
          >
            Sign In
          </button>
        )}
        {token && (
          <button
            className="text-lg hover:text-gray-600 text-reguarlText"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        )}
      </div>
    </>
  );
}
