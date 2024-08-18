import React from 'react';
import { useState } from 'react';
import './navbar.css';
import logo from './images/logo.jpeg';
import question from './images/questionMark.png';
import round from './images/roundimage.png';
import image1 from './images/image1.png';
import image2 from './images/image2.png';
import image3 from './images/image3.png';
import image4 from './images/image4.png';
import image5 from './images/image5.png';
import { useRecoilValue } from "recoil";
import logoutIcon from './images/logoutIcon.png'
import { profileAtom } from "./atoms";
import {useNavigate} from 'react-router-dom';


export const Navbar = () => {
	const profile = useRecoilValue(profileAtom);
	const navigate = useNavigate();

	const handleBackClick = () => {
	  navigate(-1); 
	};
	


	const [LogoutModal, setLogoutModal] = useState(null);
	
	const handleLogoutClick = () => {
	  setLogoutModal('logout'); 
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
        <div className="container-fluid top-nav ">
        <div className='row align-items-center'>
        <div className='col-6 d-flex justify-content-start'>
          <div className="top-left d-flex justify-content-evenly d-sm-blok">
            <div className='icon d-lg-none'  onClick={handleBackClick}>
			
              <span className="material-symbols-outlined m-4">arrow_back_ios</span>
			
			
            </div>
			<div>
			<img src={logoutIcon} className='logoutIcon ' alt=""  onClick={handleLogoutClick} />
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
            <div>
              <img className='logo1 m-2' src={logo} alt="Logo"  onClick={() => navigate('/home')} />
            </div>
            <div className='d-none d-md-block'>
                            <input className='text m-4' type="text" />
                        </div>
            <div className='icon'>
            <div className='icon d-none d-md-block'>
                            <span className="material-symbols-outlined mt-4">search</span>
                        </div>
						<img className='questionMark mt-3 d-lg-none' src={question} alt="Question Mark" onClick={() => navigate('/help')} />
            </div>
          </div>
        </div>
        
        <div className='col-6 d-flex justify-content-end '>
          <div className="top-right d-flex justify-content-evenly">
            <div className="group d-flex justify-content-evenly">
            <div className='d-none d-md-block'>
                                <img className='questionMark m-2' src={question} alt="Question Mark" onClick={() => navigate('/help')} />
                            </div>
                            <div className='d-none d-md-block'>
                                <img className='roundImg m-2' src={round} alt="Round Image" onClick={() => navigate('/profile')} />
                            </div>
              <div>
               <button className="wallet m-4">
                WALLET BALANCE:{profile.balance}
               </button>
              </div>
            </div>
          </div>
        </div>
      </div>

        </div>
{/* slider */}
<div class="client-slider col-sm-12  ">
	<div class="client-slide-track ">
		<div class="client-slide">
			<img src={image1} height="100" width="250" alt="" />
		</div>
		<div class="client-slide">
			<img src={image2} height="100" width="250" alt="" />
		</div>
		<div class="client-slide">
			<img src={image3} height="100" width="250" alt="" />
		</div>
		<div class="client-slide">
			<img src={image4} height="100" width="250" alt="" />
		</div>
		<div class="client-slide">
			<img src={image5} height="100" width="250" alt="" />
		</div>
		<div class="client-slide">
			<img src={image1} height="100" width="250" alt="" />
		</div>
		<div class="client-slide">
			<img src={image2} height="100" width="250" alt="" />
		</div>
		<div class="client-slide">
			<img src={image3} height="100" width="250" alt="" />
		</div>
		<div class="client-slide">
			<img src={image4} height="100" width="250" alt="" />
		</div>
		<div class="client-slide">
			<img src={image5} height="100" width="250" alt="" />
		</div>
		<div class="client-slide">
			<img src={image1} height="100" width="250" alt="" />
		</div>
		<div class="client-slide">
			<img src={image2} height="100" width="250" alt="" />
		</div>
		<div class="client-slide">
			<img src={image3} height="100" width="250" alt="" />
		</div>
		<div class="client-slide">
			<img src={image4} height="100" width="250" alt="" />
		</div>
	</div>
</div>
    </div>
  )
}