'use client'
import { useState,useRef,useEffect} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
export default function Page()
{
  const [tags, setTags] = useState([]);
  const[currentTag,setCurrentTag]=useState("");
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
  const quillRef = useRef(null);

  useEffect(() => {
    setDescription("<p>JLKJLK <strong>lkjjlk</strong></p>");
  },[]);
  
  function handleAddTag(e)
  {
    e.preventDefault();
    if (currentTag.trim() === "") {
      alert("Tag cannot be empty");
      return;
    }
    if(tags.length>=5)
    {
      alert("You can only add 5 tags");
      return;
    }
    const trimmedTag = currentTag.trim();
    setCurrentTag(trimmedTag);
    setTags((prevTags) => {
     return  prevTags.includes(currentTag)?prevTags:[...prevTags, currentTag];
    });
    setCurrentTag("");
  }
  function removeTag(tag)
  {
    setTags((prevTags)=>
    {
      return prevTags.filter((t)=>t!==tag);
    })
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log("Form Submitted");
    if(title.trim()===""){
      alert("Title cannot be empty");
      return;
    }
    const rawText=quillRef.current.getEditor().getText();
    if(rawText.trim()===""){
      alert("Description cannot be empty");
      return;
    }
    console.log(rawText);
    
    if(tags.length===0){
      alert("Please add atleast one tag");
      return;
    }
    
  }
  
  return (
    <>
      <div className="bg-white p-4 " onSubmit={handleSubmit}>
        <form className="">
          <div>
            <label className="block mt-2">Title</label>
            <input
              className="w-full  px-5 py-2 rounded border-2 border-black"
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
              {tags.map((tag, index) => {
                return (
                  <button
                    key={index}
                    className="bg-gray-200 px-3 mt-2 rounded-full mx-2"
                    onClick={(e) => {
                      removeTag(tag);
                    }}
                  >
                    {tag} X
                  </button>
                );
              })}
            </div>
            <div className="flex flex-warap">
              <input
                className=" px-5 py-2 border-2 border-black rounded"
                placeholder="Tag"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
              ></input>
              <button
                className="border-2 border-red-600 rounded-full mx-2 text-white bg-red-600 p-2
              hover:bg-white hover:text-red-600"
                onClick={(e) => {
                  handleAddTag(e);
                }}
              >
                {" "}
                Add Tag
              </button>
            </div>
          </div>

          <div>
            <label className="block mt-2">Description</label>

            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              className="h-96 "
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
      {description}
    </>
  );
}