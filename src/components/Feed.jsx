import { useEffect, useState, useRef } from "react";
import Post from "./Post";
import { useMainAxios } from "../hooks/useMainAxios";
import { useMainContext } from "../hooks/useMainContext";

const Feed = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useMainContext();
  const axios = useMainAxios();
  const [userInfo, setUserInfo] = useState(null);
  const fileInputRef = useRef(null);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [newBio, setNewBio] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userId) {
        try {
          const response = await axios.get(`/api/Users/GetById/${userId}`);
          setUserInfo(response.data);
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
    };

    fetchUserInfo();
  }, [userId, axios]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const endpoint = userId
          ? `/api/profile/${userId}`
          : "/api/Home/GetAllPosts";

        const response = await axios.get(endpoint);

        if (response.data) {
          setPosts(response.data);
        } else {
          setError("لم يتم العثور على أي منشورات");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(error.response?.data?.message || "No posts available");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchPosts();
    } else {
      setError("يرجى تسجيل الدخول لعرض المنشورات");
    }
  }, [userId, token, axios]);

  const handleImageClick = () => {
    if (userId === userInfo?.id) {
      fileInputRef.current.click();
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("img", file);

    try {
      const response = await axios.post("/api/users/upload-avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data) {
        setUserInfo({
          ...userInfo,
          img: response.data.img,
        });
        window.location.reload();
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleBioEdit = () => {
    setIsEditingBio(true);
    setNewBio(userInfo?.bio || "");
  };

  const handleBioSave = async () => {
    try {
      const response = await axios.put("/api/Users/UpdateBio", { bio: newBio });
      if (response.data) {
        setUserInfo({
          ...userInfo,
          bio: newBio,
        });
        setIsEditingBio(false);
      }
    } catch (error) {
      console.error("Error updating bio:", error);
      setError("There was an error updating the bio");
    }
  };

  if (loading) {
    return (
      <div className="bg-white shadow-md rounded-lg flex flex-col gap-12 justify-between text-sm">
        <div className="text-center text-gray-500 p-4">No posts available</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-500 bg-red-50 rounded-lg">
        {error}
      </div>
    );
  }

  // Handle image error for avatar
  const avatarUrl = userInfo?.img
    ? `https://server-test-green.vercel.app${userInfo.img}`
    : "/noAvatar.png";

  return (
    <div className="flex flex-col gap-6">
      {userInfo && (
        <div className="p-4 bg-white shadow-md rounded-lg">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={avatarUrl}
                alt={userInfo.username}
                className={`w-20 h-20 rounded-full object-cover ${
                  userId === userInfo?.id
                    ? "cursor-pointer hover:opacity-80"
                    : ""
                }`}
                onClick={handleImageClick}
                onError={(e) => (e.target.src = "/noAvatar.png")}
              />
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{userInfo.username}</h2>
              {userId === userInfo?.id ? (
                <div className="mt-2">
                  {isEditingBio ? (
                    <div className="flex flex-col gap-2">
                      <textarea
                        value={newBio}
                        onChange={(e) => setNewBio(e.target.value)}
                        className="w-full p-2 border rounded-lg resize-none"
                        rows="1"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleBioSave}
                          className="px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                          save
                        </button>
                        <button
                          onClick={() => setIsEditingBio(false)}
                          className="px-4 py-1 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                        >
                          close
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <p className="text-gray-600">{userInfo.bio}</p>
                      <button
                        onClick={handleBioEdit}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        Update Bio
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                userInfo.bio && <p className="text-gray-600">{userInfo.bio}</p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg flex flex-col gap-12 justify-between text-sm">
        {posts.length > 0 ? (
          posts.map((post) => <Post key={post.id} post={post} />)
        ) : (
          <div className="text-center text-gray-500 p-4">
            No posts available
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
