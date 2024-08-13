import React from 'react'
import { Sidebar } from '../../Sidebar'
import { Navbar } from '../../Navbar'
import { BetSlip } from '../../BetSlip'
import QRCode from 'react-qr-code';

export const DepositManually = () => {
  return (
    <div>
      <Navbar />

      <div className="container homeBox mt-2 ">
        <button className='featuredGames-btn'>
          DEPOSIT MANUALLY
        </button>
        <div className='innerNotificationBox mt-3 text-center'>
          <h2 className=' m-3'><u>DEPOSIT MONEY MANUALLY</u></h2>

          <div>
            <h2>UPI ID:9876543210</h2>
          </div>
          <div className='m-4'>
            <QRCode
              size={150}
              bgColor='White'
              value='HIII THIS IS KEERTHI'
          />
          <div className='m-2'> <h2>SCAN AND PAY</h2></div>
          </div>



        </div>



      </div>

      <Sidebar />
      <BetSlip />

    </div>
  )
}
