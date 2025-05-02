import React, { useRef, useState } from "react";
import { useMainContext } from "../hooks/useMainContext";
import { useNavigate } from "react-router-dom";
import { useMainAxios } from "../hooks/useMainAxios";

const Stories = () => {
  const [stories, setStories] = useState(null);
  const fileInputRef = useRef(null);
  const axios = useMainAxios();
  const navigate = useNavigate();
  const { user } = useMainContext();

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("تم اختيار الملف:", file);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md overflow-scroll text-xs scroll-bar">
      <div className="flex gap-8 w-max">
        {/* story */}
        <div className="flex flex-col items-center gap-2 cursor-pointer">
          <img
            src="https://images.pexels.com/photos/884788/pexels-photo-884788.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            width={80}
            height={80}
            className="w-20 h-20 rounded-full ring-2"
            onClick={handleImageClick}
          />
          <span className="font-medium">Ricky</span>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Stories;
