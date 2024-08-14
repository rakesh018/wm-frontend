import React, { useEffect } from "react";
import "./bet.css";
import { betSlipsAtom } from "./atoms";
import { useRecoilState } from "recoil";

export const BetSlip = () => {
  const [betDetails, setBetDetails] = useRecoilState(betSlipsAtom);
  useEffect(() => {
    async function getSlips() {
      const slips = await fetch(
        "https://server.trademax1.com/bets/get-bet-slips",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const parsedSlips = await slips.json();
      setBetDetails(parsedSlips);
    }
    getSlips();
  }, []);

  return (
    <div>
      {/* <Navbar /> */}
      <div className="container betBox text-center mt-5 d-none d-lg-block">
        <div>
          <button className="bet-sel mt-2">BET SLIPS</button>
        </div>

        <div className="betSelectionBox mt-3 no-scrollbar">
          <div className="betDetails no-scrollbar">
            {betDetails.bets && betDetails.bets.length > 0 ? (
              betDetails.bets.map((bet, index) => (
                <div key={index} className="betDetailBox m-2 p-2">
                  <div className="gameName"> {bet.gameName}</div>
                  <div className="roundDuration">
                    Round Duration: {bet.roundDuration}
                  </div>
                  <div className="betAmount">Bet Amount: {bet.betAmount}</div>
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
    </div>
  );
};
