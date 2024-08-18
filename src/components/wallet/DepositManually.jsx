import React, { useState, useEffect } from "react";
import { Sidebar } from "../../Sidebar";
import { Navbar } from "../../Navbar";
import { BetSlip } from "../../BetSlip";
import "./wallet.css";
import { useNavigate } from "react-router-dom";
import { alertToast } from "../../alertToast";

export const DepositManually = () => {
  const [upiId, setUpiId] = useState("");
  const [qrImage, setQrImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepositInfo = async () => {
      try {
        const response = await fetch(
          "https://server.trademax1.com/payments/get-upi-details",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization:`Bearer ${localStorage.getItem("token")}` ,
            },
          }
        );
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
                    onClick={() => navigate("/depositAmount")}
                  >
                    MAKE PAYMENT REQUEST
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Sidebar />
      <div className="d-none d-lg-block">
     <BetSlip />
     </div>
    </div>
  );
};