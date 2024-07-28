import { Outlet } from "react-router-dom";
import Banner from "../ui/Banner";
import Footer from "../ui/Footer";
import Navbar from "../ui/Navbar";

const MainLayout = () => {
  return (
    <div className="max-w-8xl mx-auto">
      <Banner />
      <Navbar />
      <div className="max-w-7xl mx-auto min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
