import React, { useState, useEffect } from "react";
import { Sidebar } from "../../../Sidebar";
import { Navbar } from "../../../Navbar";
import { BetSlip } from "../../../BetSlip";
import "../../wallet/wallet.css";
import { useNavigate } from "react-router-dom";
import { alertToast } from "../../../alertToast";
import Base_Url from "../../../config";

export const AdminDepositManually = () => {
  const navigate = useNavigate();
  const token=localStorage.getItem('agentToken');
  if(!token){
    navigate('/agentlogin');
  }
  const [upiId, setUpiId] = useState("");
  const [qrImage, setQrImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDepositInfo = async () => {
      try {
        const response = await fetch(
           `${Base_Url}/payments/get-upi-details`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization:`Bearer ${localStorage.getItem("token")}` ,
            },
          }
        );
        if(response.status===403){
          navigate('/agentlogin');
        }
        const data = await response.json();
        if (response.ok) {
          setUpiId(data.upiId);
          setQrImage(data.qrCode);
        } else {
          alertToast("Error fetching UPI details", "error");
        }
      } catch (error) {
        setError("Failed to load deposit information");
      } finally {
        setLoading(false);
      }
    };

    fetchDepositInfo();
  }, []);

  return (
    <div>
      <Navbar />
      <button onClick={()=>navigate("/agenthome")} className="withdraw-backbutton">back</button>

      <div className="container homeBox mt-2">
        <button className="featuredGames-btn">DEPOSIT MANUALLY</button>
        <div className="innerNotificationBox mt-3 text-center">
          <h2 className="m-3" >
            <u className="d-none d-md-block">DEPOSIT MONEY MANUALLY</u>
          </h2>
          {loading && <div>Loading...</div>}
          {error && <div className="error-text">{error}</div>}
          {!loading && !error && (
            <>
              <div>
                <h2>UPI ID: {upiId}</h2>
              </div>
              <div className="d-flex flex-column align-items-center m-4">
                {/* Resized QR code image */}
                <img
                  src={`${qrImage}?t=${new Date().getTime()}`}
                  alt="QR Code"
                  style={{ width: "100%", maxWidth: "200px", height: "200px" }}
                  className="img-fluid"
                />
                <div className="mt-3">
                  <h2>SCAN AND PAY</h2>
                  <button
                    className="makeRequest p-2"
                    onClick={() => navigate("/agentdepositeamount")}
                  >
                    MAKE PAYMENT REQUEST
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="d-none d-lg-block">
     </div>
    </div>
  );
};