"use client"
import Image from 'next/image';
import{useState,useEffect} from 'react'
import checkUpvotes from '../../lib/blogs/checkUpvotes';
import changeUpvotes from '../../lib/blogs/changeUpvotes';
import getBlogInfo from '../../lib/blogs/getBlogInfo';
export default function UpVotes({blogId}){
  const [upVotes,setUpVotes]=useState(0);
  const [isUpvoted,setUpVoted]=useState(false);
  const [totalNumber,setTotalNumber]=useState(0);
  useEffect(()=>{
    async function getBlogData() {
      try {
        const data = await getBlogInfo(blogId);
        setUpVotes(data.upvotes);
        setTotalNumber(data.upvotes);
      } catch (err) {
        console.error(err);
      }
    }
    getBlogData();
  },[]);
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
 
    const prevUpvoted = isUpvoted;
    const prenNumber = totalNumber;
    try{
      if(isUpvoted)
      {
        setTotalNumber(totalNumber-1);
      }
      else
      {
        setTotalNumber(totalNumber+1);
      }
      setUpVoted(!isUpvoted);
    await changeUpvotes(isUpvoted, blogId, localStorage.getItem("token"));
    }
    catch(err) {
      setTotalNumber(prenNumber);
      setUpVoted(prevUpvoted);
      console.log(err);
    }
  }
  
  useEffect(()=>{
    checkUpvote();
  },[]);

  return (
    <>
      {localStorage.getItem("token") && (
        <div className="flex flex-warp items-center">
          <div role="button" onClick={handleChange}>
            <Image
              src={isUpvoted ? "/images/LikedHeart.png" : "/images/heart.png"}
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