import { Outlet, Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import "./Layout.css";

const Layout = () => {
  const { user } = UserAuth();
  return (
    <>
      <div className="header">
        <h1>Funny React Project</h1>
      </div>
      <nav className="navbar">
        <ul className="navbar-elements">
          <li className="home-container">
            <Link to="/Home" className="home-link">
              Home
            </Link>
          </li>
          <li className="user-page-container">
            <Link to="/User" className="user-page-link">
              View Selected User Page
            </Link>
          </li>
          <li className="select-user-container">
            <Link to="/SelectUser" className="select-user-link">
              Select Public User
            </Link>
          </li>
          <li className="sign-in-container">
            {user?.displayName ? (
              <Link to="/Account" className="account-link">
                Account
              </Link>
            ) : (
              <Link to="/SignIn" className="signin-link">
                Sign In
              </Link>
            )}
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
