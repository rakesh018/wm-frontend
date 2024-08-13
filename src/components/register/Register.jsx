import React, { useState, useEffect } from 'react';
import './register.css';
import { useNavigate } from 'react-router-dom';
import { TbPasswordMobilePhone } from "react-icons/tb";

export const Register = () => {
    const navigate = useNavigate();

    // State management
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [referralCode, setReferralCode] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);

    useEffect(() => {
        // Add any initialization logic here if needed
        console.log('Register component mounted');

        return () => {
            // Cleanup if needed when component unmounts
            console.log('Register component unmounted');
        };
    }, []);

    const handleRegistration = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        if (!termsAccepted) {
            alert('You must accept the terms and conditions');
            return;
        }

        try {
            const response = await fetch('https://server.trademax1.com/auth/signup/get-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phoneNumber
                }),
            });

            const data = await response.json();
            console.log(data);
            // Handle the response as needed
            if (response.ok) {
                navigate('/verification',{ state: { email,password,phoneNumber,referralCode } });
            } else {
                alert('Registration failed: ' + data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during registration');
        }
    };

    return (
        <div className='container-fluid register d-flex justify-content-center col-12'>
            <div className="register-container">
                <div className="register-box mt-5">
                    <div>
                        <button className='register-btn m-3' onClick={() => navigate('/register')}>
                            REGISTER YOUR ACCOUNT
                        </button>
                    </div>

                    <div>
                        <span>PLEASE REGISTER BY USING PHONE NUMBER AND EMAIL</span>
                    </div>

                    <div className='phone mt-2'>
                        <span className="material-symbols-outlined">
                            phone_android
                        </span>
                        <span>PHONE NUMBER</span>
                    </div>

                    <div>
                        <input
                            type="text"
                            className='register-input m-2'
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>

                    <div>
                        <span className="material-symbols-outlined">
                            mail
                        </span>
                        <span>EMAIL</span>
                    </div>

                    <div>
                        <input
                            type="text"
                            className='register-input m-1'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <span className="material-symbols-outlined">
                            lock
                        </span>
                        <span>SET PASSWORD</span>
                    </div>

                    <div>
                        <input
                            type="password"
                            className='register-input m-1'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <span className="material-symbols-outlined">
                            lock
                        </span>
                        <span>CONFIRM PASSWORD</span>
                    </div>

                    <div>
                        <input
                            type="password"
                            className='register-input m-1'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <TbPasswordMobilePhone style={{ fontSize: 25 }} />
                        <span> REFERRAL CODE</span>
                    </div>

                    <div>
                        <input
                            type="text"
                            className='register-input m-1'
                            value={referralCode}
                            onChange={(e) => setReferralCode(e.target.value)}
                        />
                    </div>

                    <div className='agree d-flex flex-row justify-content-center mt-2'>
                        <input
                            type="checkbox"
                            name="terms"
                            id="terms"
                            checked={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                        />
                        <label htmlFor="terms"> I have read and agree on the terms and conditions</label>
                    </div>

                    <div>
                        <button className='register-btn mt-3' onClick={handleRegistration}> REGISTER</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
