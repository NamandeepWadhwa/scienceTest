import getImage from "../../lib/nasa/astronomicalPic";
import Information from "../../components/home/astronomicalPic";

export default async function Home() {
  let data;

  try {
    // Fetch data on the server
    data = await getImage();
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-bold text-red-600">Failed to load data.</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen ">
      {/* Pass fetched data to the Information component */}
      <Information data={data} />
    </main>
  );
}
