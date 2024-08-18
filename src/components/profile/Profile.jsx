import React, { useState } from 'react';
import { Navbar } from '../../Navbar';
import { Sidebar } from '../../Sidebar';
import { BetSlip } from '../../BetSlip';
import { useNavigate } from 'react-router-dom';
import './profile.css';
import { profileAtom } from '../../atoms';
import { useRecoilValue } from 'recoil';
import { toast } from 'react-toastify';

export const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const profile = useRecoilValue(profileAtom);
  const navigate = useNavigate();

  // Retrieve token from local storage
  const token = localStorage.getItem("token");

  const handleChangePassword = () => {
    setIsModalOpen(true);
  };

  const handleSavePassword = async () => {
    if (!token) {
      alert("No authentication token found.");
      return;
    }

    try {
      const response = await fetch("https://server.trademax1.com/auth/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword: oldPassword,
          newPassword: newPassword,
        }),
      });

      if (response.ok) {
        console.log("Password changed successfully");
        toast.success("Password changed successfully!");
        setIsModalOpen(false);
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.message || "Failed to change password");
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

  return (
    <div>
      <Navbar />

      <div className="container settingsBox mt-2 col-12">
        <button className='settingsBtn'>
          PROFILE
        </button>

        <div className='SettingsInnerBox mt-2 d-flex justify-content-center align-items-center'>
          <div className='d-flex flex-column align-items-center'>
            <div className="name">
              <div>
                <input
                  type="text"
                  className='setting-input m-2'
                  value={`EMAIL: ${profile?.email || ''}`}
                  readOnly
                />
              </div>
              <div>
                <input
                  type="text"
                  className='setting-input m-2'
                  value={`PHONE NUMBER: ${profile?.phone || ''}`}
                  readOnly
                />
              </div>
            </div>

            <div>
              <button
                type="button"
                className="edit-btn mt-2"
                onClick={handleChangePassword}
              >
                CHANGE THE PASSWORD
              </button>

              {isModalOpen && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                  <div className="edit-modal">
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
                      <button onClick={handleSavePassword} className='edit-save-btn m-2'>Save</button>
                      <button onClick={() => setIsModalOpen(false)} className='edit-cancel-btn'>Cancel</button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <input
                type="text"
                className='uid mt-2'
                value={`UID: ${profile?.uid || ''}`}
                readOnly
              />
            </div>

            <div className='text-center mt-2'>
              <button id="blinking-button">REFER AND EARN</button>
              <h3><span>{profile.referralCode}</span></h3>
            </div>
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
