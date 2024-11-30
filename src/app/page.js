import getImage from "../../lib/nasa/astronomicalPic";
import Information from "../../components/home/astronomicalPic";

async function getData(){
  try{
    const data=await getImage();
    return data;

  }
  catch(err){
    console.log(err);
    return null
  }
}

export default async function Home() {
  const data=await getData();
  if(!data){
    return (
      <>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-xl font-bold text-red-600">Failed to load data.</p>
        </div>
      </>
    );
  }

  return (
  

    <main className="flex flex-col items-center justify-center min-h-screen ">
      {/* Pass fetched data to the Information component */}
      <Information data={data} />
    </main>
    
  );

}
