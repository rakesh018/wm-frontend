import React, { useState, useEffect } from 'react';
import './login.css';

export const Forgotpassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');


  const handlePassword  =async(e)=>
    {

    }
  useEffect(() => {
  
    console.log('Forgot password component mounted');

    return () => {
    
      console.log('Forgot password component unmounted');
    };
  }, []);

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleReEnterPasswordChange = (e) => {
    setReEnterPassword(e.target.value);
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== reEnterPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('https://9ddc-14-139-240-252.ngrok-free.app/auth/forgotpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newPassword,
          reEnterPassword,
        }),
      });

      const data = await response.json();
      console.log('Response:', data);
      // Handle the response as needed
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='container-fluid login d-flex justify-content-center col-sm-12 col-md-12'>
      <form onSubmit={handleForgotPasswordSubmit}>
        <div className="login-container text-center mt-5">
          <div className="login-box">
            <div>
              <button className='login-btn m-5' type="button">
                FORGOT PASSWORD
              </button>
            </div>
            <div className='icons'>
              <button className='login-btn' type="button">NEW PASSWORD</button>
            </div>
            <div>
              <input
                type="password"
                className='login-input m-3'
                value={newPassword}
                onChange={handleNewPasswordChange}
              />
            </div>
            <div>
              <button className='login-btn' type="button">RE-ENTER PASSWORD</button>
            </div>
            <div style={{ margin: '16px 0', position: 'relative' }}>
              <input
                type="password"
                className="login-input"
                style={{ width: '60%' }}
                value={reEnterPassword}
                onChange={handleReEnterPasswordChange}
              />
            </div>
            <div>
              <input type="radio" name="rememberPassword" id="rememberPassword" />
              <label htmlFor="rememberPassword"> remember password?</label>
            </div>
            <div>
              <button className='login-btn m-3' onClick={handlePassword} type="submit">LOGIN</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
