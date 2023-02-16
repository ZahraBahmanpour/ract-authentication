import { Outlet, Link } from "react-router-dom";
import { NavLink } from "react-bootstrap";
import SideMenu from "../components/sideMenu/SideMenu";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../config/constants";
function Home() {
  const handleLogoutClick = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  };
  return (
    <div className="d-flex">
      <SideMenu />
      <Link to="/login">Log In</Link>
      <NavLink onClick={handleLogoutClick}>Log Out</NavLink>
      <Outlet />
    </div>
  );
}

export default Home;
