"use client";

import { useState, useEffect } from "react";
import getImage from "../../lib/nasa/astronomicalPic";
import Information from "../../components/home/astronomicalPic";

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const imageDetails = await getImage();
        setData(imageDetails);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError(true);
      }
    }

    fetchData();
  }, []); // Empty dependency array ensures this runs only once.

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-bold text-red-600">Failed to load data.</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <Information data={data} />
    </main>
  );
}
