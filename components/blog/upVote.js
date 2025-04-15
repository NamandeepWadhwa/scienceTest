"use client"
import Image from 'next/image';
import{useState,useEffect} from 'react'
import checkUpvotes from '../../lib/blogs/checkUpvotes';
import changeUpvotes from '../../lib/blogs/changeUpvotes';
export default function UpVotes({blogId,upVotes}){
  const [isUpvoted,setUpVoted]=useState(false);
  const [totalNumber,setTotalNumber]=useState(upVotes);
  async function checkUpvote(){
    try{
      const upVoted=await checkUpvotes(blogId,localStorage.getItem("token"));
      setUpVoted(upVoted);
    }
    catch(err)
    {
      console.log(err);
    }
    
  };
  async function handleChange() {
    console.log("handleChange")
    if(isUpvoted)setTotalNumber((prevNumber)=>{return prevNumber-1});
    else setTotalNumber((prevNumber)=>{return prevNumber+1});
    setUpVoted(!isUpvoted);
    try{
      const data=await changeUpvotes(isUpvoted,blogId,localStorage.getItem("token"));
      console.log(data);
      setTotalNumber(data.upVotes);
      setUpVoted(data.isUpvoted);
      return;
    

    }
    catch(err)
    {
      if(isUpvoted)setTotalNumber((prevNumber)=>{return prevNumber-1});
      else setTotalNumber((prevNumber)=>{return prevNumber+1});
      setUpVoted(!isUpvoted);

    }
    
  }
  async  function changeUpVote(){
   try{
    const newValue=await changeUpVote(isUpvoted,blogId);
    setUpVoted(newValue.upVoted);
    setTotalNumber(newValue.totalNumber);
   }
   catch(err)
   {
    throw err;

   }
  }
  useEffect(()=>{
    //checkUpvote();
  },[]);

  return (
    <>
      {localStorage.getItem("token") && (
        <div className="flex flex-warp items-center">
          <div role="button" onClick={handleChange}>
            <Image
              src={isUpvoted ? "/images/heart.png" : "/images/search.png"}
              height={30}
              width={30}
              alt="upvotes image"
            ></Image>
          </div>
          <span>{totalNumber}</span>
        </div>
      )}
      {!localStorage.getItem("token") && (
        <div className="flex flex-warp items-center">
          <div>
            <Image
              src={isUpvoted ? "/images/heart.png" : "/images/search.png"}
              height={30}
              width={30}
              alt="upvotes image"
            ></Image>
          </div>
          <span>{totalNumber}</span>
        </div>
      )}
    </>
  );
}