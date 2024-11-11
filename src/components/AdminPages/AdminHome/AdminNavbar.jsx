import React, { useState, useEffect, useRef } from "react";
import logo from "../../../images/logo.jpeg";
import round from "../../../images/roundimage.png";
import question from "../../../images/questionMark.png";
import search from "../../../images/searchImage.png";
import { Link } from "react-router-dom"; // Import Link for navigation
import { useNavigate } from "react-router-dom";
import { HiBars3 } from "react-icons/hi2";

export const AdminNavbar = () => {
  const navigate = useNavigate();
  const adminToken = localStorage.getItem("adminToken");

  // Redirect to login if no admin token
  if (!adminToken) {
    navigate("/adminLogin");
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility
  const menuRef = useRef(null); // Ref for the mobile menu

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/adminLogin");
  };

  useEffect(() => {
    // Attach event listener to handle clicks outside the menu
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="mainAdminHomeBox">
      <div className="container-fluid top-nav ">
        <div className="row align-items-center">
          <div className="col-6 d-flex justify-content-start">
            <div className="top-left d-flex justify-content-evenly d-sm-block">
              <div className="icon d-block d-md-none">
                <span
                  className="material-symbols-outlined m-4"
                  onClick={toggleMenu}
                >
                <HiBars3/>
                </span>
              </div>
              <div>
                <img className="logo1 m-2" src={logo} alt="Logo" />
              </div>
            </div>
          </div>

          <div className="col-6 d-flex justify-content-end ">
            <div className="top-right d-flex justify-content-evenly">
              <div className="group d-flex justify-content-evenly">
                <div className="d-none d-md-block">
                  <img
                    className="questionMark m-2"
                    src={question}
                    alt="Question Mark"
                  />
                </div>
                <div className="d-none d-md-block">
                  <img className="roundImg m-2" src={round} alt="Round Image" />
                </div>
                <div>
                  <button className="wallet m-3">WALLET BALANCE:0</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div ref={menuRef} className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/adminHome" onClick={() => setIsMenuOpen(false)}>
              VIEW ALL USERS
            </Link>
          </li>
          <li>
            <Link to="/adminDeposit" onClick={() => setIsMenuOpen(false)}>
              DEPOSIT
            </Link>
          </li>
          <li>
            <Link to="/adminWithdraw" onClick={() => setIsMenuOpen(false)}>
              WITHDRAW
            </Link>
          </li>
          <li>
            <Link
              to="/transactionalAnalysis"
              onClick={() => setIsMenuOpen(false)}
            >
              TRANSACTION ANALYTICS
            </Link>
          </li>
          <li>
            <Link to="/chooseWinningTeam" onClick={() => setIsMenuOpen(false)}>
              GAMES
            </Link>
          </li>
          <li>
            <Link to="/demohome" onClick={() => setIsMenuOpen(false)}>
              DEMO/AGENT ACCOUNT
            </Link>
          </li>
          <li>
            <Link to="/adminUPI" onClick={() => setIsMenuOpen(false)}>
              UPI ID
            </Link>
          </li>
          <li>
            <Link to="/adminnotice" onClick={() => setIsMenuOpen(false)}>
              NOTICES
            </Link>
          </li>
          <li>
            <Link to="/adminchat" onClick={() => setIsMenuOpen(false)}>
              SUPPORT
            </Link>
          </li>
          <li>
            <Link to="/adminpasschange" onClick={() => setIsMenuOpen(false)}>
              PASSWORD CHANGE
            </Link>
          </li>
          {/* Add Logout Option */}
          <li>
            <button onClick={handleLogout} className="logout-btn">
              LOGOUT
            </button>
          </li>
        </ul>
      </div>

      <div className="container-fluid admin">
        <div className="innerBox">
          <div className="text-center p-2">
            <h1>ADMIN PANEL</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
