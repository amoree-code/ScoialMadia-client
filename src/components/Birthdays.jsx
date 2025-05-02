import { Link } from "react-router-dom";

const Birthdays = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-xs flex flex-col gap-4">
      {/* top */}
      <div className="flex items-center justify-between font-medium ">
        <span className="text-gray-500">Birthdays</span>
      </div>
      {/* user */}

      {/* up commenc */}
      <div className="p-4 bg-slate-100 rounded-lg flex items-center gap-4">
        <img src="/gift.png" alt="" width={24} height={24} />
        <Link to="/" className="flex flex-col hue-rotate-15 text-xs">
          <span className="text-gray-800 font-semibold">
            Upcoming Birthdays
          </span>
          <span className="text-gray-500">
            See others 16 have upcoming Birthdays
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Birthdays;
