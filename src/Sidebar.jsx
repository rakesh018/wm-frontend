import React from 'react';
import { useNavigate } from 'react-router-dom';
import './sidebar.css';
import pro from './images/pro.png';
import resImage1 from './images/resImage1.png';
import resImage2 from './images/resImage2.png';
import resImage3 from './images/resImage3.png';
import resImage4 from './images/resImage4.png';
import resImage5 from './images/resImage5.png';
import betSlip from './images/betSlip.png';
import { useState } from 'react';

export const Sidebar = () => {
  const navigate = useNavigate();


  const [LogoutModal, setLogoutModal] = useState(null);
  
  const handleLogoutClick = () => {
    setLogoutModal('logout'); // Show the logout confirmation modal
  };


  const handleModalClose = () => {
    setLogoutModal(null); // Close any open modal
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); 
    setLogoutModal(null); 
  };
  return (
    <div>
     <div className=''>
       
        <div className="sidebar-box mt-4 d-none d-lg-block">
            <div className="content-wrapper ">
        <div className="me-1 text-center">
        <div className=' mt-2'>
      
          <img  className="pro"src={pro} alt=""  />
          </div>
        <div className=' mt-2'>
        <span className='userP-text'>USER NAME</span>
        </div>
        <div>
        <button className='pro-btn  mt-2' onClick={() => navigate('/profile')} >
          PROFILE
        </button>
        </div>
        <div className="proBox mt-4 p-2">
          <div >
            <button className='home-btn' onClick={() => navigate('/home')}>
            HOME
            </button>
            
          </div>
          <hr className='line m-2' />
          <div >
          <button className='history-btn' onClick={() => navigate('/history')}>  HISTORY</button>
          </div>
          <hr className='line m-2' />
          <div >
            <button className='leader-btn' onClick={() => navigate('/leaderboard')}>LEADER BOARD</button>
          </div>
          <hr className='line m-2' />
         <div >
           <button className='wallet-btn' onClick={() => navigate('/wallet')}> WALLET</button>
          </div>
          <hr className='line m-2' />
          <div >
            <button className='notification-btn' onClick={() => navigate('/notification')}>NOTIFICATIONS</button>
          </div>
          <hr className='line m-2' />
          <div >
           <button className='refer-btn' onClick={() => navigate('/refer')}> REFER AND EARN</button>
          </div>

        </div>
        <div className=" mt-4 ms-3">
         <button className='pro-logout ' onClick={handleLogoutClick}> LOGOUT  </button>
         {LogoutModal === 'logout' && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Are you sure you want to log out?</h2>
           <div className='d-flex flex-row justify-content-center'>
           <button className="modal-btn yes" onClick={handleConfirmLogout}>Yes</button>
           <button className="modal-btn no" onClick={handleModalClose}>No</button>
           </div>
          </div>
        </div>
      )}
        </div>
      </div>
      </div>
        </div>

        <div className='d-block d-lg-none '>
          <d iv className='smallScreen d-flex flex-row justify-content-evenly'>
            <div>
              <button>
              <img src={resImage1} alt=""  onClick={() => navigate('/home')} />
              <label htmlFor=""></label>
              
              </button>
             
            </div>
            <div>
            <button>
              <img src={resImage2} alt=""  onClick={() => navigate('/history')} />
              
              </button>
             
            </div>
            <div>
            <button>
              {/* <img src={resImage3}  alt=""  onClick={() => navigate('/leaderboard')}/> */}
              <img src={betSlip} alt="" className='betSlipImage'  onClick={() => navigate('/betSlip')}  />

             
              </button>
             
            </div>
            <div>
            <button>
              <img src={resImage4}  alt=""  onClick={() => navigate('/wallet')} />
              
              </button>
             
            </div>
            <div>
            <button>
              <img src={resImage5}  alt=""  onClick={() => navigate('/profile')} />
              
              </button>
             
            </div>

          </d>

          <div>

          </div>
        </div>
</div>
</div>
  )
}