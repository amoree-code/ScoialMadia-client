const Post = ({ post }) => {
  if (!post || !post.user) {
    return null;
  }

  const handleImageError = (e) => {
    e.target.style.display = "none";
  };

  const avatarUrl = post.user?.img
    ? `https://server-test-production-5225.up.railway.app${post.user.img}`
    : "/noAvatar.png";

  const postImageUrl = post.img
    ? `https://server-test-production-5225.up.railway.app${post.img}`
    : null;

  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={avatarUrl}
            alt={post.user.username || "User"}
            width={40}
            height={40}
            className="w-10 h-10 object-cover rounded-full"
            onError={(e) => (e.target.src = "/noAvatar.png")}
          />
          <span className="font-medium">{post.user.username}</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {post.desc && <p>{post.desc}</p>}
        {postImageUrl && (
          <img
            src={postImageUrl}
            alt="Post content"
            className="object-cover w-full max-h-[500px] rounded-md"
            onError={handleImageError}
          />
        )}
      </div>
    </div>
  );
};

export default Post;
