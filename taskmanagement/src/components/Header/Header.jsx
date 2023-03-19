import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUserFromStorage = localStorage.getItem("user");
    setUser(getUserFromStorage);
  }, []);
  const handleLogout = () => {
    console.log("working ");
    localStorage.clear();
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* <a className="navbar-brand" href="#"> */}
        TASK MANAGER
        {/* </a> */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
                <span className="visually-hidden">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            {user && (
              <li className="nav-item">
                <a className="nav-link" onClick={handleLogout}>
                  Logout
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
