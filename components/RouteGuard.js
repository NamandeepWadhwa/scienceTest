"use client";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const PRIVAETE_PATHS =["/blog/myBlogs"];

export default function RouteGuard({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
   authCheck(pathname); // Call authCheck whenever the pathname changes

  }, [pathname]);

  function authCheck(url) {
    const path = url.split("?")[0];

    // Check if the token is in localStorage
    const token = localStorage.getItem("token");
      if (!token && PRIVAETE_PATHS.includes(path)) {
       
        setAuthenticated(false);
        router.push("/signin"); // Redirect if not authenticated
      } else {
        setAuthenticated(true); // User is authenticated or on a public path
      }

    setLoading(false); // Authentication check is complete
  }

  // Render children if authenticated or on a public path, and not loading
  if (loading) return null; // Avoid rendering anything until loading is complete

  return (
    <>{!loading ? children : null}</>
  );
}
