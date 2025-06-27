import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useMainContext } from "../hooks/useMainContext";
import { useMainAxios } from "../hooks/useMainAxios";

const Friends = () => {
  const axios = useMainAxios();
  const { token, userId } = useMainContext();
  const [users, setUsers] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [acceptedFriends, setAcceptedFriends] = useState([]);
  const [activeTab, setActiveTab] = useState("friends");

  const fetchAcceptedFriends = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`/api/Followers/allFollowers`, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      setAcceptedFriends(res.data);
    } catch (err) {
      console.log("Error fetching friends:", err.message);
    }
  }, [axios, token, userId]);

  const friendsSuggested = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`/api/Users/GetAllUsers`, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      const filteredUsers = res.data.filter(
        (user) =>
          user.id !== userId &&
          !acceptedFriends.some((friend) => friend.following.id === user.id)
      );
      setUsers(filteredUsers);
    } catch (err) {
      console.log("Error:", err.message);
    }
  }, [axios, token, userId, acceptedFriends]);

  const handleFollowRequest = async (targetUserId) => {
    try {
      const res = await axios.post(
        `/api/followerRequest/send`,
        { userId: targetUserId },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data.message);
      setSentRequests((prev) => [...prev, targetUserId]);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred.";
      alert(errorMessage);
      console.error("Error sending follow request:", err.message);
    }
  };

  useEffect(() => {
    fetchAcceptedFriends();
  }, [userId, fetchAcceptedFriends]);

  useEffect(() => {
    if (activeTab === "suggestions") {
      friendsSuggested();
    }
  }, [activeTab, acceptedFriends, friendsSuggested]);

  const getImageUrl = (img) => {
    console.log(img);
    if (!img) return "/noAvatar.png";
    return `https://server-test-green.vercel.app${img}`;
  };

  return (
    <section className="w-full py-6">
      {/* Navigation Tabs */}
      <div className="w-full flex items-center justify-center mb-6">
        <div className="bg-white rounded-lg shadow-md p-1">
          <button
            onClick={() => setActiveTab("friends")}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === "friends"
                ? "bg-blue-500 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Friends
          </button>
          <button
            onClick={() => setActiveTab("suggestions")}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === "suggestions"
                ? "bg-blue-500 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Suggestions
          </button>
        </div>
      </div>

      <article className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {activeTab === "friends" ? (
          acceptedFriends.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              No friends yet
            </div>
          ) : (
            acceptedFriends.map((friend) => (
              <div
                key={friend.following.id}
                className="w-full flex flex-col items-center bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-4"
              >
                <div className="overflow-hidden rounded-lg w-full h-48">
                  <img
                    src={getImageUrl(friend.following.img)}
                    alt={friend.following.username}
                    onError={(e) => {
                      e.target.src = "/noAvatar.png";
                    }}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="w-full mt-3 border-b flex items-center justify-between pb-2">
                  <span className="text-gray-700 font-semibold text-sm">
                    User Information
                  </span>
                  <Link
                    to={`/profile/${friend.following.id}`}
                    className="text-blue-600 text-sm font-medium"
                  >
                    See User
                  </Link>
                </div>

                <div className="w-full mt-3 flex items-center gap-4">
                  <span className="text-gray-700 font-semibold text-lg">
                    {friend.following.firstName} {friend.following.lastName}
                  </span>
                  <span className="text-gray-500 text-sm font-medium">
                    {friend.following.username}
                  </span>
                </div>

                <div className="w-full mt-3 flex flex-col items-center gap-4">
                  <span className="text-slate-400 font-normal text-sm text-center">
                    {friend.following.bio}
                  </span>
                </div>
              </div>
            ))
          )
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="w-full flex flex-col items-center bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-4"
            >
              <div className="overflow-hidden rounded-lg w-full h-48">
                <img
                  src={getImageUrl(user.img)}
                  alt={user.username}
                  onError={(e) => {
                    e.target.src = "/noAvatar.png";
                  }}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="w-full mt-3 border-b flex items-center justify-between pb-2">
                <span className="text-gray-700 font-semibold text-sm">
                  User Information
                </span>
                <Link
                  to={`/profile/${user.id}`}
                  className="text-blue-600 text-sm font-medium"
                >
                  See User
                </Link>
              </div>

              <div className="w-full mt-3 flex items-center gap-4">
                <span className="text-gray-700 font-semibold text-lg">
                  {user.firstName} {user.lastName}
                </span>
                <span className="text-gray-500 text-sm font-medium">
                  {user.username}
                </span>
              </div>

              <div className="w-full mt-3 flex flex-col items-center gap-4">
                <span className="text-slate-400 font-normal text-sm text-center">
                  {user.description}
                </span>
                <button
                  className={`w-full p-2.5 rounded-md duration-300 ${
                    sentRequests.includes(user.id)
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                  onClick={() => handleFollowRequest(user.id)}
                  disabled={sentRequests.includes(user.id)}
                >
                  {sentRequests.includes(user.id) ? "Request Sent" : "Follow"}
                </button>
              </div>
            </div>
          ))
        )}
      </article>
    </section>
  );
};

export default Friends;
