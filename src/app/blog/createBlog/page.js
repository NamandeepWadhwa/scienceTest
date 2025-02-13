"use strict";

"use client";

import { useState, useRef, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import createNewBlog from '../../../../lib/blogs/createNewBlog'

const ReactQuill = require("react-quill");

export default function Page() {
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const quillRef = useRef(null);

  useEffect(() => {
    setDescription("<p>JLKJLK <strong>lkjjlk</strong></p>");
  }, []);

  function handleAddTag(e) {
    e.preventDefault();
    if (currentTag.trim() === "") {
      alert("Tag cannot be empty");
      return;
    }
    if (tags.length >= 5) {
      alert("You can only add 5 tags");
      return;
    }
    const trimmedTag = currentTag.trim();
    setTags((prevTags) =>
      prevTags.includes(trimmedTag) ? prevTags : [...prevTags, trimmedTag]
    );
    setCurrentTag("");
  }

  function removeTag(tag) {
    setTags((prevTags) => prevTags.filter((t) => t !== tag));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim().length < 20 || title.trim().length > 70) {
      alert("Title should be between 20 and 70 characters");
      return;
    }

    const rawText = quillRef.current?.getEditor()?.getText();
    if (
      !rawText ||
      rawText.trim().length < 2500 ||
      rawText.trim().length > 10000
    ) {
      alert("Description should be between 2,500 and 10,000 characters");
      return;
    }
  

    if (tags.length === 0) {
      alert("Please add at least one tag");
      return;
    }
    
    try{
      const data = {
        title: title,
        description: rawText,
        tags: tags,
      };
      const returnedValue=await createNewBlog(data);
      console.log(returnedValue);
      return;


    }
    catch(err){
    alert(err.message);
    return;
    }
   return;
  };
  return (
    <>
      <div className="bg-white p-4">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block mt-2">Title(20 to 70 characters)</label>
            <input
              className="w-full px-5 py-2 rounded border-2 border-black"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>
          <div>
            <div className="flex flex-wrap mb-2">
              <div className="mt-2">
                <label>Tags (only 5 allowed)</label>{" "}
              </div>
              {tags.map((tag, index) => (
                <button
                  key={index}
                  className="bg-gray-200 px-3 mt-2 rounded-full mx-2"
                  type="button"
                  onClick={() => removeTag(tag)}
                >
                  {tag} X
                </button>
              ))}
            </div>
            <div className="flex flex-wrap">
              <input
                className="px-5 py-2 border-2 border-black rounded"
                placeholder="Tag"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
              ></input>
              <button
                className="border-2 border-red-600 rounded-full mx-2 text-white bg-red-600 p-2 hover:bg-white hover:text-red-600"
                onClick={handleAddTag}
              >
                Add Tag
              </button>
            </div>
          </div>

          <div>
            <label className="block mt-2">Description(2,500 to 10,,000 characters)</label>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              className="h-48"
              ref={quillRef}
            />
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="mt-2 py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-full text-white text-sm"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
