import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./statistics.css";
import { FaTag } from "react-icons/fa6";
import statsimg from "../../../assets/agent-stats-img.svg";
import { FaUsersGear } from "react-icons/fa6";
import { TiArrowBackOutline } from "react-icons/ti";
import Base_Url from "../../../config";
import { alertToast } from "../../../alertToast";
import { Pagination } from "../../AdminPages/AdminHome/Pagination";

export const AgentStats = () => {
  const navigate = useNavigate();

  const [data, setData] = useState();
  const [lessbalance, setlessbalance] = useState(false);
  const [showCopyNotification, setShowCopyNotification] = useState(false);
  const [referees, setReferees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const paginate = (pageNumber) => {setCurrentPage(pageNumber)};

  const token = localStorage.getItem("agentToken");
  if (!token) {
    navigate("/agentlogin");
  }

  useEffect(() => {
    const fetchagentstats = async () => {
      const fetchedProfile = await fetch(
        `${Base_Url}/agent/statistics/basic-data`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responsedata = await fetchedProfile.json();
      setData(responsedata);
      const balance = Number(responsedata?.profile?.balance ?? 0);
      const withdrawableBalance = Number(
        responsedata?.profile?.withdrawableBalance ?? 0
      );
      const nonwithdrbalance = balance ;
      if (nonwithdrbalance <= 0) {
        setlessbalance(true);
      }

      if (fetchedProfile.status === 403) {
        navigate("/agentlogin");
      }
    };

    fetchagentstats();
  }, []);

  useEffect(() => {
    const fetchinvites = async () => {
      
      const fetchedProfile = await fetch(
        `${Base_Url}/agent/statistics/referees`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responsedata = await fetchedProfile.json();
      setReferees(responsedata.refereeStats);
      setCurrentPage(responsedata.currentPage)
      setTotalPages(responsedata.totalPages)

      if (fetchedProfile.status === 403) {
        navigate("/agentlogin");
      }
    };

    fetchinvites();
  }, [currentPage]);

  function handleCopyReferralLink() {
    const text = `https://trademax1.com/register?referral=${data?.profile.referralCode}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          alertToast("Text copied to clipboard!", "success");
          setShowCopyNotification(true);
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
          fallbackCopyText(text);
        });
    } else {
      fallbackCopyText(text); // Fallback for unsupported browsers
    }
  }

  function fallbackCopyText(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
      const successful = document.execCommand("copy");
      const msg = successful
        ? "Text copied to clipboard!"
        : "Failed to copy text";
      alertToast("Link copied to clipboard", "success");
    } catch (err) {
      console.error("Fallback: Failed to copy text", err);
    }

    document.body.removeChild(textarea);
  }

  const nonwithdrbalance = Number(data?.profile?.balance ?? 0);
  const withdrawableBalance = Number(data?.profile?.withdrawableBalance ?? 0);


  return (
    <div className="container-fluid stats-bg-container">
      <div className="row mb-5 mt-5">
        <div className=" col-12 stats-top-section">
          <button
            onClick={() => navigate("/agenthome")}
            className="stats-backbutton"
          >
            <TiArrowBackOutline />
          </button>

          <img src={statsimg} />
          <h1>Agent system</h1>
          <p>Funds will be added to your referral balance.</p>
          <p>Received money can be withdrawn.</p>
          <span>
            5% of all replenishments <FaTag />
          </span>
        </div>
      </div>

      <div className="row">
        <div className="stats-bottom-left-section col-12 col-md-4">
          <div className="stats-left-balance-bg">
            <h1 className="balance-heading-stats">Withdrawable Balance</h1>
            <h1 className="balance-heading-money">
              ₹{data?.profile?.withdrawableBalance}
            </h1>
            <p>Min. withdrawal ₹1000</p>
            <button>Withdraw</button>
          </div>
          <div className="stats-left-balance-bg">
            <div>
              <h1 className="balance-heading-stats">
                Non-Withdrawable Balance
              </h1>
              {lessbalance && (
                <p className="balance-stats-tooltip">
                  * Please make a deposit to replenish your funds. Otherwise,
                  you won’t be eligible to receive profits earned
                  from your referrals.
                </p>
              )}
            </div>
            <h1 className="balance-heading-money">₹{nonwithdrbalance}</h1>
          </div>
          <div className="stats-left-balance-bg">
            <h1 className="balance-heading-stats">Your referral link</h1>

            <button onClick={handleCopyReferralLink}>Copy Referal</button>
            {showCopyNotification && (
              <div className="copy-notification-stats">
                Referral link copied!
              </div>
            )}
          </div>
        </div>

        <div className="stats-bottom-right-section col-12 col-md-8">
          <div className="stats-right-inner-container">
            <div className="stas-right-invest-bg stas-right-inner">
              <p>Invited</p>
              <p className="right-inner-para">{data?.invited}</p>
            </div>
            <div className="stas-right-current-bg stas-right-inner">
              <p>Current month income</p>
              <p className="right-inner-para">₹{data?.monthlyIncome}</p>
            </div>
            <div className="stas-right-income-bg stas-right-inner">
              <p>Total income</p>
              <p className="right-inner-para">₹{data?.totalIncome}</p>
            </div>
          </div>

          {/* <div className="stats-right-innter-bottom-container"> */}
          <div className="table-responsive  stats-right-innter-bottom-container">
            <table className="table table-striped table-bordered admin-table">
              <thead>
                <tr>
                  <th>UID</th>
                  <th>Total Bets</th>
                  <th>total Income</th>
                </tr>
              </thead>
              <tbody>
                {referees.length > 0 ? (
                  referees.map((row) => (
                    <tr>
                      <td>{row?.uid}</td>
                      <td>{row?.totalBets}</td>
                      <td>{row?.totalIncome}</td>
                    </tr>
                  ))
                ) : (
                  <div>
                    <FaUsersGear className="no-user-referals" />
                    <p className="no-user-referal-para">
                      You have not invited any referrals yet
                    </p>
                  </div>
                )}
              </tbody>
            </table>
            <div className="d-flex justify-content-center pagination-container">
                <Pagination
                  totalPages={totalPages}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              </div>
          </div>


          {/* </div> */}
        </div>
      </div>
    </div>
  );
};
