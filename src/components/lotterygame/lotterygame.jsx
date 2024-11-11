import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Gamenav } from "../games/Gamenav";
import { Navbar } from "../../Navbar";
import { Sidebar } from "../../Sidebar";
import { BetSlip } from "../../BetSlip";
import firstprise from "../../assets/price1.png";
import secondprise from "../../assets/price2.png";
import thirdprice from "../../assets/price3.png";
import { alertToast } from "../../alertToast";
import Base_Url from "../../config";

import "./lottery.css";

export const LotteryGame = () => {
  const token = localStorage.getItem("token");
  const [lotterydata, setlotterydata] = useState();
  const [countdownSeconds, setCountdownSeconds] = useState(null);

  const navigate = useNavigate();
  const boxes = Array.from({ length: 100 }, (_, index) => index + 1);

  useEffect(() => {
    GetLotteryDetails();

    // Start the countdown interval
    const interval = setInterval(() => {
      setCountdownSeconds((prevSeconds) => {
        if (prevSeconds > 0) return prevSeconds - 1;
        else {
          clearInterval(interval); // Stop the countdown at 0
          return 0;
        }
      });
    }, 1000);

    // Check if the script is already present; if not, create and load it
    if (!document.getElementById("tickcounter-sdk")) {
      const script = document.createElement("script");
      script.id = "tickcounter-sdk";
      script.src = "//www.tickcounter.com/static/js/loader.js";
      document.body.appendChild(script);
    }

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Convert seconds to hours, minutes, and seconds
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  const Makebet = async () => {
    try {
      const response = await fetch(`${Base_Url}/bets/makeBet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          gameName: "lottery",
          roundDuration: 1440,
          betAmount: 100,
          betChoice: "random",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alertToast("Bought Lottery successfully", "success"); // Show success toast
        await GetLotteryDetails();
      } else {
        alertToast(data.error, "error"); // Show error toast
      }
    } catch (error) {
      alertToast("An error occurred while making bet.", "error"); // Show error toast
    }
  };

  const GetLotteryDetails = async () => {
    try {
      const response = await fetch(`${Base_Url}/bets/lottery-home`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setlotterydata(data);
        setCountdownSeconds(data.ttl);
        console.log(data);
      } else {
        alertToast("Failed fetch lottery info.", "error");
      }
    } catch (error) {
      console.log(error);
      alertToast("Failed to fetch lottery data.", "error");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container-fluid lottery-main-bg-container">
        <div className="row">
          {/* <div className=""> */}
          <div className="col-12 prizes-bg  d-md-none">
            <div className="price-bg-container">
              <img src={firstprise} />
              <div>
                <p className="prize-heading">1st Prize</p>
                <p className="prize-prize">7000/-</p>
              </div>
            </div>
            <div className="price-bg-container">
              <img src={secondprise} />
              <div>
                <p className="prize-heading">2nd Prize</p>
                <p className="prize-prize">2000/-</p>
              </div>
            </div>
            <div className="price-bg-container">
              <img src={thirdprice} />
              <div>
                <p className="prize-heading">3rd Prize</p>
                <p className="prize-prize">1000/-</p>
              </div>
            </div>
          </div>
          <div className="col-12 timer-bg">
            <button
              onClick={() => navigate("/home")}
              className="lottery-btn-back"
            >
              Back
            </button>

            <div className="prizes-bg hide-prizebg d-none d-md-flex">
              <div className="price-bg-container">
                <img src={firstprise} />
                <div>
                  <p className="prize-heading">1st Prize</p>
                  <p className="prize-prize">7000/-</p>
                </div>
              </div>
              <div className="price-bg-container">
                <img src={secondprise} />
                <div>
                  <p className="prize-heading">2nd Prize</p>
                  <p className="prize-prize">2000/-</p>
                </div>
              </div>
              <div className="price-bg-container">
                <img src={thirdprice} />
                <div>
                  <p className="prize-heading">3rd Prize</p>
                  <p className="prize-prize">1000/-</p>
                </div>
              </div>
            </div>

            <div className="timer-time-bg">
              <p className="lottery-timer-heading">Lottery Live</p>
              <p className="timer-time">
                {" "}
                {countdownSeconds !== null
                  ? formatTime(countdownSeconds)
                  : "Loading..."}
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-9">
            <div className="grid-container">
              {boxes.map((id) => {
                //  console.log(id)
                const highlightcard = lotterydata?.highlightedBets.some(
                  (obj) => obj.choice === id
                );
                return (
                  <div
                    key={id}
                    className={`grid-box ${
                      highlightcard ? "highlightbox" : ""
                    }`}
                  >
                    {id}
                  </div>
                );
              })}
            </div>
            <div className="text-center mt-3">
              <button onClick={() => Makebet()} className="lottery-btn">
                Get Ticket (100)
              </button>
            </div>
          </div>
          <div className="col-12 col-md-3 mb-3 mt-4 mt-md-0">
            <h1 className="betslips-heading">Your Lotteries</h1>
            <div className="tickets-bg-container">
              {lotterydata?.lotteryBets?.length <= 0 ? (
                <div>No Bets</div>
              ) : (
                lotterydata?.lotteryBets.map((each) => {
                  const { betStatus, betChoice } = each;

                  return (
                    <div className="ticket-bg">
                      <div className="ticket-details">
                        <p className="ticket-uid">
                          BetCode : <span>{each.betCode}</span>
                        </p>
                        <p className="ticket-amount">
                          Amount : <span>100</span>
                        </p>
                        <p className="ticket-status">
                          Status :{" "}
                          <span className={`${betStatus}`}>
                            {each.betStatus}
                          </span>
                        </p>
                      </div>

                      <div className="barcode">
                        <div className="bar thin"></div>
                        <div className="bar thick"></div>
                        <div className="bar medium"></div>
                        <div className="bar thin"></div>
                        <div className="bar thick"></div>
                        <div className="bar medium"></div>
                        <div className="bar thick"></div>
                        <div className="bar thin"></div>
                        <div className="bar thick"></div>
                        <div className="bar medium"></div>
                        <div className="bar thin"></div>
                        <div className="bar thick"></div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
