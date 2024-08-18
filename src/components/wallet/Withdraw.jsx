import React from "react";
import { Navbar } from "../../Navbar";
import { useNavigate } from "react-router-dom";
import withdraw from "../../images/withdraw.png";
import { Sidebar } from "../../Sidebar";
import { BetSlip } from "../../BetSlip";
import { profileAtom } from "../../atoms";
import { useRecoilValue } from "recoil";

export const Withdraw = () => {
  const navigate = useNavigate();
  const token=localStorage.getItem('token');
  navigate('/login');
  const profile = useRecoilValue(profileAtom);
  return (
    <div>
      <Navbar />
      <div className=" container notificationBox mt-2 col-12 ">
        <button className="notificationBtn ms-3">DEPOSIT</button>
        <div className="innerNotificationBox m-3 p-3 text-center">
          <div>
            <h1>
              {" "}
              <u> TOTAL BALANCE : {profile.balance}</u>
            </h1>
            <div className="d-flex justify-content-start ms-3">
              <img src={withdraw} alt="" />
            </div>
            <div className="">
              <button
                className="withdraw "
                onClick={() => navigate("/withdrawAmount")}
              >
                BANK TRANSFER
              </button>
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