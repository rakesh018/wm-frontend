import React, { useState, useEffect, useCallback } from "react";
import { Gamenav } from "./Gamenav";
import "./coinFlip.css";
import logo from "../../images/logo.png";
import winning from "../../images/winning.png";
import losing from "../../images/losing.png";
import Modal from "react-modal";
import socket from "../../socket";

export const CoinSwitch = () => {
  const [flipResult, setFlipResult] = useState(null);
  const [pastResults, setPastResults] = useState([]);
  const [timer, setTimer] = useState(0);
  const [selectedValueHeads, setSelectedValueHeads] = useState(100);
  const [selectedValueTails, setSelectedValueTails] = useState(100);
  const [result, setResult] = useState(null);

  const handleCoinFlip = () => {
    const result = Math.random();
    setFlipResult(null); // Reset the flip result for re-flipping animation
    setTimeout(() => {
      if (result <= 0.5) {
        setFlipResult("heads");
        console.log("it is head");
      } else {
        setFlipResult("tails");
        console.log("it is tails");
      }
    }, 100);
  };

  const handleTimerUpdate = useCallback((data) => {
    const { gameName, roundDuration, newTimer } = data;
    if (gameName === "coinFlip" && roundDuration === 1) {
      setTimer(newTimer);
    }
  }, []);

  const handleRoundFreeze = useCallback((data) => {
    const { gameName,roundDuration } = data;
    if (gameName === "coinFlip" && roundDuration===1) {
      setTimer("roundFreeze");
    }
  }, []);

  const handleResultBroadcast = useCallback((gameName,roundDuration,parsedResults) => {
    if (gameName === "coinFlip" && roundDuration === 1) {
      setPastResults(parsedResults);
    }
  }, []);

  useEffect(() => {
    socket.on("timerUpdate", handleTimerUpdate);
    socket.on("roundFreeze", handleRoundFreeze);
    socket.on("resultBroadcast", handleResultBroadcast);

    return () => {
      socket.off("timerUpdate", handleTimerUpdate);
      socket.off("roundFreeze", handleRoundFreeze);
      socket.off("resultBroadcast", handleResultBroadcast);
    };
  }, [handleTimerUpdate, handleRoundFreeze, handleResultBroadcast]);

  const handleIncrementHeads = () => {
    setSelectedValueHeads((prevValue) => prevValue + 100);
  };

  const handleDecrementHeads = () => {
    setSelectedValueHeads((prevValue) => (prevValue > 100 ? prevValue - 100 : prevValue));
  };

  const handleIncrementTails = () => {
    setSelectedValueTails((prevValue) => prevValue + 100);
  };

  const handleDecrementTails = () => {
    setSelectedValueTails((prevValue) => (prevValue > 100 ? prevValue - 100 : prevValue));
  };

  const handleWinClick = () => {
    setResult("win");
  };

  const handleLoseClick = () => {
    setResult("lose");
  };

  const closeModal = () => {
    setResult("");
  };

  return (
    <div>
      <Gamenav />
      <div className="leftBox">
        <div className="text-center">
          <button className="coin m-3">COIN FLIP</button>
        </div>
        <div className="d-flex justify-content-center">
          <div className="whiteBox m-2">
            <div className="d-flex justify-content-center mt-3">
              <div className="blackBox">
                <div className="roundHistory mt-4 text-center m-2">ROUND HISTORY</div>
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
        <div className="timer-display m-3">{timer}</div>
        <div className="d-flex justify-content-center">
          <div className="whiteBox m-2">
            <div className="d-flex justify-content-center mt-3">
              <div className="blackBox">
                <div className="roundHistory mt-4 m-2">BET SLIP</div>
                <div className="d-flex justify-content-center">
                  <div className="innerBox">YOUR BET SELECTION WILL APPEAR HERE</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="gameInterface">
        <div className="gameInnerBox">
          <div className="time d-flex justify-content-around">
            <button className="timeBtn mt-2">1 MIN</button>
            <button className="timeBtn mt-2">3 MIN</button>
            <button className="timeBtn mt-2">5 MIN</button>
            <button className="timeBtn mt-2">10 MIN</button>
          </div>
          <div className="desc text-center mt-3">
            <h2>PLEASE WAIT UNTILL THE TIMER STARTS</h2>
          </div>
          <div className="d-flex justify-content-center m-4">
            <div id="coin" className={flipResult} onClick={handleCoinFlip}>
              <div className="side-a"></div>
              <div className="side-b"></div>
            </div>
          </div>
          <div className="desc text-center m-5">
            <h2>CHOOSE YOUR SIDE</h2>
          </div>

          <div className="d-flex justify-content-evenly">
            <div>
              <button className="forheads">FOR HEADS</button>
              <div className="selection-box m-2">
                <div className="counter">
                  <button className="counter-btn" onClick={handleIncrementHeads}>
                    +
                  </button>
                  <span>{selectedValueHeads}</span>
                  <button className="counter-btn" onClick={handleDecrementHeads}>
                    -
                  </button>
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
              <button className="fortails">FOR TAILS</button>
              <div className="selection-box m-2">
                <div className="counter">
                  <button className="counter-btn" onClick={handleIncrementTails}>
                    +
                  </button>
                  <span>{selectedValueTails}</span>
                  <button className="counter-btn" onClick={handleDecrementTails}>
                    -
                  </button>
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
            <button onClick={handleWinClick} className="win-button">
              Win
            </button>
            <button onClick={handleLoseClick} className="lose-button">
              Lose
            </button>
          </div>

          <Modal
            isOpen={result === "win"}
            onRequestClose={closeModal}
            className="Coin-modal"
            overlayClassName="modal-overlay"
          >
            <div className="win text-center">
              <img src={winning} alt="" className="m-2" />
              <img src={logo} alt="Winmaxx Logo" className="win-logo m-3" />
              <img src={winning} alt="" className="m-2" />
              <h2>CONGRATULATIONS!!</h2>
              <p>You won</p>
              <div className="amount">
                <div className="amount-value">10,000</div>
              </div>
              <button className="continue-button mt-2" onClick={closeModal}>
                Continue
              </button>
            </div>
          </Modal>

          <Modal
            isOpen={result === "lose"}
            onRequestClose={closeModal}
            className="Coin-modal"
            overlayClassName="modal-overlay"
          >
            <div className="lose text-center">
              <img src={losing} alt="" className="m-2" />
              <img src={logo} alt="Winmaxx Logo" className="win-logo m-3" />
              <img src={losing} alt="" className="m-2" />
              <h2>BETTER LUCK NEXT TIME!</h2>
              <p>You lost</p>
              <div className="amount">
                <div className="amount-value">0</div>
              </div>
              <button className="continue-button mt-2" onClick={closeModal}>
                Continue
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};
