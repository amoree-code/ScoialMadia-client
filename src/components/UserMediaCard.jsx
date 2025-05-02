import { Link } from "react-router-dom";
import React from "react";

const UserMediaCard = ({ userId }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-xs flex flex-col gap-4">
      {/* top */}
      <div className="flex items-center justify-between font-medium">
        <span className="text-gray-500">User Media</span>
        <Link to="/" className="text-blue-500 text-xs">
          See All
        </Link>
      </div>
      {/* button */}
      <div className="flex gap-4 justify-between flex-wrap">
        <div className="relative w-1/5 h-20 ">
          <img
            src="https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            className="rounded-md object-cover"
          />
        </div>
        <div className="relative w-1/5 h-20 ">
          <img
            src="https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            className="rounded-md object-cover"
          />
        </div>
        <div className="relative w-1/5 h-20 ">
          <img
            src="https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            className="rounded-md object-cover"
          />
        </div>
        <div className="relative w-1/5 h-20 ">
          <img
            src="https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            className="rounded-md object-cover"
          />
        </div>
        <div className="relative w-1/5 h-20 ">
          <img
            src="https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            className="rounded-md object-cover"
          />
        </div>
        <div className="relative w-1/5 h-20 ">
          <img
            src="https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            className="rounded-md object-cover"
          />
        </div>
        <div className="relative w-1/5 h-20 ">
          <img
            src="https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            className="rounded-md object-cover"
          />
        </div>
        <div className="relative w-1/5 h-20 ">
          <img
            src="https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            className="rounded-md object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default UserMediaCard;
