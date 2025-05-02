import { Link } from "react-router-dom";
import React, { useState } from "react";

export const MobileMenu = () => {
  const [isOpen, setisOpen] = useState(false);

  return (
    <div className="md:hidden">
      <div
        className="flex flex-col gap-[4.5px] cursor-pointer"
        onClick={() => setisOpen((prev) => !prev)}
      >
        <div
          className={`w-6 h-1 bg-blue-500 rounded-sm  ${
            isOpen ? "rotate-45" : ""
          } origin-left ease-in-out duration-500 `}
        />
        <div
          className={`w-6 h-1 bg-blue-500 rounded-sm ${
            isOpen ? "opacity-0" : ""
          } ease-in-out duration-500 `}
        />
        <div
          className={`w-6 h-1 bg-blue-500 rounded-sm ${
            isOpen ? "-rotate-45" : ""
          } origin-left ease-in-out duration-500 `}
        />
      </div>
      {isOpen && (
        <div
          className="absolute left-0 top-24 w-full h-[calc(100vh-96px)] bg-white flex flex-col items-center justify-center gap-8 font-medium text-xl z-10 "
          onClick={() => setisOpen((prev) => !prev)}
        >
          <Link to="/">Home</Link>
          <Link to="/friends">Friends</Link>
        </div>
      )}
    </div>
  );
};
