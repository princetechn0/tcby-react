import { Outlet } from "react-router-dom";
import CustomNavbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = ({ loggedInUser }) => {
  return (
    <>
      <CustomNavbar loggedInUser={loggedInUser} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
