import LeftMenu from "../components/LeftMenu";
import AddPost from "../components/AddPost";
import Feed from "../components/Feed";
import RightMenu from "../components/RightMenu";

const Home = () => {
  return (
    <div className="flex gap-6 py-6">
      {/* Left Menu ثابت (Sticky) */}
      <div className="hidden xl:block w-[20%]">
        <div className="sticky top-6">
          <LeftMenu type="home" />
        </div>
      </div>

      {/* Center Area (Stories, AddPost, Feed) */}
      <div className="w-full lg:w-[70%] xl:lg:w-[50%] flex flex-col gap-6">
        {/* <Stories /> */}
        <AddPost />
        <Feed userId={null} />
      </div>

      {/* Right Menu ثابت (Sticky) */}
      <div className="hidden lg:block lg:w-[30%]">
        <div className="sticky top-6">
          <RightMenu />
        </div>
      </div>
    </div>
  );
};

export default Home;
