import React from 'react'
import { useState } from 'react';
import './gameResult.css';
import logo from '../../images/logo.jpeg';
import winning from '../../images/winning.png';
import losing from '../../images/losing.png';


export const GameResult = () => {
    const [result, setResult] = useState(null);

  const handleWinClick = () => {
    setResult('win');
  };

  const handleLoseClick = () => {
    setResult('lose');
  };
  return (
    <div className="game-container">
    <div className="buttons">
      <button onClick={handleWinClick} className="win-button">Win</button>
      <button onClick={handleLoseClick} className="lose-button">Lose</button>
    </div>

    {result === 'win' && (
      <div className="d-flex justify-content-center">
      <div className="result-popup win text-center">
        <img src={winning} alt=""  className='m-2'/>
        <img src={logo} alt="Winmaxx Logo" className="win-logo" />
        <img src={winning} alt=""  className='m-2'/>
        <h2>CONGRATULATIONS!!</h2>
        <p>You won</p>
        <div className="amount">
         
          <div className="amount-value">10,000</div>
        </div>
        <button className="continue-button mt-2">Continue</button>
      </div>
      </div>
    )}

    {result === 'lose' && (
      <div className="d-flex justify-content-center">
      <div className="result-popup lose">
        <img src={losing} alt="" className='m-2' />
        <img src={logo} alt="Winmaxx Logo" className="win-logo" />
        <img src={losing} alt="" className='m-2'/>
        <h2>SORRY, TRY AGAIN</h2>
        <p>You lost</p>
        <div className="amount">
          <div className="amount-bar red"></div>
          <div className="amount-value">0</div>
        </div>
        <button className="continue-button mt-2">Continue</button>
      </div>
      </div>
    )}
  </div>
  )
}
