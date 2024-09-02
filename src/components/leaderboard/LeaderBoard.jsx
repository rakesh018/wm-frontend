import React, { useState, useEffect } from "react";
import { Navbar } from "../../Navbar";
import { Sidebar } from "../../Sidebar";
import { BetSlip } from "../../BetSlip";
import { useNavigate } from "react-router-dom";
import "./leaderBoard.css"

export const LeaderBoard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  
  if (!token) {
    navigate('/login');
  }

  const [allTimeLeaderBoard, setAllTimeLeaderBoard] = useState([]);
  const [dailyLeaderBoard, setDailyLeaderboard] = useState([]);

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
        
        if (allTime.status === 403) {
          navigate('/login');
        }

        const parsedAllTime = await allTime.json();
        const parsedDaily = await daily.json();
        console.log(parsedAllTime, parsedDaily);

        setAllTimeLeaderBoard(parsedAllTime);
        setDailyLeaderboard(parsedDaily);
      } catch (error) {
        console.error("Error occurred while fetching leaderboard data.");
      }
    }

    fetchLeaderBoards();
  }, [token, navigate]);

  return (
    <div>
      <Navbar />
      <div className="container historyBox mt-2">
        {/* <div>
          <button className="historybtn">Leader Board</button>
        </div> */}

        <div className="leaderboard-section mt-3">
          {/* All Time Leaderboard */}
          <div className="history1 mb-4">
            <button className="game1 p-2 m-2">All Time Leaderboard</button>
            <div className="d-flex justify-content-evenly">
              <div>
                <strong>NAME</strong>
                <div>
                  {allTimeLeaderBoard.leaderboardData?.slice(0,10)?.map((item, index) => (
                    <div key={index}>
                      {index + 1}. {item.userId}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <strong>MONEY</strong>
                <div>
                  {allTimeLeaderBoard.leaderboardData?.slice(0,10)?.map((item, index) => (
                    <div key={index}>{item.totalWinnings}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Daily Leaderboard */}
          <div className="history2">
            <button className="game2 p-2 m-2">Daily Leaderboard</button>
            <div className="d-flex justify-content-evenly">
              <div>
                <strong>NAME</strong>
                <div>
                  {dailyLeaderBoard.leaderboardData?.slice(0,10)?.map((item, index) => (
                    <div key={index}>
                      {index + 1}. {item.userId}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <strong>MONEY</strong>
                <div>
                  {dailyLeaderBoard.leaderboardData?.slice(0,10)?.map((item, index) => (
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
