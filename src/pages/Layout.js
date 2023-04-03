import { Outlet } from "react-router-dom";
import CustomNavbar from "../components/Navbar";

const Layout = () => {
  return (
    <>
      <CustomNavbar />
      <Outlet />
    </>
  );
};

export default Layout;
