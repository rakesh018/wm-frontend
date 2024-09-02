import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../Navbar";
import { Sidebar } from "../../Sidebar";
import { BetSlip } from "../../BetSlip";
import "./history.css";

export const History = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  if (!token) {
    navigate('/login');
  }

  // Handler for button clicks
  const handleButtonClick = (path) => {
    navigate(path);
  };

  return (
    <div>
      <Navbar />
      <div className="container historyBox mt-2">
        <div className="button-container">
          {/* Button to redirect to Bets page */}
          <button 
            className=" btn-primary big-btn"
            onClick={() => handleButtonClick('/betHistory')}
          >
            Bets History
          </button>

          {/* Button to redirect to Transactions page */}
          <button 
            className=" btn-primary big-btn"
            onClick={() => handleButtonClick('/transactionHistory')}
          >
            Transaction History
          </button>

          {/* Button to redirect to Leaderboard page */}
          <button 
            className=" btn-primary big-btn"
            onClick={() => handleButtonClick('/leaderboard')}
          >
            Leaderboard
          </button>
        </div>
      </div>
      <Sidebar />
      <div className="d-none d-lg-block">
        <BetSlip />
      </div>
    </div>
  );
};
