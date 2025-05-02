import React from "react";

const Comments = () => {
  return (
    <div>
      {/* wirte */}
      <div className="flex items-center gap-4">
        <img
          src="https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
          width={32}
          height={32}
          className="w-8 h-8 rounded-full"
        />
        <div className="flex flex-1 items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full ">
          <input
            type="text"
            placeholder="Write A Comment..."
            className="bg-transparent outline-none flex-1"
          />
          <img
            src="/emoji.png"
            alt=""
            width={16}
            height={16}
            className="cursor-pointer"
          />
        </div>
      </div>
      {/* Comments */}
      <div className="">
        {/* Comment */}

        <div className="flex gap-4 justify-between mt-6">
          {/* avatar */}
          <div className="">
            <img
              src="https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
          </div>
          {/* desc */}
          <div className="flex flex-col gap-2 flex-1">
            <span className="font-medium">amoree</span>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam
              similique molestias ipsa aliquam vel, vero omnis, sint provident
              incidunt ea praesentium nostrum beatae voluptates sapiente
              doloribus officia! Perspiciatis, dolore vitae?
            </p>
            {/* <div className="flex items-center gap-8 text-xs text-gray-500 mt-2">
              <div className="flex items-center gap-4">
                <img
                  src="/like.png"
                  alt=""
                  width={12}
                  height={12}
                  className="cursor-pointer w-4 h-4"
                />
                <span className="text-gray-300">|</span>
                <span className="text-gray-300">44 Likes</span>
              </div>
              <div className="">Reply</div>
            </div> */}
          </div>
          {/* icon */}
          <img
            src="/more.png"
            alt=""
            width={15}
            height={15}
            className="cursor-pointer w-4 h-4"
          />
        </div>
      </div>
    </div>
  );
};

export default Comments;
