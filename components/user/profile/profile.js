"use client"
import { useState, useEffect } from "react";
import uploadImage from "../../../lib/uploadImage/uploadImage";
import createProfile from "../../../lib/profile/createProfile";
import updateProfile from "../../../lib/profile/updateProfile";
import getProfile from "../../../lib/profile/getProfile";
import { useRouter } from "next/navigation";


export default function UserProfile() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(
   ""
  );
  const [profileCreated,setProfileCreated]=useState(false);

 async function fetchProfile() {
   let token = localStorage.getItem("token");
   const data = await getProfile(token);
   if (data) {
     setName(data.name);
     setPreview(data.imageUrl);
     setProfileCreated(true);
     localStorage.setItem("Name", data.name);
   }
 }
  
  useEffect(()=>{
    fetchProfile();

  },[])

  // Handle name change
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Handle image upload and preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle image removal
  const handleImageRemove = () => {
    setImage(null);
    setPreview(null);
  };

  async function handleSaveProfile(e) {
    e.preventDefault();
    if (!name) {
      alert("Please enter a name");
      return;
    }

    let imageUrl = "";
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "events");
      formData.append("cloud_name", "dvw5kbnsi");
      imageUrl = await uploadImage(formData);
    }
    if(imageUrl==="")
    {
      if(preview!=null)imageUrl=preview;
    }
   
   if(!profileCreated){
    await createProfile(localStorage.getItem("token"),name,imageUrl);
    setProfileCreated(true);
    await fetchProfile();
    router.push("/");
    return;
   }
   else{
    await updateProfile(localStorage.getItem("token"),name,imageUrl);
    router.push("/");
    await fetchProfile();
    
    return;
   }
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <form className="flex flex-col gap-4" onSubmit={handleSaveProfile}>
          {/* Name Input */}
          <label className="block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter your name"
          />

          {/* Image Upload */}
          <label className="block text-gray-700 font-medium">
            Upload Profile Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="py-2"
          />

          {/* Image Preview and Remove Button */}
          {preview && (
            <div className="mt-4 flex flex-col items-center">
              <h2 className="text-gray-700 font-medium mb-2">Image Preview</h2>
              <img
                src={preview}
                alt="Profile Preview"
                className="w-32 h-32 rounded-full object-cover mb-2"
              />
              <button
                type="button"
                onClick={handleImageRemove}
                className="text-red-500 hover:text-red-700 transition"
              >
                Remove Image
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-600 transition"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}
