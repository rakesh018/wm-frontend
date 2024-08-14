import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
import { alertToast } from "../../alertToast";
import { useNavigate } from "react-router-dom";

export const Forgotpassword = () => {
  const navigate=useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");

  const handleOtpChange = (index, value) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleSendOtp = async () => {
    try {
      if (phoneNumber.trim().length === 10) {
        const res = await fetch(
          "https://server.trademax1.com/auth/forgot-password/get-otp",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phoneNumber }),
          }
        );
        if (res.ok) {
          alertToast("OTP sent successfully", "success");
          setShowOtpInput(true);
        }
      } else {
        alertToast("Please enter 10 digit number", "warning");
      }
    } catch (error) {
      console.log(error);
      alertToast("Error sending OTP", "error");
    }
  };

  const handleSavePassword = async () => {
    const finalOTP=otp[0]+otp[1]+otp[2]+otp[3];
    if(newPassword!==reEnterPassword){
      alertToast(`Passwords don't match`,'warning');
    }
    if (phoneNumber && otp && newPassword) {
      try {
        const res = await fetch(
          "https://server.trademax1.com/auth/forgot-password/validate-otp",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ otp:finalOTP, phoneNumber, newPassword }),
          }
        );
        console.log(res.json());
        if(res.ok){
          alertToast('Password changed successfully.','success');
          setTimeout(()=>{navigate('/login')},2000)
        }
      } catch (error) {}
    }
  };

  return (
    <div className="container-fluid login d-flex justify-content-center col-sm-12 col-md-12">
      <ToastContainer />
      <div className="otp-container text-center mt-5">
        <div className="otp-box">
          <div className="forgotPass m-2">FORGOT PASSWORD</div>
          <div>
            <input
              type="text"
              placeholder="Enter phone number"
              className="phoneBox m-5"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              maxLength="10"
            />
            <div>
              <button onClick={handleSendOtp} className="otpBox">
                Send OTP
              </button>
            </div>
          </div>

          {showOtpInput && (
            <div>
              <div className="m-5">
                {otp.map((value, index) => (
                  <input
                    className="passBox"
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    value={value}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    style={{ width: "30px", marginRight: "5px" }}
                  />
                ))}
              </div>
              <div>
                <input
                  className="passBox"
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="mt-5">
                <div>
                  <input
                    className="passBox"
                    type="password"
                    placeholder="Re-enter New Password"
                    value={reEnterPassword}
                    onChange={(e) => setReEnterPassword(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <button onClick={handleSavePassword} className="saveBox m-4">
                  SAVE PASSWORD
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
