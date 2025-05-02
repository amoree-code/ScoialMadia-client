import LeftMenu from "../components/LeftMenu";
import Feed from "../components/Feed";
import RightMenu from "../components/RightMenu";

import { useState, useEffect } from "react";
import { useMainAxios } from "../hooks/useMainAxios";
import { useMainContext } from "../hooks/useMainContext";
import { useParams } from "react-router-dom";

const Profile = () => {
  const axios = useMainAxios();
  const { token } = useMainContext();
  const [userinfo, setUserInfo] = useState({});
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (!id) return;
        setError("");
        const response = await axios.get(`/api/Users/GetById/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data) {
          setUserInfo(response.data);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        setError("حدث خطأ في تحميل المحتويات");
      }
    };

    fetchUserInfo();
  }, [id, axios, token]);

  if (error) {
    return <div className="text-center text-red-500 mt-4">{error}</div>;
  }

  return (
    <div className="flex gap-6 py-6">
      <div className="hidden xl:block w-[20%]">
        <div className="sticky top-6">
          <LeftMenu />
        </div>
      </div>

      <div className="w-full lg:w-[70%] xl:lg:w-[50%] flex flex-col gap-6">
        <Feed userId={id} />
      </div>

      <div className="hidden lg:block lg:w-[30%]">
        <div className="sticky top-6">
          <RightMenu userId={id} userinfo={userinfo} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
