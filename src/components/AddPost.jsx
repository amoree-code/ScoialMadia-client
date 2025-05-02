import React, { useState, useRef } from "react";
import { useMainAxios } from "../hooks/useMainAxios";
import { useMainContext } from "../hooks/useMainContext";

const AddPost = () => {
  const [selectedImage, setSelectedImage] = useState(null); // State to store selected image
  const [postText, setPostText] = useState(""); // State to store post description
  const fileInputRef = useRef(null);
  const axios = useMainAxios();
  const { token } = useMainContext();

  // If there's no token, don't render anything
  if (!token) return null;

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleTextChange = (e) => {
    setPostText(e.target.value); // Update post text
  };

  const handlePostSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("desc", postText);

      if (fileInputRef.current.files[0]) {
        formData.append("img", fileInputRef.current.files[0]);
      }

      const response = await axios.post("/api/Home/CreatePost", formData, {
        headers: {
          token: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Post created:", response.data);
      setPostText("");
      setSelectedImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      window.location.reload();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm">
      {/* Post */}
      <div className="flex-1">
        {/* Text Input */}
        <form className="flex gap-4">
          <textarea
            placeholder="What's on your mind?"
            className="flex-1 bg-slate-100 rounded-lg p-2"
            value={postText}
            onChange={handleTextChange} // Handle text change
          ></textarea>
        </form>

        {selectedImage && (
          <div className="mt-4">
            <img
              src={selectedImage}
              alt="Selected"
              className="max-h-48 rounded-lg hidden"
            />
          </div>
        )}

        {/* Post Options */}
        <div className="flex justify-end items-center gap-4 mt-4 text-gray-400">
          <div
            className="flex items-end gap-2 cursor-pointer"
            onClick={handleFileSelect}
          >
            <img src="/addimage.png" alt="" width={20} height={20} />
            Photo
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
          <button
            className="p-2.5 bg-blue-500 text-white rounded-lg font-normal"
            onClick={handlePostSubmit}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
