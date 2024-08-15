import React from 'react';
import logo from '../../../images/logo.png';
import round from '../../../images/roundimage.png';
import question from '../../../images/questionMark.png';
import search from '../../../images/searchImage.png';


export const AdminNavbar = () => {
    return (
        <div className='mainAdminHomeBox'>

            <div className="container-fluid top-nav ">
                <div className='row align-items-center'>
                    <div className='col-6 d-flex justify-content-start'>
                        <div className="top-left d-flex justify-content-evenly d-sm-blok">
                            <div className='icon'>
                                <span className="material-symbols-outlined m-4">arrow_back_ios</span>
                            </div>
                            <div>
                                <img className='logo1 m-2' src={logo} alt="Logo" />
                            </div>
                            <div className='d-none d-md-block'>
                                <input className='text m-4' type="text" />
                            </div>
                            <div className='icon mt-3'>
                                <img src={search} alt="" />
                            </div>
                        </div>
                    </div>

                    <div className='col-6 d-flex justify-content-end '>
                        <div className="top-right d-flex justify-content-evenly">
                            <div className="group d-flex justify-content-evenly">
                                <div className='d-none d-md-block'>
                                    <img className='questionMark m-2' src={question} alt="Question Mark" />
                                </div>
                                <div className='d-none d-md-block'>
                                    <img className='roundImg m-2' src={round} alt="Round Image" />
                                </div>
                                <div>
                                    <button className="wallet m-3">
                                        WALLET BALANCE:0
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className='container-fluid admin'>
               <div className="innerBox">
                <div className='text-center p-2'>
                    <h1>WELCOME TO ADMIN PANEL</h1>
                </div>

               </div>
            </div>
        </div>
    )
}
