import React, { useState } from "react";
import { AdminNavbar } from "../AdminHome/AdminNavbar";
import { AdminSidebar } from "../AdminHome/AdminSidebar";
import "./adminpass.css";
import { useNavigate } from "react-router-dom";
import Base_Url from "../../../config";
import { ToastContainer, toast } from "react-toastify";
import { alertToast } from "../../../alertToast";

export const AdminPassChange = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [oldpassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  // sending the otp
  const handleSendOtp = async () => {
    try {
      console.log(oldpassword);
      if (oldpassword) {
        const res = await fetch(
          `${Base_Url}/admin/auth/password/change-password/get-otp`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ oldpassword }),
          }
        );
        const jsonresponse = await res.json();
        console.log(jsonresponse);
        if (res.ok) {
          alertToast("OTP sent successfully", "success");
          setShowOtpInput(true);
        }
        else{
        alertToast(jsonresponse.error, "warning");
          
        }
      } else {
        alertToast("oldpassword shouldnt be empty", "warning");
      }
    } catch (error) {
      alertToast(error.message, "error");
    }
    // setContainerHeight('85vh');
  };

  // validating otp and changing the admin password

  const handleSavePassword = async () => {
    if (otp.length != 4) {
      alertToast(`enter opt with lenght 4`, "warning");
    }
    if (newPassword == 0  || reEnterPassword == 0) {
      alertToast(`please provide newpassword and re-enter it`, "warning");
    }
    if (newPassword >=6  || reEnterPassword >=6) {
      alertToast(`password should be min 6 chars`, "warning");
    }

    if (newPassword !== reEnterPassword) {
      alertToast(`Passwords don't match`, "warning");
    }
    if (otp && newPassword&&reEnterPassword) {
      try {
        const res = await fetch(
          `${Base_Url}/admin/auth/password/change-password/validate-otp`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ otp, newPassword }),
          }
        );
        const jsonres = await res.json();
        if (res.ok) {
          alertToast("Password changed successfully.", "success");
          setTimeout(() => {
            navigate("/adminHome");
          }, 2000);
        }
      } catch (error) {}
    }
  };

  return (
    <div>
      <ToastContainer />
      <AdminNavbar />
      <AdminSidebar />
      <div className="container-fluid adminBox">
        <div className="row adminInnerBox d-flex p-2 justify-content-center align-items-center ">
          {!showOtpInput && (
            <div className="d-flex p-2 justify-content-center flex-column align-items-center gap-2  adminpasscontainer">
              <h1 className="adminpassheading">Change Password</h1>
              <div className="adminpasschange">
                <p>Old Password</p>
                <input
                  value={oldpassword}
                  onChange={(event) => setOldPassword(event.target.value)}
                  type="text"
                />
              </div>
              <button onClick={handleSendOtp} className="adminpasschnagebtn">
                GetOtp
              </button>
            </div>
          )}

          {showOtpInput && (
            <div className="d-flex p-2 justify-content-center flex-column align-items-center gap-2  adminpasscontainer">
              <h1 className="adminpassheading">Change Password</h1>
              <div className="adminpasschange">
                <p>Enter OTP</p>
                <input
                  value={otp}
                  onChange={(event) => setOtp(event.target.value)}
                  type="text"
                />
              </div>
              <div className="adminpasschange">
                <p>New Password</p>
                <input
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  type="text"
                />
              </div>
              <div className="adminpasschange">
                <p>Re-Enter Password</p>
                <input
                  value={reEnterPassword}
                  onChange={(event) => setReEnterPassword(event.target.value)}
                  type="text"
                />
              </div>
              <button
                onClick={handleSavePassword}
                className="adminpasschnagebtn"
              >
                Change Password
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
