import { Link } from "react-router-dom";
import { MobileMenu } from "./MobileMenu";
import { useMainContext } from "../hooks/useMainContext";
import { CircleUser, LogOut } from "lucide-react";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useEffect } from "react";
const Navbar = () => {
  const { token, loading, setLoading, userId } = useMainContext();
  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    window.location.reload();
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [token, setLoading]);

  return (
    <div className="h-24 flex items-center justify-between">
      {/* left */}
      <div className="md:hidden lg:block w-[20%]">
        <Link to="/" className="font-bold text-xl text-blue-600">
          SOCIALMADIA
        </Link>
      </div>

      {/* center */}
      <div className="hidden md:flex w-[50%] text-sm items-center justify-between gap-4 ">
        <div className="flex gap-6 text-gray-600">
          <Link to="/" className="flex gap-2 items-center">
            <img
              src="/home.png"
              alt=""
              width={16}
              height={16}
              className="object-contain"
            />
            <span>Homepage</span>
          </Link>

          <Link to="/friends" className="flex gap-2 items-center">
            <img
              src="/friends.png"
              alt=""
              width={16}
              height={16}
              className="object-contain"
            />
            <span>Friends</span>
          </Link>
        </div>
      </div>

      {/* right */}
      <div className="w-[30%] flex items-center gap-6 justify-end">
        {token ? (
          loading ? (
            <div className="flex justify-center items-center min-h-screen">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center justify-center gap-1.5 text-sm">
                <LogOut
                  width={16}
                  height={16}
                  className="cursor-pointer rounded-full text-blue-400"
                />

                <span className="cursor-pointer" onClick={handleLogout}>
                  Logout
                </span>
              </div>
              <div className="flex items-center justify-center gap-1.5 text-sm">
                <CircleUser
                  width={16}
                  height={16}
                  className="cursor-pointer rounded-full text-blue-400"
                />
                <Link to={`/profile/${userId}`}>
                  <span className="cursor-pointer">Profile</span>
                </Link>
              </div>
            </div>
          )
        ) : loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2 text-xs">
            <img src="/login.png" alt="" width={20} height={20} />
            <Link to="/login">Login/Register</Link>
          </div>
        )}

        <MobileMenu />
      </div>
    </div>
  );
};

export default Navbar;
