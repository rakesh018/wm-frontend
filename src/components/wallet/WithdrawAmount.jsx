import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../Navbar";
import { Sidebar } from "../../Sidebar";
import { BetSlip } from "../../BetSlip";
import withdraw from "../../images/withdraw.png";
import { useRecoilState } from "recoil";
import { profileAtom } from "../../atoms";
import "./wallet.css"; // Assuming you have a CSS file for styling
import { alertToast } from "../../alertToast";

export const WithdrawAmount = () => {
  const navigate = useNavigate();
  const [profile,setProfile] = useRecoilState(profileAtom);

  const [accountInfo, setAccountInfo] = useState({
    accountNumber: "",
    ifscCode: "",
    bankName: "",
  });
  const [amount, setAmount] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSaveInfoChange = (event) => {
    setSaveInfo(event.target.checked);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setAccountInfo((prevInfo) => ({
      ...prevInfo,
      [id]: value,
    }));
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    if (!amount || !accountInfo.accountNumber || !accountInfo.ifscCode || !accountInfo.bankName) {
      setErrorMessage("Please fill all the fields.");
      return;
    }

    try {
      const response = await fetch("https://server.trademax1.com/payments/withdrawal-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Add the token here
        },
        body: JSON.stringify({
          amount,
          bankName:accountInfo.bankName,
          accountNumber:accountInfo.accountNumber,
          ifscCode:accountInfo.ifscCode
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        alertToast(`${result.error}`,'error');
        return;
      }
      const res = await fetch(
        "https://server.trademax1.com/profile/getProfile",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ); //to simulate the delay artificially so to check loading
      const parsedRes=await res.json();
      setProfile(parsedRes);
      alertToast('Withdraw request created','success');
    } catch (error) {
      alertToast('Withdraw request failed','error');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container notificationBox mt-2 col-12">
        <button className="notificationBtn ms-3">WITHDRAW</button>
        <div className="innerNotificationBox m-3 p-3 text-center">
          <div className="row align-items-center mb-0">
            <div className="col-md-4 d-flex justify-content-end">
              <img src={withdraw} alt="Withdraw" className="withdrawImage" />
            </div>
            <div className="col-md-6">
              <h1>
                <u>TOTAL BALANCE: {profile.balance}</u>
              </h1>
            </div>
          </div>
          <div>
            <div className="row">
              <div className="col-md-12">
                <div className="accountDiv">
                  <div className="mb-2">
                    <input
                      id="amount"
                      placeholder="ENTER AMOUNT"
                      type="number"
                      value={amount}
                      onChange={handleAmountChange}
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      id="accountNumber"
                      placeholder="ACCOUNT NUMBER"
                      type="text"
                      value={accountInfo.accountNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      id="bankName"
                      placeholder="BANK NAME"
                      type="text"
                      value={accountInfo.bankName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      id="ifscCode"
                      placeholder="IFSC CODE"
                      type="text"
                      value={accountInfo.ifscCode}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      checked={saveInfo}
                      onChange={handleSaveInfoChange}
                    />
                    <label> CLICK TO SAVE THE INFORMATION</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {errorMessage && <p className="text-danger">{errorMessage}</p>}

          <div>
            <button className="withdrawContinue" onClick={handleWithdraw}>
              SAVE
            </button>
          </div>
        </div>
      </div>
      <Sidebar />
      <BetSlip />
    </div>
  );
};
