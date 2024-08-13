import React, { useEffect, useState } from 'react';
import profile from '../../images/pro.png';
import { Navbar } from '../../Navbar';
import { Sidebar } from '../../Sidebar';
import { BetSlip } from '../../BetSlip';
import { useNavigate } from 'react-router-dom';
import './profile.css'
import { profileAtom } from '../../atoms';
import { useRecoilValue } from 'recoil';

export const Profile = () => {
  const navigate = useNavigate();
  const profile=useRecoilValue(profileAtom);

  return (
    <div>
      <Navbar />

      <div className="container settingsBox mt-2 col-12">
        <button className='settingsBtn'>
          PROFILE
        </button>
        <div className='SettingsInnerBox mt-2'>
          <div className='d-flex justify-content-center '>
            <div className="row">
              <div className="col-12 col-md-5">
            <div className="details">
              <div className="name text-center mt-3">
                <div>
                  <input type="text" className='setting-input m-2' value={`EMAIL: ${profile?.email || ''}`} readOnly />
                 
                </div>
                <div>
                  <input type="text" className='setting-input m-2' value={`PHONE NUMBER: ${profile?.phone || ''}`} readOnly />
                  
                </div>
                <div>
                  <input type="text" className='setting-input m-2' value={`REFERRAL CODE: ${profile?.referralCode || ''}`} readOnly />
                  
                </div>
              </div>
              </div>
{/* 
              <div className="password text-center mt-3 d-none d-sm-block">
                <div className='support m-2'>
             <button>  <h4> FEEDBACK</h4>  </button>
                </div>
                <div className='support m-2'>
                <button><h4> BEGINNER'S GUID</h4></button>
                </div>
                <div className=' support m-2'>
               <button> <h6>24/7 CUSTOMER SUPPORT</h6></button>
                </div>
              </div> */}
            </div>
       <div className='col-12 col-md-7 '>
            <div className="pro text-center d-flex flex-column justify-content-between ">
              <div>
                <img src={profile} alt="" className='profile ms-3 mt-2' />
              </div>
              <div className='ms-4'>
                <input type="text" className='uid' value={`UID: ${profile?.uid || ''}`} readOnly />
              </div>
              {/* <div>
                <button className='about-btn mt-2' onClick={() => navigate('/aboutUs')}>
                  ABOUT US
                </button>
                <div>
                  <button className='mt-3'  onClick={() => navigate('/settings')} >
                    Go to settings to edit
                  </button>
                </div>
              </div> */}
            </div>
            </div>
          </div>
          </div>
        </div>
       
      </div>
      <Sidebar />
      <BetSlip />
    </div>
  );
};
