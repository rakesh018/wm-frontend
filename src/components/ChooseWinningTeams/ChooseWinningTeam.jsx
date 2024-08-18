import React from 'react'
import { AdminNavbar } from '../AdminPages/AdminHome/AdminNavbar'
import { AdminSidebar } from '../AdminPages/AdminHome/AdminSidebar';
import './chooseWinning.css';
import chooseWinning from '../../images/coinFlipImg.png';
import traderGame from '../../images/traderImg.png';
import { useNavigate } from 'react-router-dom';

export const ChooseWinningTeam = () => {
//   return (
//     <div>
//         <AdminNavbar/>
//         <AdminSidebar/>
//         <div className="container-fluid adminBox">
//   <div className="row adminInnerBox">
//     <div className="analysisDiv col m-2">
//         <div>
//             <button className='coinFlip-Winning'>COIN FLIP</button>
//             <div className='d-flex flex-row justify-content-around'>
//               <div className='choose'>1MIN</div>
//               <div className='choose'>3MIN</div>
//               <div className='choose'>5MIN</div>
//               <div className='choose'>10MIN</div>
//             </div>
//             <img src={chooseWinning} className='chooseWinningCoin p-2 m-2' alt="" />
//            <div> <u className='text-center m-3'><h3>TOTAL MONEY ON COIN FLIP GAME:</h3></u></div>
//            <div className='d-flex justify-content-evenly'>
//             <div className='onHeads p-3'>ON HEADS
//               <div>1000</div>
//             </div>
//             <div className='onTails p-3'>
//               ON TAILS
//               <div>1000</div>
//             </div>
//            </div>
//            <div> <u className='text-center m-3'><h4>CHOOSE WINNING TEAM:</h4></u></div>
//            <div className='d-flex justify-content-evenly'>
//             <button className='onChoose p-3'>
//               FOR HEADS TO WIN
//               <div>SELECT</div>
//             </button>
//             <button className='onChoose p-3'>
//               FOR TAILS TO WIN
//               <div>SELECT</div>
//             </button>
//            </div>


//         </div>
     
//     </div>

//     <div className="analysisDiv col  m-2">
//     <div>
//             <button className='coinFlip-Winning'>TRADER GAME</button>
//             <div className='d-flex flex-row justify-content-around'>
//               <div className='choose'>1MIN</div>
//               <div className='choose'>3MIN</div>
//               <div className='choose'>5MIN</div>
//               <div className='choose'>10MIN</div>
//             </div>
//             <img src={traderGame} className='chooseWinningCoin p-2 m-2' alt="" />
//            <div> <u className='text-center m-3'><h3>TOTAL MONEY ON COIN FLIP GAME:</h3></u></div>
//            <div className='d-flex justify-content-evenly'>
//             <div className='onHeads p-3'>ON UP
//               <div>1000</div>
//             </div>
//             <div className='onTails p-3'>
//               ON DOWN
//               <div>1000</div>
//             </div>
//            </div>
//            <div> <u className='text-center m-3'><h4>CHOOSE WINNING TEAM:</h4></u></div>
//            <div className='d-flex justify-content-evenly'>
//             <button className='onChoose p-3'>
//               FOR UP TO WIN
//               <div>SELECT</div>
//             </button>
//             <button className='onChoose p-3'>
//               FOR DOWN TO WIN
//               <div>SELECT</div>
//             </button>
//            </div>


//         </div>
   
//     </div>
//   </div>
// </div>
//     </div>
//   )
const navigate=useNavigate();
return (
  <div>
    <AdminNavbar />
    <AdminSidebar />
    <div className="container-fluid adminBox">
      <div className="row adminInnerBox justify-content-center align-items-center">
        <div className="col-md-6 text-center">
          <button 
            className='navigationButton mb-3'
            onClick={() => navigate('/adminCoinflip')}
          >
            COIN FLIP
          </button>
          <button 
            className='navigationButton'
            onClick={() => navigate('/adminTrader')}
          >
            TRADER GAME
          </button>
        </div>
      </div>
    </div>
  </div>
);
}

