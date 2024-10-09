import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AdminNavbar } from "./AdminNavbar";
import { AdminSidebar } from "./AdminSidebar";
import adminDeposit from "../../../images/adminTotalDeposit.png";
import adminWithdraw from "../../../images/adminTotalWithdraw.png";
import adminWallet from "../../../images/adminWallet.png";
import { alertToast } from "../../../alertToast";
import "./admin.css"; // Include custom CSS for modals
import { useNavigate } from "react-router-dom";
import Base_Url from "../../../config";

export const ViewUser = () => {
  const navigate = useNavigate();
  const adminToken = localStorage.getItem("adminToken");
  if (!adminToken) {
    navigate("/adminLogin");
  }
  const { uid } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showBanModal, setShowBanModal] = useState(false);

  //____admin more options models states______
  const [showMoreModal, setShowMoreModal] = useState(false);
  const [showViewPasModal, setSViewPassModal] = useState(false);
  const [showUpdtPasModal, setSUpdtPassModal] = useState(false);
  const [showLogasUserModal, setSLogasUserModal] = useState(false);
  const [showBetHisModal, setBetHisModal] = useState(false);
  const [showTranHisModal, setTranHisModal] = useState(false);




  const [balance, setBalance] = useState("");
  const [referral, setReferral] = useState("");
  const [totalDeposits, setTotalDeposits] = useState(0);
  const [totalWithdrawals, setTotalWithdrawals] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${Base_Url}/admin/users/details/${uid}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
          }
        );
        if (response.status === 403) {
          navigate("/adminLogin");
        }
        if (!response.ok) {
          alertToast("User not found", "error");
          navigate("/adminHome");
        }

        const data = await response.json();
        setUserData(data.user);
        setBalance(data.user.balance + data.user.withdrawableBalance || "");
        setReferral(data.user.referralCommission || "");
        setTotalDeposits(data.totalDeposits);
        setTotalWithdrawals(data.totalWithdrawals);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [uid]);

  const handleUpdateClick = () => {
    setShowUpdateModal(true);
  };

  const handleBanClick = () => {
    setShowBanModal(true);
  };

  //____admin more options handlers______

  const handleMoreClick = () => {
    setShowMoreModal(true);
  };
  
  const handleViewPassClick = () => {
    setSViewPassModal(true);

  };
  const handleUpdtPassClick = () => {
    setSUpdtPassModal(true)
  };

  const handleLogasUserClick = () => {
    setSLogasUserModal(true);

  };
  const handleBetHisClick = () => {
    setBetHisModal(true)
  };

  const handleTranHisClick = () => {
    setTranHisModal(true)
  };




  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch(
        `https://server.trademax1.com/admin/users/change-user-details/${userData.uid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
          body: JSON.stringify({
            amount: balance,
            referralCommission: referral,
          }),
        }
      );
      if (!response.ok) {
        return alertToast("Unable to update details", "error");
      } else if (response.status === 403) {
        navigate("/adminLogin");
      }
      setShowUpdateModal(false);
      // Re-fetch user data
      const result = await response.json();
      console.log(result);
      setUserData(result.user);
      navigate(`/viewUser/${uid}`);
      alertToast("User updated successfully", "success");
    } catch (err) {}
    setIsUpdating(false);
  };

  const handleBanUser = async () => {
    try {
      const response = await fetch(
        `https://server.trademax1.com/admin/users/ban-user/${uid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      if (!response.ok) {
        alert("Failed to ban user", "error");
      } else if (response.status === 403) {
        navigate("/adminLogin");
      }
      const parsedResponse = await response.json();
      setUserData(parsedResponse.user);
      alertToast("User banned successfully", "success");
      setShowBanModal(false);
    } catch (err) {
      alertToast("Error banning user", "error");
    }
  };

  const handleModalClose = () => {
    setShowUpdateModal(false);
    setShowBanModal(false);
    setShowMoreModal(false)
  };
  const handleMoreOptionClose=()=>{
    setSViewPassModal(false)
    setSUpdtPassModal(false)
    setTranHisModal(false)
    setBetHisModal(false)
    setSLogasUserModal(false)
   
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>User not found</div>;
  }

  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="flex-grow-1">
        <AdminNavbar />
        <div className="container my-4">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
              <div className="card p-4 mb-4">
                <h4 className="text-center mb-4">User Information</h4>
                <div className="mb-3">
                  <strong>UID:</strong> <span>{userData.uid}</span>
                </div>
                <div className="mb-3">
                  <strong>Email:</strong> <span>{userData.email}</span>
                </div>
                <div className="mb-3">
                  <strong>Phone Number:</strong> <span>{userData.phone}</span>
                </div>
                <div className="mb-3">
                  <strong>Referral Link:</strong>{" "}
                  <span>{`https://trademax1.com/register?referral=${userData.referralCode}`}</span>
                </div>
                <div className="mb-3">
                  <strong>Commission:</strong>{" "}
                  <span>{`${userData.referralCommission}% from referrals`}</span>
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    className="btn btn-primary m-2"
                    onClick={handleUpdateClick}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger m-2"
                    onClick={handleBanClick}
                  >
                    {userData.isRestricted ? "UnBan User" : "Ban User"}
                  </button>

                  <button
                    className="btn btn-primary m-2"
                    onClick={handleMoreClick}
                  >
                   More
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row text-center">
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="p-3 border bg-light">
                <img
                  src={adminDeposit}
                  alt="Total Amount Deposited"
                  className="img-fluid"
                />
                <div className="mt-2">
                  <strong>TOTAL AMOUNT DEPOSITED</strong>
                  <div>{totalDeposits}</div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="p-3 border bg-light">
                <img
                  src={adminWithdraw}
                  alt="Total Amount Withdrawn"
                  className="img-fluid"
                />
                <div className="mt-2">
                  <strong>TOTAL AMOUNT WITHDRAWN</strong>
                  <div>{totalWithdrawals}</div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="p-3 border bg-light">
                <img
                  src={adminWallet}
                  alt="Wallet Balance"
                  className="img-fluid"
                />
                <div className="mt-2">
                  <strong>WALLET BALANCE</strong>
                  <div>{userData.balance + userData.withdrawableBalance}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showUpdateModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Update User</h2>
            <div className="mb-3">
              <label htmlFor="balance" className="form-label">
                Balance:
              </label>
              <input
                id="balance"
                type="text"
                className="form-control"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="referral" className="form-label">
                Referral %:
              </label>
              <input
                id="referral"
                type="text"
                className="form-control"
                value={referral}
                onChange={(e) => setReferral(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-center">
              <button
                className="modal-btn yes"
                onClick={handleUpdate}
                disabled={isUpdating}
              >
                Yes
              </button>
              <button className="modal-btn no" onClick={handleModalClose}>
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {showBanModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>
              Are you sure you want to {userData.isRestricted ? "unban" : "ban"}{" "}
              this user?
            </h2>
            <div className="d-flex justify-content-center">
              <button className="modal-btn yes" onClick={handleBanUser}>
                Yes
              </button>
              <button className="modal-btn no" onClick={handleModalClose}>
                No
              </button>
            </div>
          </div>
        </div>
      )}


{/* ______more options for admin_______ */}
      {showMoreModal && (
        <div className="modal-overlay relative">
          <div className="modal-content ">
            <div className="d-flex flex-column justify-content-center ">
              <button className="modal-btn yes" onClick={handleViewPassClick}>
               view password
              </button>
              <button className="modal-btn yes" onClick={handleUpdtPassClick}>
               update password
              </button>
              <button className="modal-btn yes" onClick={handleLogasUserClick}>
              Login as user
              </button>
              <button className="modal-btn yes" onClick={handleBetHisClick}>
              Bet history
              </button>
              <button className="modal-btn yes" onClick={handleTranHisClick}>
              Transaction history
              </button> 
              
             <div className=" text-end absolute top-0 right-0">
             <button className="modal-btn btn-secondary rounded" onClick={handleModalClose}>
              Close
              </button>
            </div>



            </div>
          </div>
        </div>
      )}

{/* __________more options models________ */}
{showViewPasModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Password : srianth</p>
           <div className="text-end">
           <button className="btn btn-danger w-25" onClick={handleMoreOptionClose}>close</button>
          </div>
          </div>
        </div>
      )}

{showUpdtPasModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p className="fw-semibold fs-5">Update Password</p>

            <div className="d-flex flex-column align-items-start">
              <p>existing password : srinath</p>
              <p>new Password : <input type="text" /> </p>
            </div>

            <div className="">
           <button className="btn btn-primary w-25" onClick={handleMoreOptionClose}>Update</button>
           <button className="btn btn-danger w-25" onClick={handleMoreOptionClose}>close</button>
          </div>
          </div>
        </div>
      )}

{showLogasUserModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>login as user model</p>
           <div className="text-end">
           <button className="btn btn-danger w-25" onClick={handleMoreOptionClose}>close</button>
          </div>
          </div>
        </div>
      )}
      {showBetHisModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Betting history model</p>
           <div className="text-end">
           <button className="btn btn-danger w-25" onClick={handleMoreOptionClose}>close</button>
          </div>
          </div>
        </div>
      )}
      {showTranHisModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>transaction history model</p>
           <div className="text-end">
           <button className="btn btn-danger w-25" onClick={handleMoreOptionClose}>close</button>
          </div>
          </div>
        </div>
      )}

    </div>
  );
};
