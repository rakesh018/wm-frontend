import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./history.css";
import { Navbar } from "../../Navbar";
import { Sidebar } from "../../Sidebar";
import { BetSlip } from "../../BetSlip";
import Base_Url from "../../config";

export const BettingHistory = () => {
  const navigate = useNavigate();
  const [betsData, setBetsData] = useState([]);
  const [betsPage, setBetsPage] = useState(1);
  const [betsLoading, setBetsLoading] = useState(false);
  const [betsHasMore, setBetsHasMore] = useState(true);
  const betsObserver = useRef();
  const lastBetsElementRef = useRef();

  useEffect(() => {
    const fetchBetsHistory = async () => {
      setBetsLoading(true);
      try {
        const response = await fetch(
          `${Base_Url}/profile/get-betting-history?page=${betsPage}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status === 403) {
          navigate("/login");
        } else if (!response.ok) {
          setBetsHasMore(false);
        }
        const data = await response.json();
        const { paginatedBets, totalPages } = data;
        console.log(data);
        const formattedBets = paginatedBets.map((bet) => {
          const newdate = new Date(bet.createdAt);
          if (bet.isWin) {
            bet.color = "green";
            bet.finalAmount = bet.winningAmount;
          } else {
            bet.color = "red";
            bet.finalAmount = bet.betAmount;
          }
          bet.createdAt = newdate.toLocaleDateString();
          return bet;
        });
        setBetsData((prev) => [...prev, ...formattedBets]);
        setBetsHasMore(betsPage < totalPages);
      } catch (error) {
        console.error("Error fetching betting history data:", error);
      } finally {
        setBetsLoading(false);
      }
    };

    fetchBetsHistory();
  }, [betsPage]);

  useEffect(() => {
    if (betsLoading) return;
    if (betsObserver.current) betsObserver.current.disconnect();
    const callback = (entries) => {
      if (entries[0].isIntersecting && betsHasMore) {
        setBetsPage((prev) => prev + 1);
      }
    };
    betsObserver.current = new IntersectionObserver(callback);
    if (lastBetsElementRef.current) {
      betsObserver.current.observe(lastBetsElementRef.current);
    }
  }, [betsLoading, betsHasMore]);

  return (
    <div>
      <Navbar />
      <div className="container mt-2 content-wrapper">
        <div className="d-flex justify-content-between align-items-center">
          <button className="historybtn">Betting History</button>
          {/* <button className="leaderbtn d-lg-none" onClick={() => navigate('/leaderboard')}>LEADER BOARD</button> */}
        </div>

        <div className="row mt-3">
          <div className="col-lg-9">
            <div className="row">
              {betsData &&
                betsData.map((item) => {
                  const { gameType } = item;

                  return (
                    <div className="col-lg-4 col-md-6 mb-4" key={item._id}>
                      <div className="card shadow-sm">
                        <div className="card-body">
                          <h5
                            className="card-title text-center"
                            style={{ color: item.color }}
                          >
                            {item.finalAmount}
                          </h5>
                          <p className="card-text">Date: {item.createdAt}</p>
                          <p className="card-text">Game: {item.gameType}</p>
                          <p className="card-text">
                            Duration:{" "}
                            {gameType == "lottery"
                              ? "1 Day"
                              : item.roundDuration + " mins"}
                          </p>
                          <p className="card-text">
                            {gameType === "lottery" ? (
                              <>Ticket: {item.choice}</>
                            ) : (
                              <>
                                Choice:{" "}
                                {item.gameType === "coinFlip"
                                  ? item.choice === 1
                                    ? "Heads"
                                    : "Tails"
                                  : item.gameType === "stockTrader"
                                  ? item.choice === 1
                                    ? "Up"
                                    : "Down"
                                  : "Unknown Game"}
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            {betsLoading && <div className="text-center mt-4">Loading...</div>}
            <div ref={lastBetsElementRef} /> {/* Trigger for bets observer */}
          </div>

          <Sidebar />
          <div className="col-lg-3 d-none d-lg-block">
            <BetSlip />
          </div>
        </div>
      </div>
    </div>
  );
};
