import React, { useState, useEffect } from "react";
import { Navbar } from "../../Navbar";
import { Sidebar } from "../../Sidebar";
import { BetSlip } from "../../BetSlip";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import { profileAtom } from "../../atoms";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { alertToast } from "../../alertToast";
import Base_Url from "../../config";

export const Profile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [referrals, setReferrals] = useState(""); // State for referrals
  const profile = useRecoilValue(profileAtom);
  const [showCopyNotification, setShowCopyNotification] = useState(false);

  useEffect(() => {
    // Fetch referrals from backend
    const fetchReferrals = async () => {
      try {
        const response = await fetch( `${Base_Url}/profile/referral-count`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setReferrals(data.referralCount || 0);
        } else {
          throw new Error("Failed to fetch referrals");
        }
      } catch (error) {
        toast.error("Failed to fetch referrals.",'error');
      }
    };

    fetchReferrals();
  }, []);

  const handleChangePassword = () => {
    setIsModalOpen(true);
  };

  const handleSavePassword = async () => {
    if (!token) {
      alert("No authentication token found.");
      return;
    }

    try {
      const response = await fetch(
         `${Base_Url}/auth/change-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            oldPassword: oldPassword,
            newPassword: newPassword,
          }),
        }
      );
      if (response.status === 403) {
        navigate("/login");
      }
      if (response.ok) {
        console.log("Password changed successfully");
        toast.success("Password changed successfully!");
        setIsModalOpen(false);
      } else {
        const errorData = await response.json();
        console.error(
          "Error:",
          errorData.message || "Failed to change password"
        );
        toast.error(errorData.message || "Failed to change password");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while changing the password.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logged out successfully!");
  };

  function handleCopyReferralLink() {
    const text =  `${Base_Url}/register?referral=${profile.referralCode}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          alertToast("Text copied to clipboard!", "success");
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
          fallbackCopyText(text);
        });
    } else {
      fallbackCopyText(text); // Fallback for unsupported browsers
    }
  }

  function fallbackCopyText(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
      const successful = document.execCommand("copy");
      const msg = successful
        ? "Text copied to clipboard!"
        : "Failed to copy text";
      alertToast("Link copied to clipboard", "success");
    } catch (err) {
      console.error("Fallback: Failed to copy text", err);
    }

    document.body.removeChild(textarea);
  }

  const handleHelp = () => {
    // Define what the help button should do, e.g., navigate to help page or open modal
    navigate("/help"); // Example of navigating to a help page
  };

  return (
    <div>
      <Navbar />

      <div className="container settingsBox mt-2 col-12">
        <button className="settingsPfBtn">PROFILE</button>

        <div className="SettingsInnerBox mt-2 d-flex justify-content-center align-items-center">
          <div className="d-flex flex-column align-items-center">
            <div className="name">
              <div>
                <input
                  type="text"
                  className="setting-input m-2"
                  value={`EMAIL: ${profile?.email || ""}`}
                  readOnly
                />
              </div>
              <div>
                <input
                  type="text"
                  className="setting-input m-2"
                  value={`PHONE NUMBER: ${profile?.phone || ""}`}
                  readOnly
                />
              </div>
              <div>
                <input
                  type="text"
                  className="setting-input m-2"
                  value={`REFERRALS: ${referrals || "0"}`}
                  readOnly
                />
              </div>
            </div>
            <div>
              <input
                type="text"
                className="uid mt-2"
                value={`UID: ${profile?.uid || ""}`}
                readOnly
              />
            </div>
            <div>
              <button
                type="button"
                className="button-standard"
                onClick={handleChangePassword}
              >
                CHANGE PASSWORD
              </button>

              {isModalOpen && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                  <div
                    className="edit-modal"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="modal-content">
                      <h3>Change Password</h3>
                      <div>
                        <label>Old Password:</label>
                        <input
                          type="password"
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                        />
                      </div>
                      <div>
                        <label>New Password:</label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                      <button
                        onClick={handleSavePassword}
                        className="edit-save-btn m-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCloseModal}
                        className="edit-cancel-btn"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <button
                type="button"
                className="button-standard"
                onClick={handleCopyReferralLink}
              >
                COPY REFERRAL LINK
              </button>
              {showCopyNotification && (
                <div className="copy-notification">Referral link copied!</div>
              )}
            </div>

            {/* Help Button */}
            <div className="mt-2">
              <button className="button-standard" onClick={handleHelp}>
                HELP
              </button>
            </div>

            {/* Logout Button */}
            <div className="mt-4">
              <button
                className="logout-btn"
                onClick={() => setLogoutModalOpen(true)}
              >
                LOGOUT
              </button>
            </div>

            {/* Logout Modal */}
            {logoutModalOpen && (
              <div
                className="modal-overlay"
                onClick={() => setLogoutModalOpen(false)}
              >
                <div
                  className="edit-modal"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="modal-content">
                    <h3>Confirm Logout</h3>
                    <p>Are you sure you want to logout?</p>
                    <button
                      onClick={handleLogout}
                      className="edit-save-btn m-2"
                    >
                      Logout
                    </button>
                    <button
                      onClick={() => setLogoutModalOpen(false)}
                      className="edit-cancel-btn"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Sidebar />
      <div className="d-none d-lg-block">
        <BetSlip />
      </div>
    </div>
  );
};
