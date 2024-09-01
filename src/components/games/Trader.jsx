import React, { useState, useEffect, useCallback } from "react";
import { Gamenav } from "./Gamenav";
import logo from "../../images/logo.jpeg";
import winning from "../../images/winning.png";
import losing from "../../images/losing.png";
import Modal from "react-modal";
import "./trader.css";
import { Sidebar } from "../../Sidebar";
import { useNavigate } from "react-router-dom";

import { BetSlip } from "../../BetSlip";
import { useRecoilState } from "recoil";
import { profileAtom } from "../../atoms";
import { betSlipsAtom } from "../../atoms";
import socket from "../../socket";

import { alertToast } from "../../alertToast";
import { CandleStick } from "./CandleStick";

// Example placeholder data
const initialCandleArray = [1, 0, 1, 1, 0, 1, 0, 0, 1];

export const Trader = ({ showAlert }) => {
  const navigate=useNavigate();
  const token=localStorage.getItem('token');
  if(!token){
    navigate('/login');
  }
  // const [candleArray, setCandleArray] = useState(initialCandleArray); // State for candle data
  const [duration, setDuration] = useState(1); // Initial duration
  const [flipResult, setFlipResult] = useState(null);
  const [pastResults, setPastResults] = useState(initialCandleArray);
  const [timer, setTimer] = useState(0);
  const [selectedValueHeads, setSelectedValueHeads] = useState(100);
  const [selectedValueTails, setSelectedValueTails] = useState(100);
  const [result, setResult] = useState(null);
  const [profile, setProfile] = useRecoilState(profileAtom);
  const [candleArray,setCandleArray]=useState([]);

  const fetchPastDetails = async (roundDuration) => {
    // Fetch data from server based on roundDuration
    // Example fetch API call
    const response = await fetch(
      `https://server.trademax1.com/bets/get-rounds-history/stockTrader/${roundDuration}`,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    if(response.status===403){
      navigate('/login');
    }
    else if(!response.ok){
      alertToast('Error occured','error');
    }
    const data = await response.json();
    const results = data.parsedResults;
    setPastResults(results);
    setCandleArray(data.parsedCandleStickData);
  };

  useEffect(() => {
    fetchPastDetails(duration);
  }, [duration]);
  const formatTime = (totalSeconds) => {
    if (totalSeconds === "roundFreeze") {
      return "ROUND FREEZE";
    }
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };
  const [betDetails, setBetDetails] = useRecoilState(betSlipsAtom);
  async function getSlips() {
    const slips = await fetch(
      "https://server.trademax1.com/bets/get-bet-slips",
      {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    if(slips.status===403){
      navigate('/login');
    }
    else if(!slips.ok){
      alertToast('Error fetching details','error');
    }
    const parsedSlips = await slips.json();
    setBetDetails(parsedSlips);
    console.log(parsedSlips);
  }
  useEffect(() => {
    const handleTimerUpdate = (data) => {
      const { gameName, roundDuration, newTimer } = data;
      if (gameName === "stockTrader" && roundDuration === duration) {
        setTimer(newTimer);
      }
    };

    const handleRoundFreeze = (data) => {
      const { gameName, roundDuration } = data;
      if (gameName === "stockTrader" && roundDuration === duration) {
        setTimer("roundFreeze");
      }
    };

    const handleResultBroadcast = async (
      gameName,
      roundDuration,
      parsedResults,
      parsedCandleStickData
    ) => {
      if (gameName === "stockTrader" && roundDuration === duration) {
        const fetchedProfile = await fetch(
          "https://server.trademax1.com/profile/getProfile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if(fetchedProfile.status===403){
          navigate('/login');
        }
        else if(!fetchedProfile.ok){
          alertToast('error occured','error');
        }
        const parsedProfile = await fetchedProfile.json();
        setProfile(parsedProfile);
        setPastResults(parsedResults);
        setCandleArray(parsedCandleStickData);
        showAlert(gameName, roundDuration, parsedResults[0]);
        
      }
    };

    // Listen to socket events
    socket.on("timerUpdate", handleTimerUpdate);
    socket.on("roundFreeze", handleRoundFreeze);
    socket.on("resultBroadcast", handleResultBroadcast);

    // Cleanup on unmount or duration change
    return () => {
      socket.off("timerUpdate", handleTimerUpdate);
      socket.off("roundFreeze", handleRoundFreeze);
      socket.off("resultBroadcast", handleResultBroadcast);
    };
  }, [duration]); // Add `duration` to the dependency array to ensure listeners update on duration change

  const handleIncrementHeads = () => {
    setSelectedValueHeads(selectedValueHeads + 100);
  };

  const handleDecrementHeads = () => {
    if (selectedValueHeads > 100)
      setSelectedValueHeads(selectedValueHeads - 100);
  };

  const handleIncrementTails = () => {
    setSelectedValueTails(selectedValueTails + 100);
  };

  const handleDecrementTails = () => {
    if (selectedValueTails > 100)
      setSelectedValueTails(selectedValueTails - 100);
  };
  // Change handler for Heads input
  const handleChangeHeads = (e) => {
    const value = Math.max(0, parseInt(e.target.value, 10) || 0); // Ensure positive values
    setSelectedValueHeads(value);
  };

  // Change handler for Tails input
  const handleChangeTails = (e) => {
    const value = Math.max(0, parseInt(e.target.value, 10) || 0); // Ensure positive values
    setSelectedValueTails(value);
  };

  const handleBet = async (duration, selectedAmt, choice) => {
    const numValue = parseFloat(selectedAmt);

    // Check if numValue is a finite number and positive
    if (!isNaN(numValue) && Number.isFinite(numValue) && numValue >= 10) {
      try {
        const response = await fetch(
          "https://server.trademax1.com/bets/makeBet",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              gameName: "stockTrader",
              roundDuration: duration,
              betAmount: numValue,
              betChoice: choice,
            }),
          }
        );
        const parsedRes = await response.json();
        if(response.status===403){
          navigate('/login');
        }
        else if (response.ok) {
          const alertDetails = {
            duration: duration,
            gameName: "stockTrader",
            decision: choice,
          };
          sessionStorage.setItem("alertDetails2", JSON.stringify(alertDetails));
          setProfile({ ...profile, balance: parsedRes.updatedBalance });
          alertToast(parsedRes.message, "success");
          getSlips();
        } else if (response.status === 400) {
          console.log(parsedRes);
          alertToast(parsedRes.error, "error");
        }
      } catch (error) {
        alertToast("Unable to place bet", "error");
      }
    } else {
      alertToast("Invalid input", "warning");
    }
  };
  return (
    <div className="tradergame">
      <Gamenav />
      <div className="leftBox ">
        <div className="text-center">
          <div className="d-none d-sm-block">
            <button className="coin m-3">TRADER</button>
          </div>
        </div>
        <div className="d-none d-sm-block">
          <div className="d-flex justify-content-center">
            <div className="whiteBox m-2">
              <div className="d-flex justify-content-center mt-3">
                <div className="">
                  <div className="d-none d-sm-block">
                    <div className="roundHistory mt-4 text-center m-2">
                      ROUND HISTORY
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <div className="CoinInnerBox text-center">
                      {Array.isArray(pastResults) && pastResults.length > 0 ? (
                        pastResults.map((result, index) => (
                          <div key={index} className="pastResult">
                            {/* Render result details */}
                            {result === 1 ? "Up" : "Down"}
                          </div>
                        ))
                      ) : (
                        <div>No past results available.</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rightBox text-center">
        <div className="timer-display">{formatTime(timer)}</div>
      </div>

      <div className="gameInterface">
        <div className="gameInnerBox">
          <div className="time d-flex justify-content-around">
            <button
              className="timeBtn mt-2"
              style={{
                backgroundColor: duration === 1 ? "gold" : "black",
                color: duration === 1 ? "black" : "white",
              }}
              onClick={() => setDuration(1)}
            >
              1 MIN
            </button>
            <button
              className="timeBtn mt-2"
              style={{
                backgroundColor: duration === 3 ? "gold" : "black",
                color: duration === 3 ? "black" : "white",
              }}
              onClick={() => setDuration(3)}
            >
              3 MIN
            </button>
            <button
              className="timeBtn mt-2"
              style={{
                backgroundColor: duration === 5 ? "gold" : "black",
                color: duration === 5 ? "black" : "white",
              }}
              onClick={() => setDuration(5)}
            >
              5 MIN
            </button>
            <button
              className="timeBtn mt-2"
              style={{
                backgroundColor: duration === 10 ? "gold" : "black",
                color: duration === 10 ? "black" : "white",
              }}
              onClick={() => setDuration(10)}
            >
              10 MIN
            </button>
          </div>
          <div className="trader-timer text-center d-lg-none">
            {formatTime(timer)}
          </div>

          <div className="d-flex justify-content-center">
            <CandleStick candleArray={candleArray} />
          </div>
          <div>
            <h3 className="traderText text-center">
              PLEASE WAIT UNTIL YOUR TIME STARTS
            </h3>
          </div>

          <div className="upAndDown d-flex justify-content-evenly">
            <div>
              <button className="forUPS" id="forUp">
                FOR UP
              </button>
              <div className="selection-box">
                <div className="counter">
                  <button
                    className="counter-btn"
                    onClick={handleDecrementHeads}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={selectedValueHeads === 0 ? "" : selectedValueHeads}
                    onChange={handleChangeHeads}
                    className="counter-input"
                    min="10"
                  />
                  <button
                    className="counter-btn"
                    onClick={handleIncrementHeads}
                  >
                    +
                  </button>
                </div>
                <div className="values">
                  <button
                    className="value-btn"
                    onClick={() => setSelectedValueHeads(100)}
                  >
                    100
                  </button>
                  <button
                    className="value-btn"
                    onClick={() => setSelectedValueHeads(200)}
                  >
                    200
                  </button>
                  <button
                    className="value-btn"
                    onClick={() => setSelectedValueHeads(500)}
                  >
                    500
                  </button>
                  <button
                    className="value-btn"
                    onClick={() => setSelectedValueHeads(1000)}
                  >
                    1000
                  </button>
                </div>
                <button
                  className="select-btn-up"
                  onClick={() => {
                    handleBet(duration, selectedValueHeads, "up");
                  }}
                >
                  SELECT
                </button>
              </div>
            </div>
            <div className="forDown">
              <button className="forDOWN" id="fordown">
                FOR DOWN
              </button>
              <div className="selection-box">
                <div className="counter">
                  <button
                    className="counter-btn"
                    onClick={handleDecrementTails}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={selectedValueTails === 0 ? "" : selectedValueTails}
                    onChange={handleChangeTails}
                    className="counter-input"
                    min="10"
                  />
                  <button
                    className="counter-btn"
                    onClick={handleIncrementTails}
                  >
                    +
                  </button>
                </div>
                <div className="values">
                  <button
                    className="value-btn"
                    onClick={() => setSelectedValueTails(100)}
                  >
                    100
                  </button>
                  <button
                    className="value-btn"
                    onClick={() => setSelectedValueTails(200)}
                  >
                    200
                  </button>
                  <button
                    className="value-btn"
                    onClick={() => setSelectedValueTails(500)}
                  >
                    500
                  </button>
                  <button
                    className="value-btn"
                    onClick={() => setSelectedValueTails(1000)}
                  >
                    1000
                  </button>
                </div>
                <button
                  className="select-btn-down"
                  onClick={() => {
                    handleBet(duration, selectedValueTails, "down");
                  }}
                >
                  SELECT
                </button>
              </div>
            </div>
            <div className="d-none d-lg-block">
              <BetSlip />
            </div>
            <div className="d-lg-none">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
