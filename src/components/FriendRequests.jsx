import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useMainAxios } from "../hooks/useMainAxios";
import { useMainContext } from "../hooks/useMainContext";

const FriendRequests = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const { token } = useMainContext();
  const axios = useMainAxios();

  const fetchPendingRequests = useCallback(async () => {
    try {
      const res = await axios.get("/api/followerRequest/pending-requests", {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      setPendingRequests(res.data);
    } catch (err) {
      console.error("خطأ في جلب الطلبات المعلقة:", err.message);
    }
  }, [axios, token]);

  const handleAccept = async (requestId) => {
    try {
      await axios.post(
        `/api/followerRequest/accept`,
        { requestId },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      setPendingRequests((prev) =>
        prev.filter((request) => request.id !== requestId)
      );
    } catch (err) {
      console.error("خطأ في قبول الطلب:", err.message);
    }
  };

  const handleReject = async (requestId) => {
    try {
      await axios.post(
        `/api/followerRequest/reject`,
        { requestId },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      setPendingRequests((prev) =>
        prev.filter((request) => request.id !== requestId)
      );
    } catch (err) {
      console.error("خطأ في رفض الطلب:", err.message);
    }
  };

  useEffect(() => {
    fetchPendingRequests();
  }, [fetchPendingRequests]);

  const getImageUrl = (img) => {
    if (!img) return "/noAvatar.png";
    if (img.startsWith("http")) return img;
    return `https://server-test-green.vercel.app${img}`;
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-xs flex flex-col gap-4">
      {/* الترويسة */}
      <div className="flex items-center justify-between font-medium">
        <span className="text-gray-500">Friend requests</span>
        {pendingRequests.length > 0 && (
          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
            {pendingRequests.length}
          </span>
        )}
      </div>

      {/* الطلبات المعلقة */}
      {pendingRequests.length === 0 ? (
        <div className="text-center text-gray-500 py-4">No friend requests</div>
      ) : (
        pendingRequests.map((request) => (
          <div
            key={request.id}
            className="flex items-center justify-between border-b pb-2 mb-2"
          >
            <div className="flex items-center gap-4">
              <Link to={`/profile/${request.seneder?.id}`}>
                <img
                  src={getImageUrl(request.seneder?.img)}
                  alt={request.seneder?.username}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </Link>
              <div className="flex flex-col">
                <Link
                  to={`/profile/${request.seneder?.id}`}
                  className="font-semibold text-sm hover:underline"
                >
                  {request.seneder?.firstName} {request.seneder?.lastName}
                </Link>
                <span className="text-gray-500 text-xs">
                  @{request.seneder?.username}
                </span>
                <span className="text-gray-400 text-xs">
                  {new Date(request.createdAt).toLocaleDateString("EG")}
                </span>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => handleAccept(request.id)}
                className=" text-white p-1.5 rounded-full text-xs bg-gray-300"
              >
                <img src="/accept.png" alt="" width={20} height={20} />
              </button>
              <button
                onClick={() => handleReject(request.id)}
                className="text-white bg-red-200 p-1.5 rounded-full text-xs "
              >
                <img src="/reject.png" alt="" width={20} height={20} />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FriendRequests;
