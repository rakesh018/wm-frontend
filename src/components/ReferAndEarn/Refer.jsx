import React from 'react';
import './refer.css';
import { Navbar } from '../../Navbar';
import { Sidebar } from '../../Sidebar';
import { BetSlip } from '../../BetSlip';
import referImg from '../../images/referImg.png';

export const Refer = () => {
  return (
    <div>
<Navbar/>
<div className='container referBox mt-2'>
    <button className='referBtn ms-3'>REFER AND EARN</button>

    <div className="referInnerBox m-3 p-2 " >
        <div className='referAnd text-center '>REFER TO YOUR FRIEND AND WIN COINS UPTO 1000 IN YOUR WALLET</div>
        <div className=" text-center">
<div> <img src={referImg} alt="" className='referImg' /></div>
       
        </div>
       

    </div>



</div>
<Sidebar/>
<BetSlip/>
    </div>
   
  )
}

