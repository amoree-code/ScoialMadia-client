import React from "react";
import PorfileCard from "./PorfileCard";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import Ad from "./Ad";
import { useMainContext } from "../hooks/useMainContext";

const LeftMenu = () => {
  const { userId, token } = useMainContext();
  return (
    <div className="flex flex-col gap-6">
      <div className="p-4 bg-white rounded-lg shadow-md text-xs text-gray-500 flex flex-col gap-2">
        <Link
          to={token ? `/profile/${userId}` : "/login"}
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100 duration-200"
        >
          <User width={20} height={20} />
          <span>{token ? "MyProfile" : "Login"}</span>
        </Link>
        <hr className="border-t-1 border-gray-100  w-3/6 self-center" />
      </div>
      <Ad size="sm" />
    </div>
  );
};

export default LeftMenu;
