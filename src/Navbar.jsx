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
import { FaRegClipboard } from "react-icons/fa";

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
        <div className="row ">
          {/* <div className="col-12 "> */}
              <div className="col-12  d-flex justify-content-between align-items-center ">
              
                <img
                  className="logo1 m-2"
                  src={logo}
                  alt="Logo"
                  onClick={() => navigate("/home")}
                />
             

               <div className=" d-flex  align-items-center" >
               <FaRegClipboard className="notiece-board-icon notiece-small mr-1 mr-md-4"/>
               
               <div className="d-md-block mr-1 mr-md-4">
                 <img
                   className="questionMark m-2"
                   src={redDot ? questionRedDot : question} // Conditional icon
                   alt="Notification Icon"
                   onClick={() => navigate("/notification")}
                 />
               </div>
               
               <div className="d-none d-md-block mr-4">
                 <img
                   className="roundImg m-2"
                   src={round}
                   alt="Round Image"
                   onClick={() => navigate("/profile")}
                 />
               </div>

               <div className=" mr-1 mr-md-4">
                 <button className="wallet ">
                   WALLET BALANCE: {profile.balance}
                 </button>
               </div>
               </div>

              </div>
            </div>
        {/* </div> */}
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
