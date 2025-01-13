'use server';

import getImage from "../../lib/nasa/astronomicalPic";
import Information from "../../components/home/astronomicalPic";

export default async function Home() {
  try {
    const data = await getImage();
   
 
    return (
      <main className="flex flex-col items-center justify-center min-h-screen">
        <Information data={data} />
      </main>
    );
  
  } catch (err) {
    console.error("Failed to fetch data:", err);
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-bold text-red-600">Failed to load data.</p>
      </div>
    );
  }
}
