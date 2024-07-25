import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar";

const MainLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
