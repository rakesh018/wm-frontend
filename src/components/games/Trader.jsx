import React, { useState } from 'react';
import { Gamenav } from './Gamenav';
import logo from '../../images/logo.png';
import winning from '../../images/winning.png';
import losing from '../../images/losing.png';
import Modal from 'react-modal';
import './trader.css';
import { CandleChart } from './CandleChart';
const candleArray = [1, 0, 1, 1, 0, 1, 0, 0, 1];

export const Trader = () => {
  const [result, setResult] = useState(null);

  const handleWinClick = () => {
    setResult('win');
  };

  const handleLoseClick = () => {
    setResult('lose');
  };

  const closeModal = () => {
    setResult('');
  };

  const [selectedValueHeads, setSelectedValueHeads] = useState(100);
  const [selectedValueTails, setSelectedValueTails] = useState(100);

  const handleIncrementHeads = () => {
    setSelectedValueHeads(selectedValueHeads + 100);
  };

  const handleDecrementHeads = () => {
    if (selectedValueHeads > 100) setSelectedValueHeads(selectedValueHeads - 100);
  };

  const handleIncrementTails = () => {
    setSelectedValueTails(selectedValueTails + 100);
  };

  const handleDecrementTails = () => {
    if (selectedValueTails > 100) setSelectedValueTails(selectedValueTails - 100);
  };

  return (
    <div>
      <Gamenav />
      <div className="leftBox">
        <div className='text-center'>
          <button className='coin m-3'>COIN FLIP</button>
        </div>
        <div className="d-flex justify-content-center">
          <div className='whiteBox m-2'>
            <div className="d-flex justify-content-center mt-3">
              <div className="blackBox">
                <div className='roundHistory mt-4 text-center m-2'>
                  ROUND HISTORY
                </div>
                <div className="d-flex justify-content-center">
                  <div className="CoinInnerBox">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rightBox text-center">
        <div className="timer-display m-3">00:00</div>
        <div className="d-flex justify-content-center">
          <div className='whiteBox m-2'>
            <div className="d-flex justify-content-center mt-3">
              <div className="blackBox">
                <div className='roundHistory mt-4 m-2'>
                  BET SLIP
                </div>
                <div className="d-flex justify-content-center">
                  <div className="innerBox">
                    YOUR BET SELECTION WILL APPEAR HERE
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='gameInterface'>
        <div className="gameInnerBox">
          <div className="time d-flex justify-content-around">
            <button className='timeBtn mt-2'>1 MIN</button>
            <button className='timeBtn mt-2'>3 MIN</button>
            <button className='timeBtn mt-2'>5 MIN</button>
            <button className='timeBtn mt-2'>10 MIN</button>
          </div>

          <div className='d-flex justify-content-center'>
            <CandleChart candleArray={candleArray} />
          </div>
          <div>
            <h3 className='traderText text-center'>PLEASE WAIT UNTIL YOUR TIME STARTS</h3>
          </div>

          <div className="d-flex justify-content-evenly">
            <div>
              <button className='forheads'>FOR UP</button>
              <div className="selection-box">
                <div className="counter">
                  <button className="counter-btn" onClick={handleIncrementHeads}>+</button>
                  <span>{selectedValueHeads}</span>
                  <button className="counter-btn" onClick={handleDecrementHeads}>-</button>
                </div>
                <div className="values">
                  <button className="value-btn">100</button>
                  <button className="value-btn">200</button>
                  <button className="value-btn">500</button>
                  <button className="value-btn">1000</button>
                </div>
                <button className="select-btn">SELECT</button>
              </div>
            </div>
            <div>
              <button className='fortails'>FOR DOWN</button>
              <div className="selection-box">
                <div className="counter">
                  <button className="counter-btn" onClick={handleIncrementTails}>+</button>
                  <span>{selectedValueTails}</span>
                  <button className="counter-btn" onClick={handleDecrementTails}>-</button>
                </div>
                <div className="values">
                  <button className="value-btn">100</button>
                  <button className="value-btn">200</button>
                  <button className="value-btn">500</button>
                  <button className="value-btn">1000</button>
                </div>
                <button className="select-btn">SELECT</button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="buttons">
            <button onClick={handleWinClick} className="win-button">Win</button>
            <button onClick={handleLoseClick} className="lose-button">Lose</button>
          </div>

          <Modal
            isOpen={result === 'win'}
            onRequestClose={closeModal}
            className="Coin-modal"
            overlayClassName="modal-overlay"
          >
            <div className="win text-center">
              <img src={winning} alt="Winning" className="m-2" />
              <img src={logo} alt="Winmaxx Logo" className="win-logo m-3" />
              <img src={winning} alt="Winning" className="m-2" />
              <h2>CONGRATULATIONS!!</h2>
              <p>You won</p>
              <div className="amount">
                <div className="amount-value">10,000</div>
              </div>
              <button className="continue-button mt-2" onClick={closeModal}>Continue</button>
            </div>
          </Modal>

          <Modal
            isOpen={result === 'lose'}
            onRequestClose={closeModal}
            className="Coin-modal"
            overlayClassName="modal-overlay"
          >
            <div className="lose text-center">
              <img src={losing} alt="Losing" className="m-2" />
              <img src={logo} alt="Winmaxx Logo" className="win-logo m-3" />
              <img src={losing} alt="Losing" className="m-2" />
              <h2>SORRY, TRY AGAIN</h2>
              <p>You lost</p>
              <div className="amount">
                <div className="amount-value">0</div>
              </div>
              <button className="continue-button mt-2" onClick={closeModal}>Continue</button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};
