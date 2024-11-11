import { Navbar } from "../../../Navbar";
import { FaUser } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { RiLuggageDepositFill } from "react-icons/ri";
import { BiMoneyWithdraw } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { AgentNavbar } from "../agentnav";

import "./agenthome.css";

export const AgentHome = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("agentToken");

  if (!token) {
    navigate("/agentlogin");
  }
  return (
    <>
      <AgentNavbar />
      <div className="admin-home-bg">
        <div className="agent-home-cards-container">
          <div onClick={()=>navigate("/agentprofile")} className="agent-home-card-bg">
            <div className="agentcard-icon-container">
              <FaUser className="agentcard-icon" />
            </div>
            <h1>Profile</h1>
            <p>@GetDetails</p>
          </div>

          <div  onClick={()=>navigate("/agentstats")} className="agent-home-card-bg agent-card-2">
            <div className="agentcard-icon-container agent-card-iconbg-2">
              <IoStatsChart className="agentcard-icon" />
            </div>
            <h1>Statistics</h1>
            <p>Get your stats</p>
          </div>

          <div  onClick={()=>navigate("/agentdeposite")}  className="agent-home-card-bg agent-card-3">
            <div className="agentcard-icon-container agent-card-iconbg-3">
              <RiLuggageDepositFill className="agentcard-icon" />
            </div>
            <h1>Deposit </h1>
            <p>Get your deposits</p>
          </div>

          <div  onClick={()=>navigate("/agentwithdraw")} className="agent-home-card-bg agent-card-4">
            <div className="agentcard-icon-container agent-card-iconbg-4">
              <BiMoneyWithdraw className="agentcard-icon" />
            </div>
            <h1>Withdraw</h1>
            <p>Get your withdraws</p>
          </div>
        </div>
      </div>
    </>
  );
};
