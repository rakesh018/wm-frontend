import React, { useEffect } from "react";
import { useState } from "react";
import "./navbar.css";
import logo from "./images/logo.jpeg";
import question from "./images/bell.png";
import questionRedDot from "./images/bellwithdot.png"; // Import the bell with the red dot
import round from "./images/roundimage.png";
import image2 from "./images/image1.jpeg";
import image1 from "./images/image2.jpeg";
import image3 from "./images/image3.jpeg";
import image4 from "./images/image4.jpeg";
import { useRecoilState, useRecoilValue } from "recoil";
import logoutIcon from "./images/logoutIcon.png";
import { profileAtom } from "./atoms";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const profile = useRecoilValue(profileAtom);
  const [redDot,setRedDot]=useState(false);
  useEffect(() => {
    // Update the profile atom
    setRedDot(profile.redDot);
  }, []);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const [LogoutModal, setLogoutModal] = useState(null);

  const handleLogoutClick = () => {
    setLogoutModal("logout");
  };

  const handleModalClose = () => {
    setLogoutModal(null); // Close any open modal
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setLogoutModal(null);
  };

  return (
    <div>
      <div className="container-fluid top-nav">
        <div className="row align-items-center">
          <div className="col-6 d-flex justify-content-start">
            <div className="top-left d-flex justify-content-evenly d-sm-blok">
              <div className="icon d-lg-none" onClick={handleBackClick}>
                <span className="material-symbols-outlined m-4 no-select">
                  arrow_back_ios
                </span>
              </div>
              <div>
                <img
                  className="logo1 m-2"
                  src={logo}
                  alt="Logo"
                  onClick={() => navigate("/home")}
                />
              </div>
              <div className="d-none d-md-block">
                {/* <input className='text m-4' type="text" /> */}
              </div>
              <div className="icon">
                <div className="icon d-none d-md-block">
                  {/* <span className="material-symbols-outlined mt-4">search</span> */}
                </div>
                <img
                  className="questionMark mt-3 d-lg-none"
                  src={redDot ? questionRedDot : question} // Conditional icon
                  alt="Notification Icon"
                  onClick={() => navigate("/notification")}
                />
              </div>
            </div>
          </div>

          <div className="col-6 d-flex justify-content-end">
            <div className="top-right d-flex justify-content-evenly">
              <div className="group d-flex justify-content-evenly">
                <div className="d-none d-md-block">
                  <img
                    className="questionMark m-2"
                    src={redDot ? questionRedDot : question} // Conditional icon
                    alt="Notification Icon"
                    onClick={() => navigate("/notification")}
                  />
                </div>
                <div className="d-none d-md-block">
                  <img
                    className="roundImg m-2"
                    src={round}
                    alt="Round Image"
                    onClick={() => navigate("/profile")}
                  />
                </div>
                <div>
                  <button className="wallet m-4">
                    WALLET BALANCE: {profile.balance}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* slider */}
      <div className="client-slider col-sm-12">
        <div className="client-slide-track">
          <div className="client-slide">
            <img src={image1} height="100" width="250" alt="" />
          </div>
          <div className="client-slide">
            <img src={image2} height="100" width="250" alt="" />
          </div>
          <div className="client-slide">
            <img src={image3} height="100" width="250" alt="" />
          </div>
          <div className="client-slide">
            <img src={image4} height="100" width="250" alt="" />
          </div>
          <div className="client-slide">
            <img src={image1} height="100" width="250" alt="" />
          </div>
          <div className="client-slide">
            <img src={image2} height="100" width="250" alt="" />
          </div>
          <div className="client-slide">
            <img src={image3} height="100" width="250" alt="" />
          </div>
          <div className="client-slide">
            <img src={image4} height="100" width="250" alt="" />
          </div>
          <div className="client-slide">
            <img src={image1} height="100" width="250" alt="" />
          </div>
          <div className="client-slide">
            <img src={image2} height="100" width="250" alt="" />
          </div>
          <div className="client-slide">
            <img src={image3} height="100" width="250" alt="" />
          </div>
          <div className="client-slide">
            <img src={image4} height="100" width="250" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
