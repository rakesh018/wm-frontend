import React, { useState, useEffect } from "react";
import { AdminNavbar } from "../AdminPages/AdminHome/AdminNavbar";
import { AdminSidebar } from "../AdminPages/AdminHome/AdminSidebar";
import "./chooseWinning.css"; // Use the same CSS for consistency
import socket from "../../adminSocket"; // Ensure this path is correct
import { alertToast } from "../../alertToast";

export const TraderGamePage = () => {
  const [duration, setDuration] = useState(1); // Initial duration
  const [timer, setTimer] = useState(0);
  const [currentUpValue, setCurrentUpValue] = useState(0);
  const [currentDownValue, setCurrentDownValue] = useState(0);

  // Handle incoming socket events
  const handleTimerUpdate = (data) => {
    const { gameName, roundDuration, newTimer, betAmount0, betAmount1 } = data;
    if (gameName === "stockTrader" && roundDuration === duration) {
      if (!newTimer) {
        setTimer("roundFreeze");
        return;
      }
      setTimer(newTimer);
      setCurrentUpValue(betAmount1);
      setCurrentDownValue(betAmount0);
    }
  };

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
          gameName: "stockTrader",
          roundDuration: duration,
          modifiedResult: result,
        }),
      }
    );
    const parsedRes = await res.json();
    if (res.ok) {
      alertToast(
        `Result modified : Trader-${duration}min-${result ? "Up" : "Down"}`,
        "success"
      );
    } else {
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
              <button className="coinFlip-Winning">TRADER</button>
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
                  <h3>TOTAL VALUE IN TRADING GAME:</h3>
                </u>
              </div>
              <div className="d-flex justify-content-evenly">
                <div className="onHeads p-3">
                  UP
                  <div>{currentUpValue ? currentUpValue : 0}</div>
                </div>
                <div className="onTails p-3">
                  DOWN
                  <div>{currentDownValue ? currentDownValue : 0}</div>
                </div>
              </div>
              <div className="text-center mt-3">
                <u>
                  <h4>CHOOSE TRADING ACTION:</h4>
                </u>
              </div>
              <div className="d-flex justify-content-evenly">
                <button
                  className="onChoose p-3"
                  onClick={() => handleResult(1, duration)}
                >
                  FOR UP WIN
                </button>
                <button
                  className="onChoose p-3"
                  onClick={() => handleResult(0, duration)}
                >
                  FOR DOWN WIN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
