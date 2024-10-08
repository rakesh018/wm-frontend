import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TbPasswordMobilePhone } from "react-icons/tb";
import { useLocation } from "react-router-dom";
import Base_Url from "../../config";

export const Verification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, password, referralCode } = location.state;
  // State management
  const [verificationCode, setVerificationCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(location.state.phoneNumber); // Example phone number, replace with actual data
  const [resendCounter, setResendCounter] = useState(60); // Countdown for resend button

  useEffect(() => {
    // Countdown timer for resend button
    let timer;
    if (resendCounter > 0) {
      timer = setInterval(() => {
        setResendCounter((prevCounter) => prevCounter - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [resendCounter]);

  const handleVerification = async (e) => {
    e.preventDefault();
    const payload = { phoneNumber, email, password, otp: verificationCode };
    if (referralCode && referralCode.length === 7) {
      payload.referralCode = referralCode;
    }
    try {
      const response = await fetch(
        `${Base_Url}/auth/signup/validate-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token',data.token);
        navigate("/home"); // Redirect to dashboard or desired route on successful verification
      } else {
        alert("Verification failed: " + data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during verification");
    }
  };

  const handleResendCode = async () => {
    try {
      const response = await fetch(
         `${Base_Url}/auth/signup/get-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phoneNumber }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setResendCounter(60); // Reset the countdown timer
      } else {
        alert("Failed to resend verification code: " + data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while resending the verification code");
    }
  };

  return (
    <div className="container-fluid register d-flex justify-content-center col-12">
      <div className="register-container">
        <div className="register-box mt-5">
          <div>
            <button className="register-btn m-3">REGISTER YOUR ACCOUNT</button>
          </div>

          <div>
            <h3>VERIFICATION OTP HAS BEEN SENT TO </h3>
            <h2>{phoneNumber}</h2>
          </div>

          <div>
            <TbPasswordMobilePhone style={{ fontSize: 25 }} />
            <span> VERIFICATION CODE</span>
          </div>

          <div>
            <input
              type="text"
              className="register-input m-1"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </div>

          <div>HAVEN'T RECEIVED ANY CODE?</div>
          <div>
            <button
              className="register-btn mt-3"
              onClick={handleResendCode}
              disabled={resendCounter > 0}
            >
              {resendCounter > 0
                ? `Resend in ${resendCounter}s`
                : "CLICK HERE TO RESEND THE CODE"}
            </button>
          </div>

          <div>
            <button
              className="register-btn mt-3 me-2"
              onClick={handleVerification}
            >
              VERIFY
            </button>
            {/* <button className='register-btn mt-3' onClick={() => navigate('/forgotVerification')}>FORGOT VERIFICATION</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};
