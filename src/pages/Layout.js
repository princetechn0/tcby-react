import { Outlet } from "react-router-dom";
import CustomNavbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";

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
