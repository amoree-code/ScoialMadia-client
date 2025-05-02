const UserInfoCard = ({ userId, userinfo }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-xs flex flex-col gap-4">
      {/* top */}
      <div className="flex items-center justify-between font-medium ">
        <span className="text-gray-500">User Information</span>
      </div>

      {/* button */}
      <div className="flex flex-col gap-4 text-gray-500">
        <div className="flex items-center gap-2">
          <span className="text-xl text-black">
            {userinfo.firstName} {userinfo.lastName}
          </span>
          <span className="text-xs"> @{userinfo.username}</span>
        </div>
        {/* <p>{userinfo.bio}</p> */}
      </div>
    </div>
  );
};

export default UserInfoCard;
