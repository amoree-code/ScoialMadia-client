import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="">
      <section className="w-full bg-white px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <Navbar />
      </section>
      <section className="bg-stone-100 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <Outlet />
      </section>
    </div>
  );
};

export default MainLayout;
