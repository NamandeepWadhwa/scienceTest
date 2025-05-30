"use strict";
"use client";

import { useState, useRef, useEffect} from "react";
import "react-quill/dist/quill.snow.css";
import updateBlog from "../../../../../../lib/blogs/updateBlog";
import getBlogInfo from "../../../../../../lib/blogs/getBlogInfo";
import DOMPurify from "dompurify";
export default function Page({params}) {
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const quillRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [sanitizedContent, setSanitizedContent] = useState("");
  const ReactQuill =
    typeof window === "object" ? require("react-quill") : () => false;

    const id = params.id;
  useEffect(() => {
    try{
      setLoading(true);
      async function fetchData() {
        const blog=await getBlogInfo(id);
        setTitle(blog.title);
        setDescription(blog.content);
        setTags(blog.tags);
        setDescription(blog.content);
        setLoading(false);
      }
      fetchData();
    }
    catch (err) {
      setError(true);
      console.log(err);
    
    }
  }, []);

  // Handle adding tags
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

  // Remove a tag
  function removeTag(tag) {
    setTags((prevTags) => prevTags.filter((t) => t !== tag));
  }

  // Handle the submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim().length < 20 || title.trim().length > 70) {
      alert("Title should be between 20 and 70 characters");
      return;
    }

    // Ensure sanitization only happens on the client side
    const rawText = quillRef.current?.getEditor()?.getText();
    console.log(ReactQuill);

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

    try {
      setSubmitting(true);
      const data = {
        id:id,
        title: title,
        content: sanitizedContent,
        tags: tags,
      };
      const returnedValue = await updateBlog(data);
      if(returnedValue!=null){
    
      alert("Blog edited successfully");
      setSubmitting(false);
      setTitle(returnedValue.title);
      setTags(returnedValue.tags);
      setDescription(returnedValue.content);
      }
      setSubmitting(false);

      return;
    } catch (err) {
     
      return;
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSanitizedContent(DOMPurify.sanitize(description));
    }
  }, [description]);

  return (
    <>
      {loading && (
        <div className="text-2xl text-red-600 m-2 flex justify-center items-center">
          {" "}
          Loading
        </div>
      )}
      {error && (
        <div className="text-2xl text-red-600 m-2 flex justify-center items-center">
          {" "}
          Some error occurred, please try again
        </div>
      )}

      {!loading && !error && (
        <div className="bg-white p-4">
          <form onSubmit={handleSubmit}>
            <div>
              <label className="block mt-2">Title (20 to 70 characters)</label>
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
              <label className="block mt-2">
                Description (2,500 to 10,000 characters)
              </label>

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
                className="mt-16 md:mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-full text-white text-sm"
                disabled={submitting?true:false}
              >
                {submitting ? "Loading" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
