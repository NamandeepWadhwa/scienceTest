"use client";
"use strict";
import { useState, useEffect, useCallback, useRef } from "react";
import getUserComments from "../../lib/comments/getUserComment";
import axios from "axios";
import UserComment from "./userComment";

export default function UserComments() {
  const [data, setData] = useState([]);
  const [cursorId, setCursorId] = useState(null); // Corrected typo in useState
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const observer = useRef();

  async function getComments(source) {
    try{
   
    
    setLoading(true);
    const res = await getUserComments(source, cursorId);
    

  
        setData((prevData) => {
          return [...prevData, ...res.comments];
        });
        
      
        

    if (res.comments.length > 0) setHasMore(true);
    else setHasMore(false);
    setCursorId(res.cursorId); // Corrected typo in cursorId
    setLoading(false);
    setInitialLoadDone(false);
      }
      catch(err)
      {
        if (axios.isCancel(err)) return;
        setLoading(false);
        setData([]);
        setCursorId(null);
        setInitialLoadDone(true);
      }
      
      
  }

  const lastElement = useCallback(
    (node) => {
      if (loading || !initialLoadDone) return;
      if (observer.current) observer.current.disconnect(); // Fixed typo: 'discoonet' -> 'disconnect'

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          const source = axios.CancelToken.source();
          getComments(source);
        }
      });

      if (node) observer.current.observe(node); // Added to start observing the last element
    },
    [loading, hasMore]
  );

 useEffect(()=>{
 const source=axios.CancelToken.source();
 getComments(source);
 return (()=>{source.cancel();})

 },[])

  return (
    <>
      {loading && <span>Loading...</span>}

      {data.length === 0 && (
        <div className="text-red-600 text-2xl mx-2 ">No Comment found</div>
      )}

      {data &&
        data.map((comment, index) => {
          if (index == data.length - 1) {
            return (
              <div key={index} className="">
                <UserComment
                  userId={comment.userId}
                  content={comment.content}
                  createdAt={comment.createdAt}
                  setData={setData}
                  setCursorId={setCursorId}
                  getComments={getComments}
                  commentId={comment.id}
                />
                <button className="m-2">Delete</button>
              </div>
            );
          }
          return (
            <div key={index} ref={lastElement} className="m-2">
              <UserComment
                userId={comment.userId}
                content={comment.content}
                createdAt={comment.createdAt}
                setData={setData}
                setCursorId={setCursorId}
                getComments={getComments}
                commentId={comment.id}
              />
              <button className="m-2">Delete</button>
            </div>
          );
        })}
    </>
  );
}
