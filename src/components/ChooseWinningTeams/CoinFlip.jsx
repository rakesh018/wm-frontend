import React, { useState, useEffect } from "react";
import { AdminNavbar } from "../AdminPages/AdminHome/AdminNavbar";
import { AdminSidebar } from "../AdminPages/AdminHome/AdminSidebar";
import "./chooseWinning.css";
import socket from "../../adminSocket";
import { alertToast } from "../../alertToast";
import { useNavigate } from "react-router-dom";

export const CoinFlipGamePage = () => {
  const navigate = useNavigate();
  const adminToken = localStorage.getItem("adminToken");
  if (!adminToken) {
    navigate("/adminLogin");
  }
  const [duration, setDuration] = useState(1); // Initial duration
  const [timer, setTimer] = useState(0);
  const [currentHeadsValue, setCurrentHeadsValue] = useState(0);
  const [currentTailsValue, setCurrentTailsValue] = useState(0);

  // Handle incoming socket events
  const handleTimerUpdate = (data) => {
    const { gameName, roundDuration, newTimer, betAmount0, betAmount1 } = data;
    if (gameName === "coinFlip" && roundDuration === duration) {
      if (!newTimer) {
        setTimer("roundFreeze");
        return;
      }
      setTimer(newTimer);
      setCurrentHeadsValue(betAmount1);
      setCurrentTailsValue(betAmount0);
    }
  };
  // Placeholder for handling the result button
  const handleResult = async (result, duration) => {
    const res = await fetch(
      "https://server.trademax1.com/admin/games/change-game-result",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({
          gameName: "coinFlip",
          roundDuration: duration,
          modifiedResult: result,
        }),
      }
    );
    const parsedRes = await res.json();
     if(res.status===403){
      navigate('/adminLogin');
    }
    if (res.ok) {
      alertToast(
        `Result modified : Coin Flip-${duration}min-${
          result ? "Head" : "Tail"
        }`,
        "success"
      );
    } 
    else {
      alertToast(`${parsedRes.error}`, "error");
    }
  };

  useEffect(() => {
    // Listen to socket events
    socket.on("timerUpdate", handleTimerUpdate);
    socket.on("roundFreeze", handleTimerUpdate);
    // Cleanup on unmount
    return () => {
      socket.off("timerUpdate", handleTimerUpdate);
    };
  }, [duration, timer]);

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

  const handleSetRoundDuration = (duration) => {
    setDuration(duration);
    // Optionally send this info to the server or socket
  };

  return (
    <div className="chooseWinningContainer">
      <AdminNavbar />
      <AdminSidebar />
      <div className="container-fluid adminBox">
        <div className="row adminInnerBox">
          <div className="analysisDiv col m-2">
            <div>
              <button className="coinFlip-Winning">COIN FLIP</button>
              <div className="d-flex flex-row justify-content-around">
                <button
                  className={`choose ${duration === 1 ? "selected" : ""}`}
                  onClick={() => handleSetRoundDuration(1)}
                >
                  1 MIN
                </button>
                <button
                  className={`choose ${duration === 3 ? "selected" : ""}`}
                  onClick={() => handleSetRoundDuration(3)}
                >
                  3 MIN
                </button>
                <button
                  className={`choose ${duration === 5 ? "selected" : ""}`}
                  onClick={() => handleSetRoundDuration(5)}
                >
                  5 MIN
                </button>
                <button
                  className={`choose ${duration === 10 ? "selected" : ""}`}
                  onClick={() => handleSetRoundDuration(10)}
                >
                  10 MIN
                </button>
              </div>
              <div className="timer-display text-center mt-3">
                {formatTime(timer)}
              </div>
              <div className="text-center mt-3">
                <u>
                  <h3>TOTAL MONEY ON COIN FLIP GAME:</h3>
                </u>
              </div>
              <div className="d-flex justify-content-evenly">
                <div className="onHeads p-3">
                  ON HEADS
                  <div>{currentHeadsValue ? currentHeadsValue : 0}</div>
                </div>
                <div className="onTails p-3">
                  ON TAILS
                  <div>{currentTailsValue ? currentTailsValue : 0}</div>
                </div>
              </div>
              <div className="text-center mt-3">
                <u>
                  <h4>CHOOSE WINNING TEAM:</h4>
                </u>
              </div>
              <div className="d-flex justify-content-evenly">
                <button
                  className="onChoose p-3"
                  onClick={() => handleResult(1, duration)}
                >
                  FOR HEADS WIN
                </button>
                <button
                  className="onChoose p-3"
                  onClick={() => handleResult(0, duration)}
                >
                  FOR TAILS WIN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
