const Ad = ({ size }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-xs flex flex-col gap-4">
      <div
        className={`flex flex-col mt-4 ${size === "sm" ? "gap-2" : "gap-4"}`}
      >
        <div
          className={`relative w-full ${
            size === "sm" ? "h-32" : size === "md" ? "h-36" : "h-48"
          }`}
        >
          <img
            src="https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            className="rounded-lg h-32 w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Ad;
