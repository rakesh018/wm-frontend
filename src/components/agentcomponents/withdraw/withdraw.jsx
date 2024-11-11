import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../../Navbar";
import { Sidebar } from "../../../Sidebar";
// import { BetSlip } from "../../BetSlip";
import withdraw from "../../../images/withdraw.png";
import { useRecoilState } from "recoil";
import { agentProfileAtom } from "../../../atoms";
import "../../wallet/wallet.css"; // Assuming you have a CSS file for styling
import { alertToast } from "../../../alertToast";
import Base_Url from "../../../config";
import "./agentwithdraw.css"
import { AgentNavbar } from "../agentnav";


export const AgentWithdrawAmount = () => {
  const token = localStorage.getItem("agentToken");

  const navigate = useNavigate();
  const [profile,setAdminData]=useState("");

  // fetch admin _____
  useEffect(() => {
    console.log("entered to fetch")
    const fetchAgentProfile=async()=>{
        const fetchedProfile = await fetch(
            `${Base_Url}/agent/agent-profile`,
           {
             method: "GET",
             headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
             },
           }
         );
    
         const responsedata=await fetchedProfile.json();
         setAdminData(responsedata)
         console.log(responsedata)
         if(fetchedProfile.status===403){  
          alertToast('failed to fetch profile data') 
         }
    }
    
    fetchAgentProfile()
  }, []);

  if (!token) {
    navigate("/agentlogin");
  }
  console.log(agentProfileAtom)
  // const [profile, setProfile] = useRecoilState(adminData);
  const [accountInfo, setAccountInfo] = useState({
    accountNumber: "",
    ifscCode: "",
    bankName: "",
  });
  const [amount, setAmount] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  console.log(profile)

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
    if (
      !amount ||
      !accountInfo.accountNumber ||
      !accountInfo.ifscCode ||
      !accountInfo.bankName
    ) {
      setErrorMessage("Please fill all the fields.");
      return;
    }

    try {
      const response = await fetch(
         `${Base_Url}/agent/withdrawal`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: ` Bearer ${localStorage.getItem("agentToken")}`, // Add the token here
          },
          body: JSON.stringify({
            amount,
            bankName: accountInfo.bankName,
            accountNumber: accountInfo.accountNumber,
            ifscCode: accountInfo.ifscCode,
          }),
        }
      );
      if (response.status === 403) {
        navigate("/agentlogin");
      }
      const result = await response.json();
      console.log(result)
      if (!response.ok) {
        alertToast(`${result.error}`, "error");
        return;
      }
      const res = await fetch( `${Base_Url}/agent/agent-profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("agentToken")}`,
        },
      }); //to simulate the delay artificially so to check loading
      if (res.status === 403) {
        navigate("/agentlogin");
      }
      const parsedRes = await res.json();
      setAdminData(parsedRes);
      alertToast("Withdraw request created", "success");
    } catch (error) {
      console.log(error.message)
      alertToast("Withdraw request failed", "error");
    }
  };

  return (
    <div>
      <AgentNavbar />
      <button onClick={()=>navigate("/agenthome")} className="withdraw-backbutton">back</button>

      <div className="container notificationBox agentwithdraw-bg mt-2 col-12">
        <button className="notificationBtn ms-3">WITHDRAW</button>
        <div className="innerNotificationBox m-3 p-3 text-center">
          <div className="row align-items-center text-center mb-0">
            {/* <div className="col-md-4 d-flex justify-content-end">
              <img src={withdraw} alt="Withdraw" className="withdrawImage" />
            </div> */}
            <div className="col-md-12 text-center">
              <h1 className="totalbalance-headin-bg">
                <u className="totalbalance-headin">TOTAL BALANCE: {profile.balance}</u>
              </h1>
            </div>
          </div>
          <div>
            <div className="row">
              <div className="col-md-12">
                <div className="accountDiv">
                  <div className="mb-2 withdrawable">
                    <div>
                      <strong>WITHDRAWABLE AMOUNT :  {profile?.withdrawableBalance
                        ? profile.withdrawableBalance
                        : 0} </strong>
                    </div>
                    <div className="small-font">(Note : Winning Amount + Referral Amount)</div>
                  </div>
                  <div className="mb-2">
                    <input
                    className="age-width-input"
                      id="amount"
                      placeholder="ENTER AMOUNT"
                      type="number"
                      value={amount}
                      onChange={handleAmountChange}
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      className="age-width-input"
                      id="accountNumber"
                      placeholder="ACCOUNT NUMBER"
                      type="text"
                      value={accountInfo.accountNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      className="age-width-input"
                      id="bankName"
                      placeholder="BANK NAME"
                      type="text"
                      value={accountInfo.bankName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      className="age-width-input"
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
                    <label className="click-check"> CLICK TO SAVE THE INFORMATION</label>
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

    </div>
  );
};
