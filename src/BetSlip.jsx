import React, { useEffect, useState } from "react";
import "./betSlip.css";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { betSlipsAtom } from "./atoms";
import { useRecoilState } from "recoil";

export const BetSlip = () => {
  const [betDetails, setBetDetails] = useRecoilState(betSlipsAtom);
  const [localBets, setLocalBets] = useState([]);

  useEffect(() => {
    async function fetchBetSlips() {
      try {
        const response = await fetch(
          "https://server.trademax1.com/bets/get-bet-slips",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const parsedSlips = await response.json();
        setBetDetails(parsedSlips);
        setLocalBets(parsedSlips.bets || []);
      } catch (error) {
        console.error("Error fetching bet slips:", error);
      }
    }

    // Fetch the initial data
    fetchBetSlips();

    // Update every 10 seconds
    const interval = setInterval(fetchBetSlips, 10000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [setBetDetails]);

  useEffect(() => {
    // Countdown timer: Decrement the ttl for each bet locally every second
    const countdownInterval = setInterval(() => {
      setLocalBets((prevBets) =>
        prevBets.map((bet) => ({
          ...bet,
          ttl: bet.ttl > 0 ? bet.ttl - 1 : 0,
        }))
      );
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(countdownInterval);
  }, [localBets]);
  // const mapChoice=(gameName,mappedChoice)=>{
  //   if(gameName==='stockTrader'){
  //     return mappedChoice?'Up':'Down';
  //   }
  //   else if(gameName==='coinFlip'){
  //     return mappedChoice?'Head':'Tail';
  //   }
  // }
  return (
    <div>
      <div className="d-lg-none">
        <Navbar />
      </div>
      <div className="container betBox text-center mt-5 d-none d-lg-block">
        <div>
          <button className="bet-sel mt-2">BET SLIPS</button>
        </div>

        <div className="betSelectionBox mt-3 ">
          <div className="betDetails no-scrollbar">
            {localBets && localBets.length > 0 ? (
              localBets.map((bet, index) => (
                <div key={index} className="betDetailBox m-2 p-2">
                  <div className="gameName"> {bet.gameName}</div>
                  <div className="roundDuration">
                    Round Duration: {bet.roundDuration}
                  </div>
                  <div className="betAmount">Bet Amount: {bet.betAmount}</div>
                  <div className="choice">
                    Choice:{bet.gameName === "coinFlip"
                      ? bet.mappedChoice === 1
                        ? "Heads"
                        : "Tails"
                      : bet.gameName === "stockTrader"
                      ? bet.mappedChoice === 1
                        ? "Up"
                        : "Down"
                      : "Unknown Game"}
                  </div>
                  <div className="timeRemaining">
                    Time Remaining: {bet.ttl} seconds
                  </div>
                </div>
              ))
            ) : (
              <div className="text-white">No bets found</div>
            )}
          </div>
        </div>
      </div>
      <div
        className="betSlips  d-flex justify-content-center d-lg-none"
        style={{ display: "none" }}
      >
        <div className="betMobile text-center ">
          <div>
            <button className="bet-sel mt-2">BET SLIPS</button>
          </div>

          <div className="betSelectionBox ">
            <div className="betDetails " style={{ overflowY: "auto" }}>
              {localBets && localBets.length > 0 ? (
                localBets.map((bet, index) => (
                  <div key={index} className="betDetailBox m-2 p-2">
                    <div className="gameName"> {bet.gameName}</div>
                    <div className="roundDuration">
                      Round Duration: {bet.roundDuration}
                    </div>
                    <div className="betAmount">Bet Amount: {bet.betAmount}</div>
                    <div className="choice">Choice: {bet.mappedChoice}</div>
                    <div className="timeRemaining">
                      Time Remaining: {bet.ttl} seconds
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-white ">No bets found</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="d-lg-none">
        <Sidebar />
      </div>
    </div>
  );
};
