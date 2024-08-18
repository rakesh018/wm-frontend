import React, { useState, useEffect } from "react";
import { Navbar } from "../../Navbar";
import { Sidebar } from "../../Sidebar";
import { BetSlip } from "../../BetSlip";
import { CheckToken } from "../../checkToken";

export const LeaderBoard = () => {
  const [allTimeLeaderBoard, setAllTimeLeaderBoard] = useState([]);
  const [dailyLeaderBoard, setDailyLeaderboard] = useState([]);
  const token=CheckToken();
  useEffect(() => {
    async function fetchLeaderBoards() {
      try {
        const allTime = await fetch(
          "https://server.trademax1.com/profile/leaderboard/all-time-leaderboard",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const daily = await fetch(
          "https://server.trademax1.com/profile/leaderboard/daily-leaderboard",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const parsedAllTime = await allTime.json();
        const parsedDaily = await daily.json();
        console.log(parsedAllTime,parsedDaily);
        setAllTimeLeaderBoard(parsedAllTime);
        setDailyLeaderboard(parsedDaily);
      } catch (error) {
        console.error("Error occured while fetching leaderboard data.");
      }
    }
    fetchLeaderBoards();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container historyBox mt-2">
        <div>
          <button className="historybtn">Leader Board</button>
         
        </div>
        
        <div className="d-flex justify-content-evenly mt-3">
          <div className="history1 ">
            <button className="game1 p-2 m-2">All Time Leaderboard</button>
            <div className="d-flex justify-content-evenly">
              <div>
                NAME
                <div>
                  {allTimeLeaderBoard.leaderboardData
                    ?.map((item, index) => (
                      <div key={index}>
                        {index + 1}. {item.userId}
                      </div>
                    ))}
                </div>
              </div>
              <div>
                MONEY
                <div>
                  {allTimeLeaderBoard.leaderboardData
                    ?.map((item, index) => (
                      <div key={index}>{item.totalWinnings}</div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="history2">
            <button className="game2 p-2 m-2">Daily Leaderboard</button>
            <div className="d-flex justify-content-evenly">
              <div>
                NAME
                <div>
                  {dailyLeaderBoard.leaderboardData
                    ?.map((item, index) => (
                      <div key={index}>
                        {index + 1}. {item.userId}
                      </div>
                    ))}
                </div>
              </div>
              <div>
                MONEY
                <div>
                  {dailyLeaderBoard.leaderboardData
                    ?.map((item, index) => (
                      <div key={index}>{item.totalWinnings}</div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Sidebar />
      <div className="d-none d-lg-block">
     <BetSlip />
     </div>
    </div>
  );
};
