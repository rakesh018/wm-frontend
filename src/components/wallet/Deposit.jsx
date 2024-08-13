import React from 'react'
import { Navbar } from '../../Navbar';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../Sidebar'
import { BetSlip } from '../../BetSlip'
import deposit from '../../images/deposit.png'
import './wallet.css';
export const Deposit = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className=" container notificationBox mt-2 col-12 ">

        <button className='notificationBtn ms-3'>DEPOSIT</button>
        <div className="innerNotificationBox m-3 p-3 text-center">
          <div>
            <h1> <u>  TOTAL BALANCE : 0</u></h1>
            <div className='d-flex justify-content-start ms-3'>
              <img src={deposit} alt="" />
            </div>
            <div className="">
              <button className='upiId ' onClick={() => navigate('/depositAmount')}>
                UPI UID
              </button></div>
          </div>









        </div>
      </div>
      <Sidebar />
      <BetSlip />

    </div>
  )
}
