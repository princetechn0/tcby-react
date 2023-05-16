import { Outlet } from "react-router-dom";
import CustomNavbar from "../components/Navbar";

const Layout = ({ loggedInUser }) => {
  return (
    <>
      <CustomNavbar loggedInUser={loggedInUser} />
      <Outlet />
    </>
  );
};

export default Layout;
