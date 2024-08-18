import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "../../Navbar";
import { Sidebar } from "../../Sidebar";
import { BetSlip } from "../../BetSlip";
import { useNavigate } from "react-router-dom";
import "./history.css";

export const History = () => {
  const navigate = useNavigate();
  const [historyData, setHistoryData] = useState([]); // for bets history
  const [transactionsData, setTransactionsData] = useState([]); // for transactions history
  const [betsPage, setBetsPage] = useState(1); // pagination for bets
  const [transactionsPage, setTransactionsPage] = useState(1); // pagination for transactions
  const [betsLoading, setBetsLoading] = useState(false); // loading state for bets
  const [transactionsLoading, setTransactionsLoading] = useState(false); // loading state for transactions
  const [betsHasMore, setBetsHasMore] = useState(true); // whether there are more bets to load
  const [transactionsHasMore, setTransactionsHasMore] = useState(true); // whether there are more transactions to load
  const betsObserver = useRef(); // observer for bets infinite scroll
  const transactionsObserver = useRef(); // observer for transactions infinite scroll
  const lastBetsElementRef = useRef(); // reference for last bet element
  const lastTransactionsElementRef = useRef(); // reference for last transaction element
  
  // Fetching bets history
  useEffect(() => {

    const fetchBetsHistory = async () => {
      setBetsLoading(true);
      try {
        const response = await fetch(
          `https://server.trademax1.com/profile/get-betting-history?page=${betsPage}`,
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

        setHistoryData((prev) => [...prev, ...formattedBets]);
        setBetsHasMore(betsPage < totalPages);
      } catch (error) {
        console.error("Error fetching history data:", error);
      } finally {
        setBetsLoading(false);
      }
    };

    fetchBetsHistory();
  }, [betsPage]);

  // Fetching transactions history
  useEffect(() => {
    const fetchTransactionsHistory = async () => {
      setTransactionsLoading(true);
      try {
        const response = await fetch(
          `https://server.trademax1.com/profile/get-transaction-history?page=${transactionsPage}`,
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
        const { paginatedTransactions, totalPages } = data;

        const formattedTransactions = paginatedTransactions.map((transaction) => {
          transaction.createdAt = new Date(transaction.createdAt).toLocaleDateString();
          if(transaction.status==='pending'){
            transaction.color='orange';
          }
          else if(transaction.status==='completed'){
            transaction.color='green';
          }
          else{
            //pending or rejected
            transaction.color='red';
          }
          return transaction;
        });

        setTransactionsData((prev) => [...prev, ...formattedTransactions]);
        setTransactionsHasMore(transactionsPage < totalPages);
      } catch (error) {
        console.error("Error fetching transactions data:", error);
      } finally {
        setTransactionsLoading(false);
      }
    };

    fetchTransactionsHistory();
  }, [transactionsPage]);

  // Observer for bets history infinite scroll
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

  // Observer for transactions history infinite scroll
  useEffect(() => {
    if (transactionsLoading) return;
    if (transactionsObserver.current) transactionsObserver.current.disconnect();
    const callback = (entries) => {
      if (entries[0].isIntersecting && transactionsHasMore) {
        setTransactionsPage((prev) => prev + 1);
      }
    };
    transactionsObserver.current = new IntersectionObserver(callback);
    if (lastTransactionsElementRef.current) {
      transactionsObserver.current.observe(lastTransactionsElementRef.current);
    }
  }, [transactionsLoading, transactionsHasMore]);

  return (
    <div>
      <Navbar />
      <div className="container historyBox mt-2">
        <div>
          <button className="historybtn">HISTORY</button>
          <button className="leaderbtn ms-5 d-lg-none" onClick={() => navigate('/leaderboard')}>LEADER BOARD</button>
        </div>
        
        <div className="d-flex justify-content-evenly mt-3 me-2">
          {/* Bets History */}
          <div className="history1 " style={{  overflowY: 'auto' }}>
            <button className="game1 p-2 m-2" >Bets</button>
            <div className="d-flex justify-content-evenly">
              <div>Date</div>
              <div>Money</div>
            </div>
            {historyData.map((item) => (
              <div className="d-flex justify-content-evenly" key={item._id}>
                <div>{item.createdAt}</div>
                <div style={{ color: item.color, fontWeight: "bold" }}>
                  {item.finalAmount}
                </div>
              </div>
            ))}
            {betsLoading && <div className="text-center mt-4">Loading...</div>}
            <div ref={lastBetsElementRef} /> {/* Trigger for bets observer */}
          </div>

          {/* Transactions History */}
          <div className="history2" style={{  overflowY: 'auto' }}>
            <button className="game2 p-2 m-2">Transactions</button>
            <div className="d-flex justify-content-evenly">
              <div>Date</div>
              <div>Money</div>
            </div>
            {transactionsData.map((item) => (
              <div className="d-flex justify-content-evenly" key={item._id}>
                <div>{item.createdAt}</div>
                <div style={{color:item.color,fontWeight:'bold'}}>{item.amount}</div>
              </div>
            ))}
            {transactionsLoading && (
              <div className="text-center mt-4">Loading...</div>
            )}
            <div ref={lastTransactionsElementRef} /> {/* Trigger for transactions observer */}
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
