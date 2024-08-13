import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../Navbar';
import { Sidebar } from '../../Sidebar';
import { BetSlip } from '../../BetSlip';
import withdraw from '../../images/withdraw.png';

export const WithdrawAmount = () => {
    const navigate = useNavigate();
  return (
  <div>
    <Navbar/>
    <div className="container notificationBox mt-2 col-12">
      <button className='notificationBtn ms-3'>DEPOSIT</button>
      <div className="innerNotificationBox m-3 p-3 text-center">
        <div className="row align-items-center">
        <div className="col-md-4 d-flex justify-content-end">
            <img src={withdraw} alt="Withdraw" />
          </div>
          <div className="col-md-6">
            <h1><u>TOTAL BALANCE: 0</u></h1>
          </div>
          
        </div>
       <div>
        <h5>ACCOUNT NUMBER:</h5>
        <h5>IFSC CODE:</h5>
        <h5>NAME ON CARD:</h5>
        <h5>PHONE NUMBER:</h5>
        <input type="radio"  />
        <label htmlFor=""> CLICK TO SAVE THE INFORMATION</label>

       </div>
       <div>
        <button className='withdrawContinue m-3' onClick={() => navigate('/enterWithdraw')}>
            CONTINUE
        </button>
       </div>
      </div>
    </div>
<Sidebar/>
<BetSlip/>
  </div>
  )
}
