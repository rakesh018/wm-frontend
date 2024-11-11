import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import pro from "../../../images/pro.png";
import "./admin.css";

export const AdminSidebar = () => {
  const navigate = useNavigate();
  const adminToken = localStorage.getItem("adminToken");
  if (!adminToken) {
    navigate("/adminLogin");
  }
  const [modalType, setModalType] = useState(null);

  const handleLogoutClick = () => {
    setModalType("logout"); // Show the logout confirmation modal
  };

  const handleModalClose = () => {
    setModalType(null); // Close any open modal
  };

  const handleConfirmLogout = () => {
    navigate("/adminLogin"); // Proceed with logout
    localStorage.removeItem("adminToken");
    setModalType(null); // Close the modal
  };
  return (
    <div>
      <div className="">
        <div className="sidebar-box mt-4  d-none d-lg-block">
          <div className="content-wrapper ">
            <div className="me-1 text-center">
              <div className=" mt-2">
                <img className="pro" src={pro} alt="" />
              </div>
              <div className=" mt-2">
                <span className="userP-text">ADMIN NAME</span>
              </div>

              <div className="proBox mt-4 p-2">
                <div>
                  <button
                    className="home-btn"
                    onClick={() => navigate("/adminHome")}
                  >
                    VIEW ALL USERS
                  </button>
                </div>
                <hr className="line m-2" />
                <div>
                  <button
                    className="history-btn"
                    onClick={() => navigate("/adminDeposit")}
                  >
                    DEPOSIT
                  </button>
                </div>
                <hr className="line m-2" />
                <div>
                  <button
                    className="history-btn"
                    onClick={() => navigate("/adminWithdraw")}
                  >
                    {" "}
                    WITHDRAW
                  </button>
                </div>
                <hr className="line m-2" />
                <div>
                  <button
                    className="leader-btn"
                    onClick={() => navigate("/transactionalAnalysis")}
                  >
                    TRANSACTION ANALYTICS
                  </button>
                </div>
                <hr className="line m-2" />
                <div>
                  <button
                    className="wallet-btn"
                    onClick={() => navigate("/chooseWinningTeam")}
                  >
                    GAMES
                  </button>
                </div>
                <hr className="line m-2" />
                <div>
                  <button
                    className="wallet-btn"
                    onClick={() => navigate("/demohome")}
                  >
                    {" "}
                    DEMO/AGENT ACCOUNT
                  </button>
                </div>
                <hr className="line m-2" />
                
                <div>
                  <button
                    className="wallet-btn"
                    onClick={() => navigate("/adminnotice")}>
                    NOTICES
                  </button>
                </div>
                <hr className="line m-2" />
                
                <div>
                  <button
                    className="wallet-btn"
                    onClick={() => navigate("/adminUPI")}
                  >
                    UPI ID
                  </button>
                </div>
                <hr className="line m-2" />
                <div>
                  <button
                    className="wallet-btn"
                    onClick={() => navigate("/adminchat")}
                  >
                    SUPPORT
                  </button>
                </div>
                <hr className="line m-2" />
                <div>
                  <button
                    className="wallet-btn"
                    onClick={() => navigate("/adminpasschange")}
                  >
                  PASSWORD CHANGE
                  </button>
                </div>
              </div>
              <div className="mt-4 ms-3">
                <button className="admin-logout" onClick={handleLogoutClick}>
                  LOGOUT
                </button>
              </div>
            </div>
          </div>
        </div>
        {modalType === "logout" && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Are you sure you want to log out?</h2>
              <div className="d-flex flex-row justify-content-center">
                <button className="modal-btn yes" onClick={handleConfirmLogout}>
                  Yes
                </button>
                <button className="modal-btn no" onClick={handleModalClose}>
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
