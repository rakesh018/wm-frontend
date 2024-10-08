import React, { useState, useEffect } from 'react';
import { Navbar } from '../../Navbar';
import { Sidebar } from '../../Sidebar';
import { BetSlip } from '../../BetSlip';
import profile from '../../images/pro.png';
import { useNavigate } from 'react-router-dom';
import './settings.css';
import Base_Url from '../../config';

export const Settings = () => {
    const navigate = useNavigate();
    const token=localStorage.getItem('token');
    const [userData, setUserData] = useState({
        name: 'ABC',
        phoneNumber: '',
        email: '',
        password: '',
        bankDetails: '',
        uid: '123456'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add your API call here to update user data
        try {
            const response = await fetch( `${Base_Url}/updateUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            if(response.status===403){
                navigate('/login');
            }
            if (response.ok) {
                // Handle success
                console.log('User data updated successfully');
            } else {
                // Handle error
                console.error('Failed to update user data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

   const  handleBankEdit=()=>
    {

    }
    const handleChangePassword=()=>
        {

        }
    useEffect(() => {
        // Fetch user data from API when component mounts
        const fetchUserData = async () => {
            try {
                const response = await fetch( `${Base_Url}/getUser`);
                const data = await response.json();
                setUserData({
                    name: data.name,
                    phoneNumber: data.phoneNumber,
                    email: data.email,
                    password: '',
                    bankDetails: data.bankDetails,
                    uid: data.uid
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };


        fetchUserData();
    }, []);

    const handleSavePassword=()=>
        {
            
        }

    return (
        <div>
            <Navbar />
             <div className='d-none d-sm-block'>
            <div className="container settingsBox mt-2">
           
                <button className='settingsBtn'>
                    SETTINGS
                </button>
                
                <form className='SettingsInnerBox mt-2' onSubmit={handleSubmit} >
                    <div className='row'>
                        <div className="details col-md-6 col-12 ms-5">
                            <div className="name text-center mt-3">
                                <div>
                                    <input
                                        type="text"
                                        className='setting-input m-2'
                                        placeholder='NAME:'
                                        name="name"
                                        value={userData.name}
                                        onChange={handleChange}
                                    />
                                    <span className="material-symbols-outlined">border_color</span>
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        className='setting-input m-2'
                                        placeholder='PHONE NUMBER:'
                                        name="phoneNumber"
                                        value={userData.phoneNumber}
                                        onChange={handleChange}
                                    />
                                    <span className="material-symbols-outlined">border_color</span>
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        className='setting-input m-2'
                                        placeholder='EMAIL'
                                        name="email"
                                        value={userData.email}
                                        onChange={handleChange}
                                    />
                                    <span className="material-symbols-outlined">border_color</span>
                                </div>
                            </div>
                            <div className='d-none d-sm-block'>SECURITY INFORMATION:</div>
                            <div className="password">
                                <div>
                                    <input
                                        type="password"
                                        className='setting-input m-2'
                                        placeholder='CHANGE PASSWORD'
                                        name="password"
                                        value={userData.password}
                                        onChange={handleChange}
                                    />
                                    <span className="material-symbols-outlined">border_color</span>
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        className='setting-input m-2'
                                        placeholder='BANK DETAILS'
                                        name="bankDetails"
                                        value={userData.bankDetails}
                                        onChange={handleChange}
                                    />
                                    <span className="material-symbols-outlined">border_color</span>
                                </div>
                                <div>
                                    UPDATED VERSION: 1.0.9
                                </div>
                                <button type="submit" className='settingsBtn'>SAVE CHANGES</button>
                            </div>
                        </div>
                        <div className="profile text-center col-md-4 col-12">
                            <div>
                                <img src={profile} alt="Profile" className='profile m-3' />
                            </div>
                            <div className='m-3'>
                                CHANGE PROFILE PICTURE
                            </div>
                            <div className='m-3'>
                                <input
                                    type="text"
                                    className='uid'
                                    placeholder='UID: 123456'
                                    name="uid"
                                    value={userData.uid}
                                    readOnly
                                />
                            </div>
                            <div>
                                <button className='getHelp-btn m-5' onClick={() => navigate('/help')}>
                                    GET HELP
                                </button>
                            </div>
                        </div>
                    </div>
                    
                </form>
                </div>
            </div>
            <div className='d-block d-md-none'>
                    <div className="container settingsBox mt-2">
                        <div className="text-center">
                            <img src={profile} alt="Profile" className='profile-image' />
                            <h5 className="mt-2" style={{color:'white'}}>USER NAME</h5>
                            <p className="uid">UID: {userData.uid}</p>
                        </div>
                        <form className='SettingsInnerBox mt-2' onSubmit={handleSubmit}>
                            <div className='settings-item'>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>Profile</span>
                                    <button type="button" className="edit-btn" onClick={() => { /* handle profile edit */ }}>Edit</button>
                                </div>
                            </div>
                            <div className='settings-item'>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>Notifications</span>
                                </div>
                            </div>
                            <div className='settings-item'>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>Refer and Earn</span>
                                </div>
                            </div>
                            <div className='settings-item'>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>Saved Bank Details</span>
                                    <button type="button" className="edit-btn" onClick={() => {handleBankEdit()}}>Edit</button>
                                </div>
                            </div>
                            <div className='settings-item'>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>Change Password</span>
                                    <button type="button" className="edit-btn" onClick={() => { handleChangePassword ()}}>Edit</button>
                                </div>
                            </div>
                            <div className='settings-item'>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>Get Help</span>
                                    <button type="button" className="edit-btn" onClick={() => navigate('/help')}>Get Help</button>
                                </div>
                            </div>
                            <div className='settings-item'>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>Sign Out</span>
                                </div>
                            </div>
                            <div className='settings-item'>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>Updated Version</span>
                                    <span>1.0.9</span>
                                </div>
                            </div>
                            <button type="submit" className='save-changes-btn' id='saveProfile'onClick={handleSavePassword} >SAVE CHANGES</button>
                        </form>
                    </div>
                </div>
            
            <Sidebar />
            <BetSlip />
        </div>
    );
};
