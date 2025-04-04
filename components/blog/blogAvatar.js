import getRandomProfile from "../../lib/profile/getRandomProfile";
import Image from "next/image";

export default function BlogAvatar({ userId }) {
  try{
    const profile=getRandomProfile(userId);
    return (
    <div className=" mt-4 flex flex-wrap items-center">
      <div>
        <Image className="rounded-full border-2 border-black" 
        src={profile.imageUrl?profile.imageUrl:"/images/search.png"}
        width={100} height={100} alt="author"/>

      </div>
      <span className="mt-3 sm:mt-0 ml-3 text-4xl">{profile.name?profile.name:"Author Name"}</span>
      
      </div>)
  }
  catch(err)
  {
    return <div>There was an error getting the profile</div>
  }
}
