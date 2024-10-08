import React, { useState, useEffect } from 'react';
import { TbPasswordMobilePhone } from "react-icons/tb";
import Base_Url from '../../config';

export const ForgotVerification = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('9876543210'); // Example phone number, replace with actual data
  const [resendCounter, setResendCounter] = useState(60); // Countdown for resend button

  useEffect(() => {
    // Countdown timer for resend button
    let timer;
    if (resendCounter > 0) {
      timer = setInterval(() => {
        setResendCounter(prevCounter => prevCounter - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [resendCounter]);

  const handleSendOTP = async () => {
    try {
      const response = await fetch( `${Base_Url}/auth/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();
      console.log('Response:', data);

      if (data.success) {
        setResendCounter(60); // Reset the countdown timer
        alert('OTP sent successfully');
      } else {
        alert('Failed to send OTP: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while sending the OTP');
    }
  };

  const handleVerification = async () => {
    try {
      const response = await fetch(`${Base_Url}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, verificationCode }),
      });

      const data = await response.json();
      console.log('Response:', data);

      if (data.success) {
        alert('Verification successful');
        // Redirect or perform further actions upon successful verification
      } else {
        alert('Verification failed: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during verification');
    }
  };

  return (
    <div className='container-fluid register d-flex justify-content-center col-12'>
      <div className="register-container">
        <div className="register-box mt-5">
          <div>
            <button className='register-btn m-3'>REGISTER YOUR ACCOUNT</button>
          </div>
          <div className='m-3'>
            <button className='resendOTP' onClick={handleSendOTP} disabled={resendCounter > 0}>
              {resendCounter > 0 ? `Resend in ${resendCounter}s` : 'SEND OTP'}
            </button>
          </div>
          <div>
            <TbPasswordMobilePhone style={{ fontSize: 25 }} />
            <span> VERIFICATION CODE</span>
          </div>
          <div>
            <input
              type="text"
              className='register-input m-1'
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </div>
          <div>HAVEN'T RECEIVED ANY CODE?</div>
          <div>CLICK HERE TO RESEND THE CODE</div>
          <div>
            <button className='register-btn mt-3' onClick={handleVerification}>VERIFY</button>
          </div>
        </div>
      </div>
    </div>
  )
}
