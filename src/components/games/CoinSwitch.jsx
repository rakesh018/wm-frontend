import React, { useState, useEffect } from "react";
import { Gamenav } from "./Gamenav";
import { Sidebar } from "../../Sidebar";
import "./coinFlip.css";
import logo from "../../images/logo.jpeg";
import winning from "../../images/winning.png";
import losing from "../../images/losing.png";
import Modal from "react-modal";
import socket from "../../socket";
import { BetSlip } from "../../BetSlip";
import { alertToast } from "../../alertToast";
import { useRecoilState } from "recoil";
import { betSlipsAtom, profileAtom } from "../../atoms";
import coinFlipSound from "../../assets/coinFlip.mp3";
import { useNavigate } from "react-router-dom";
import Base_Url from "../../config";

export const CoinSwitch = ({ showAlert }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
  }
  const [duration, setDuration] = useState(1); // Initial duration
  const [flipResult, setFlipResult] = useState(null);
  const [pastResults, setPastResults] = useState([]);
  const [timer, setTimer] = useState(0);
  const [selectedValueHeads, setSelectedValueHeads] = useState(100);
  const [selectedValueTails, setSelectedValueTails] = useState(100);
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState(null);
  const [profile, setProfile] = useRecoilState(profileAtom);
  const coinFlipAudio = new Audio(coinFlipSound);
  const fetchPastDetails = async (roundDuration) => {
    const response = await fetch(
       `${Base_Url}/bets/get-rounds-history/coinFlip/${roundDuration}`,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    if(response.status===403){
      navigate('/login');
    }
    else if(!response.ok){
      alertToast('Error fetching details','error');
    }
    const data = await response.json();
    const results = data.parsedResults;
    console.log(data);
    setPastResults(results);
  };

  useEffect(() => {
    fetchPastDetails(duration);
  }, [duration]);

  const handleCoinFlip = async (result) => {
    setIsFlipping(true); // Start the animation immediately
    setFlipResult(null); // Reset the flip result for re-flipping animation
    coinFlipAudio.play();
    // Use a timeout to match the animation duration
    setTimeout(() => {
      // Update the result after the animation duration
      if (result === 1) {
        setFlipResult("heads");
      } else {
        setFlipResult("tails");
      }
      // Stop the animation
    }, 10); // Duration should match the CSS animation duration
    setTimeout(() => {
      setIsFlipping(false);
    }, 3000);
  };

  const formatTime = (totalSeconds) => {
    if (totalSeconds === "roundFreeze" || isFlipping) {
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
      `${Base_Url}/bets/get-bet-slips`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    if(slips.status===403){
      navigate('/login');
    }
    else if(!slips.ok){
      alertToast('Error occured','error');
    }
    const parsedSlips = await slips.json();
    setBetDetails(parsedSlips);
  }
  useEffect(() => {
    const handleTimerUpdate = (data) => {
      const { gameName, roundDuration, newTimer } = data;
      if (gameName === "coinFlip" && roundDuration === duration) {
        setTimer(newTimer);
      }
    };

    const handleRoundFreeze = (data) => {
      const { gameName, roundDuration } = data;
      if (gameName === "coinFlip" && roundDuration === duration) {
        setTimer("roundFreeze");
      }
    };

    const handleResultBroadcast = async (
      gameName,
      roundDuration,
      parsedResults
    ) => {
      if (gameName === "coinFlip" && roundDuration === duration) {
        const fetchedProfile = await fetch(
           `${Base_Url}/profile/getProfile`,
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
          alertToast('Error occured while fetching details','error');
        }
        const parsedProfile = await fetchedProfile.json();
        setProfile(parsedProfile);
        setPastResults(parsedResults);
        handleCoinFlip(parsedResults[0]);
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
    setSelectedValueHeads((prevValue) => prevValue + 100);
  };

  const handleDecrementHeads = () => {
    setSelectedValueHeads((prevValue) =>
      prevValue > 100 ? prevValue - 100 : prevValue
    );
  };

  const handleIncrementTails = () => {
    setSelectedValueTails((prevValue) => prevValue + 100);
  };

  const handleDecrementTails = () => {
    setSelectedValueTails((prevValue) =>
      prevValue > 100 ? prevValue - 100 : prevValue
    );
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
           `${Base_Url}/bets/makeBet`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              gameName: "coinFlip",
              roundDuration: duration,
              betAmount: numValue,
              betChoice: choice,
            }),
          }
        );
        const parsedRes = await response.json();
        if (response.ok) {
          setProfile({ ...profile, balance: parsedRes.updatedBalance });
          alertToast(parsedRes.message, "success");
          const alertDetails = {
            duration: duration,
            gameName: "coinFlip",
            choice: choice,
          };
          sessionStorage.setItem("AlertDetails", JSON.stringify(alertDetails));
          getSlips();
        }
        else if(response.status===403){
          navigate('/login');
        }
         else if (response.status === 400) {
          alertToast(parsedRes, "error");
        }
      } catch (error) {
        alertToast("Unable to place bet", "error");
      }
    } else {
      alertToast("Invalid input", "warning");
    }
  };

  return (
    <div className="coinFlipgame">
      {/* container-fluid */}
      <Gamenav />

      <div className="leftBox">
        <div className="text-center">
          <div className="d-none d-sm-block">
            <button className="coin m-3">COIN FLIP</button>
          </div>
        </div>

        <div className="d-flex justify-content-center sidebar-container">
          <div className="">
            <div className="whiteBox">
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
                            {result === 1 ? "Head" : "Tail"}
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
        {/* <div className="d-flex justify-content-center">
          <BetSlip />
        </div> */}
      </div>

      <div className="gameInterface">
        <div className="gameInnerBox">
          <div className="time d-flex justify-content-around">
            <button
              className={`timeBtn mt-2`}
              style={{
                backgroundColor: duration === 1 ? "gold" : "black",
                color: duration === 1 ? "black" : "white",
              }}
              onClick={() => setDuration(1)}
            >
              1 MIN
            </button>
            <button
              className={`timeBtn mt-2`}
              style={{
                backgroundColor: duration === 3 ? "gold" : "black",
                color: duration === 3 ? "black" : "white",
              }}
              onClick={() => setDuration(3)}
            >
              3 MIN
            </button>
            <button
              className={`timeBtn mt-2`}
              style={{
                backgroundColor: duration === 5 ? "gold" : "black",
                color: duration === 5 ? "black" : "white",
              }}
              onClick={() => setDuration(5)}
            >
              5 MIN
            </button>
            <button
              className={`timeBtn mt-2`}
              style={{
                backgroundColor: duration === 10 ? "gold" : "black",
                color: duration === 10 ? "black" : "white",
              }}
              onClick={() => setDuration(10)}
            >
              10 MIN
            </button>
          </div>

          <div className="d-flex justify-content-center"></div>
          <div className="desc text-center mt-3">
            <h2>PLEASE WAIT UNTIL THE TIMER STARTS</h2>
          </div>
          <div className="d-flex justify-content-center">
            <div className="small-timer-display d-lg-none">
              {formatTime(timer)}
            </div>
          </div>
          <div className="d-flex justify-content-center m-4">
            <div id="coin" className={flipResult}>
              {/* onClick={handleCoinFlip} */}
              <div className="side-a"></div>
              <div className="side-b"></div>
            </div>
          </div>
          <div className="desc text-center m-5">
            <h4>CHOOSE YOUR SIDE</h4>
          </div>

          <div className="headsAndTails d-flex justify-content-evenly">
            <div>
              <button className="forheads">FOR HEADS</button>
              <div className="selection-box m-2">
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
                  className="select-btn-heads"
                  onClick={() => {
                    handleBet(duration, selectedValueHeads, "head");
                  }}
                >
                  SELECT
                </button>
              </div>
            </div>
            <div className="tailsDiv">
              <button className="fortails">FOR TAILS</button>
              <div className="selection-box m-2">
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
                    200{" "}
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
                  className="select-btn-tails"
                  onClick={() => {
                    handleBet(duration, selectedValueTails, "tail");
                  }}
                >
                  SELECT
                </button>
              </div>
            </div>
            <div className="verticalwhiteBox d-block d-lg-none m-3">
              <div className="d-flex flex-column align-items-center mt-1">
                <span style={{ color: "black" }}>ROUND HISTORY:</span>
                <div className="CoinInnerBox text-center mt-2">
                  {Array.isArray(pastResults) && pastResults.length > 0 ? (
                    <div className="d-flex flex-column align-items-center">
                      <span></span>
                      {pastResults.map((result, index) => (
                        <span key={index} className="pastResult my-1">
                          {/* Render result details */}
                          {result === 1 ? "Heads" : "Tails"}
                        </span>
                      ))}
                      <span></span>
                    </div>
                  ) : (
                    <div>No past results available.</div>
                  )}
                </div>
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
