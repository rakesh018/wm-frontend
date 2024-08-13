import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "../../Navbar";
import { Sidebar } from "../../Sidebar";
import { BetSlip } from "../../BetSlip";
import "./history.css";

export const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  
  useEffect(() => {
    const fetchHistoryData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://server.trademax1.com/profile/get-betting-history?page=${page}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const { paginatedBets, totalPages } = data;
        const repaginatedBets=paginatedBets.map((bet)=>{
            const newdate=new Date(bet.createdAt);
            if(bet.isWin){
                bet.color='green';
                bet.finalAmount=bet.winningAmount;
            }
            else{
                bet.color='red';
                bet.finalAmount=bet.betAmount;
            }
            return bet.createdAt=newdate.toLocaleString();
        })
        setHistoryData((prev) => [...prev, ...paginatedBets]);
        // Check if there's more data to fetch
        setHasMore(page < totalPages);
      } catch (error) {
        console.error("Error fetching history data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoryData();
  }, [page]);

  const lastHistoryElementRef = useRef();

  useEffect(() => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    const callback = (entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    };
    observer.current = new IntersectionObserver(callback);
    if (lastHistoryElementRef.current) {
      observer.current.observe(lastHistoryElementRef.current);
    }
  }, [loading, hasMore]);

  return (
    <div>
      <Navbar />
      <div className="container historyBox mt-2">
        <div>
          <button className="historybtn">HISTORY</button>
        </div>
        <div className="d-flex justify-content-evenly mt-3 me-2">
          <div className="history1 no-scrollbar">
            <button className="game1 p-2 m-2">Bets</button>
            <div className="d-flex justify-content-evenly">
              <div>Date</div>
              <div>Money</div>
            </div>
            {historyData
              .map((item, index) => (
                <div className="d-flex justify-content-evenly" key={item._id}>
                  <div>{item.createdAt.toLocaleString()}</div>
                  <div style={{color:item.color, fontWeight:"bold"}}>{item.finalAmount}</div>
                </div>
              ))}
          </div>
          <div className="history2 no-scrollbar">
            <button className="game2 p-2 m-2">Transactions</button>
            <div className="d-flex justify-content-evenly">
              <div>Date</div>
              <div>Money</div>
            </div>
            {historyData
              .filter((item) => item.game === "Trader")
              .map((item, index) => (
                <div className="d-flex justify-content-evenly" key={index}>
                  <div>{item.date}</div>
                  <div>{item.money}</div>
                </div>
              ))}
            {historyData.filter((item) => item.game === "Trader").length ===
              0 && <div className="text-center">NO RECORDS FOUND</div>}
          </div>
        </div>
        {loading && <div className="text-center mt-4">Loading...</div>}
        <div ref={lastHistoryElementRef} />{" "}
        {/* This div is used to trigger the observer */}
      </div>
      <Sidebar />
      <BetSlip />
    </div>
  );
};
