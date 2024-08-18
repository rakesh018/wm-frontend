import React from 'react';
import logo from '../../images/logo.jpeg';
import question from '../../images/questionMark.png';
import round from '../../images/roundimage.png';
import { profileAtom } from '../../atoms';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

export const Gamenav = () => {
  const profile=useRecoilValue(profileAtom);
  const navigate = useNavigate();

  const balance=profile.balance;
  const handleBack = () => {
    navigate(-1); // This will take the user to the previous page
  };
  return (

    <div>

<div className="container-fluid top-nav ">
        <div className='row align-items-center'>
        <div className='col-6 d-flex justify-content-start'>
          <div className="top-left d-flex justify-content-evenly d-sm-blok">
            <div className='icon'>
              <span className="material-symbols-outlined m-4" onClick={handleBack}>arrow_back_ios</span>
            </div>
            <div>
              <img className='logo1 m-2' src={logo} alt="Logo"  onClick={() => navigate('/home')}  />
            </div>
            <div className='d-none d-md-none '>
                            <input className='text m-4' type="text" />
                        </div>
            <div className='icon'>
            <div className='icon d-none d-md-none'>
                            <span className="material-symbols-outlined mt-4">search</span>
                        </div>
                        <img className='questionMark mt-3 ' src={question} alt="Question Mark" onClick={() => navigate('/help')} />
            </div>
          </div>
        </div>
        
        <div className='col-6 d-flex justify-content-end '>
          <div className="top-right d-flex justify-content-evenly">
            <div className="group d-flex justify-content-evenly">
            <div className='d-none d-md-block d-lg-none'>
                                <img className='questionMark m-2' src={question} alt="Question Mark" onClick={() => navigate('/help')} />
                            </div>
                            <div className='d-none d-md-block'>
                                <img className='roundImg m-2' src={round} alt="Round Image" onClick={() => navigate('/profile')} />
                            </div>
              <div>
               <button className="wallet m-3">
                WALLET BALANCE:{balance}
               </button>
              </div>
            </div>
          </div>
        </div>
      </div>

        </div>
    </div>
  )
}
