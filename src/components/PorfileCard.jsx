import React from "react";

const PorfileCard = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-xs flex flex-col gap-6">
      <div className="h-20 w-full relative">
        <img
          src="https://images.pexels.com/photos/31260162/pexels-photo-31260162/free-photo-of-urban-street-scene-in-japanese-city-daylight.png?auto=compress&cs=tinysrgb&w=600&lazy=load"
          alt=""
          className=" rounded-md object-cover w-full h-24"
        />
      </div>
      <div className="h-20 flex flex-col gap-2 items-center">
        <span className="font-semibold">Ms. Katherine Romaguera</span>
        <div className="flex items-center gap-4">
          <div className="flex gap-1">
            <img
              src="https://images.pexels.com/photos/96715/pexels-photo-96715.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
              width={12}
              height={12}
              className=" rounded-full w-3 h-3s"
            />
            <img
              src="https://images.pexels.com/photos/96715/pexels-photo-96715.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
              width={12}
              height={12}
              className=" rounded-full w-3 h-3s"
            />
            <img
              src="https://images.pexels.com/photos/96715/pexels-photo-96715.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
              width={12}
              height={12}
              className=" rounded-full w-3 h-3s"
            />
          </div>
          <span className="text-xs text-gray-500">500 Followers</span>
        </div>
        <button className="bg-blue-500 text-white text-xs rounded-md p-2">
          My Profile
        </button>
      </div>
    </div>
  );
};

export default PorfileCard;
