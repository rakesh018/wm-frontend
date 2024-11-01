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
import { TiArrowBack } from "react-icons/ti";
import { Pagination } from "./Pagination";


// to check password is in hashed or not
const checkPassword = (password) => {
  const bcryptHashPattern = /^\$2[ayb]\$.{56}$/;
  if (bcryptHashPattern.test(password)) {
    return "NA";
  } else {
    // Password is plain text
    return password;
  }
};

export const ViewUser = () => {
  const navigate = useNavigate();
  const adminToken = localStorage.getItem("adminToken");
  if (!adminToken) {
    navigate("/adminLogin");
  }
  const { uid } = useParams();
  const [userData, setUserData] = useState(null);
  const [logUserData, setlogUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newPassword, setNewPassword] = useState(null);

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

  const [betTranView, setbetTranView] = useState(false);
  const [TransView, setTransView] = useState(false);
  const [bethistory,setbethistory]=useState(null)
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // transaction__state____
  const [transhistory,setTranshistory]=useState(null)
  const [totalTransPages, setTotalTransPages] = useState(1);
  const [currentTransPage, setCurrentTransPage] = useState(1);



  const paginate = (pageNumber) => {setCurrentPage(pageNumber)};
  const transpaginate = (pageNumber) => setCurrentTransPage(pageNumber);



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${Base_Url}/admin/users/details/${uid}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        if (response.status === 403) {
          navigate("/adminLogin");
        }
        if (!response.ok) {
          alertToast("User not found", "error");
          navigate("/adminHome");
        }

        const data = await response.json();
        console.log(data)
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

  
  // Fetch betting history only after userData is available________
  useEffect(() => {
    if (userData) {

      const fetchbethistory = async () => {
        try {
          const anotherResponse = await fetch(
            `${Base_Url}/admin/users/fetch-user-bet-history?page=${currentPage}`,
            {
              method:"POST",
              headers: {
                Authorization: `Bearer ${adminToken}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ uid: userData.uid }),
            }
          );

          const anotherData = await anotherResponse.json();
          
          setbethistory(anotherData);
          setTotalPages(anotherData.totalPages)
        } catch (err) {
          setError(err.message);
        }
      };

      fetchbethistory();
    }
  }, [userData, currentPage]);



 
  // Fetch transaction history only after userData is available________
  useEffect(() => {
    if (userData) {

      const fetchTransactionhistory = async () => {
        try {
          const TransacResponse = await fetch(
            `${Base_Url}/admin/users/fetch-transaction-history?page=${currentTransPage}`,
            {
              method:"POST",
              headers: {
                Authorization: `Bearer ${adminToken}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ uid: userData.uid }),
            }
          );
          if (!TransacResponse.ok) {
            throw new Error("Failed to fetch Transaction history");
          }

          const anotherData = await TransacResponse.json();
          setTranshistory(anotherData);
          setTotalTransPages(anotherData.totalPages)
        } catch (err) {
          setError(err.message);
        }
      };

      fetchTransactionhistory();
    }
  }, [userData, currentTransPage]);



  // login as user handle__________________

  const userLoginHandle = async () => {
    try {
      const response = await fetch(`${Base_Url}/admin/users/login-as-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          userId:userData?._id,
          uid:userData?.uid
        }),
      });

      const data = await response.json();
      console.log(data)

      if (response.ok) {
        localStorage.setItem("token", data.token);
        alertToast("Login as user successful!", "success"); // Show success toast

        setTimeout(() => {
          // navigate("/home");
          window.open("/home", "_blank");
        }, 1500);
      } else {
        
        alertToast("Invalid credentials. Please try again.", "error"); // Show error toast
      }
    } catch (error) {
      console.log(error)
      alertToast("An error occurred while logging in.", "error"); // Show error toast
    }
  };

  const updateUserPass = async () => {
    try {
      const response = await fetch(
        `${Base_Url}/admin/users/update-user-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
          body: JSON.stringify({
            uid: userData.uid,
            newPassword: newPassword,
          }),
        }
      );

      if (response.ok) {
        alertToast("Password Updated Successfully!", "success"); // Show success toast
        handleMoreOptionClose();
        window.location.reload();
      } else {
        alertToast("Password error. Please try again.", "error"); // Show error toast
      }
    } catch (error) {
      alertToast("Password error .", "error"); // Show error toast
    }
  };

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
    setSUpdtPassModal(true);
  };

  const handleLogasUserClick = () => {
    setSLogasUserModal(true);
  };
  const handleBetHisClick = () => {
    setBetHisModal(true);
  };

  const handleTranHisClick = () => {
    setTranHisModal(true);
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch(
        `${Base_Url}/admin/users/change-user-details/${userData.uid}`,
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
      setUserData(result.user);
      navigate(`/viewUser/${uid}`);
      alertToast("User updated successfully", "success");
    } catch (err) {}
    setIsUpdating(false);
  };

  const handleBanUser = async () => {
    try {
      const response = await fetch(`${Base_Url}/admin/users/ban-user/${uid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
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
    setShowMoreModal(false);
  };
  const handleMoreOptionClose = () => {
    setSViewPassModal(false);
    setSUpdtPassModal(false);
    setTranHisModal(false);
    setBetHisModal(false);
    setSLogasUserModal(false);
  };

  const betmodelHandle = () => {
    handleModalClose();
    setbetTranView(true);
  };
  const TransmodelHandle = () => {
    handleModalClose();
    setTransView(true);
  };

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

        <div className="container my-4 pl-5">
          {!(betTranView  || TransView)&& (
            <>
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
                      <strong>Phone Number:</strong>{" "}
                      <span>{userData.phone}</span>
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
                      <div>
                        {userData.balance + userData.withdrawableBalance}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {betTranView && (
            <div>
              <div className="relative flex justify-center items-center">
                <button
                  onClick={() => {
                    setbetTranView(false);
                    setShowMoreModal(true);
                  }}
                  className="backbuttonadmin absolute left-0"
                >
                  <TiArrowBack className="fs-5" />
                </button>
                <h3 className="text-center mb-4">Betting History</h3>
              </div>

              {/* Search Input */}
              <div className="mb-4 d-flex justify-content-center">
                <input
                  type="text"
                  id="searchId"
                  // value={searchId}
                  // onChange={(e) => setSearchId(e.target.value)}
                  placeholder="Enter BetCode to search"
                  className="form-control me-2"
                />
                <button className="btn btn-primary">Search</button>
              </div>

              {/* Table for Larger Screens */}
              <div className="table-responsive d-none d-md-block">
                <table className="table table-striped table-bordered admin-table">
                  <thead>
                    <tr>
                      <th>BetCode </th>
                      <th>GameType </th>
                      <th>RoundDuration</th>
                      <th>BetAmount</th>
                      <th>Choice</th>
                      <th>IsWin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bethistory.totalBets > 0 ? (
                      bethistory.paginatedBets.map((row) => (
                        <tr
                          key={row.betCode}
                          // onClick={() => handleRowClick(row.uid)}
                        >
                          <td>{row?.betCode ||"Na"}</td>
                          <td>{row.gameType}</td>
                          <td>{row.roundDuration}</td>
                          <td>{row.betAmount}</td>
                          <td>{row.gameType==="coinFlip"?row.choice===1?"Head":"Tail":row.choice===1?"Up":"Down"}</td>
                          <td>{row.isWin?"Yes":"No"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6">No Betting History Found</td>
                      </tr>
                    )}
                  
                  </tbody>
                </table>
              </div>

              {/* Cards for Small Screens */}

              <div className="row d-block d-md-none">
                 {bethistory.totalBets > 0 ? (
                      bethistory.paginatedBets.map((row) => (
                    <div className="col-12 mb-4" key={row.betCode}>
                      <div
                        className="card p-3 h-100"
                        // onClick={() => handleRowClick(user.uid)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="mb-2">
                          {/* <strong>UID:</strong> <span>{user.uid}</span> */}
                          <strong>BetCode:</strong> <span>{row.betCode}</span>
                        </div>
                        <div className="mb-2">
                          <strong>GameType:</strong>{" "}
                          {/* <span>{user.phone}</span> */}
                          <span>{row.gameType}</span>
                        </div>
                        <div className="mb-2">
                          {/* <strong>Email:</strong> <span>{user.email}</span> */}
                          <strong>RoundDuration:</strong> <span>{row.roundDuration}</span>
                        </div>
                        <div className="mb-2">
                          <strong>BetAmount:</strong>{" "}
                          {/* <span>{formatDate(user.createdAt)}</span> */}
                          <span>{row.betAmount}</span>
                        </div>
                        <div className="mb-2">
                          <strong>Choice:</strong>{" "}
                          {/* <span>{user.userType}</span> */}
                          <span>{row.gameType==="coinFlip"?row.choice===1?"Head":"Tail":row.choice===1?"Up":"Down"}</span>
                        </div>
                        <div>
                          <strong>IsWin:</strong>{" "}
                          {/* <span>{user.balance + user.withdrawableBalance}</span> */}
                          <span>{row.isWin}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12">
                    <div className="alert alert-info text-center">
                      No Betting History Found
                    </div>
                  </div>
                )}
              </div>

              <div className="d-flex justify-content-center pagination-container">
                <Pagination
                  totalPages={bethistory.totalPages}
                  paginate={paginate}
                  currentPage={bethistory.currentPage}
                />
              </div>
            </div>
          )}

          {TransView && (
            <div>
              <div className="relative flex justify-center items-center">
                <button
                  onClick={() => {
                    setTransView(false);
                    setShowMoreModal(true);
                  }}
                  className="backbuttonadmin absolute left-0"
                >
                  <TiArrowBack className="fs-5" />
                </button>
                <h3 className="text-center mb-4">Transaction History</h3>
              </div>

              {/* Search Input */}
              <div className="mb-4 d-flex justify-content-center">
                <input
                  type="text"
                  id="searchId"
                  // value={searchId}
                  // onChange={(e) => setSearchId(e.target.value)}
                  placeholder="Enter BetCode to search"
                  className="form-control me-2"
                />
                <button className="btn btn-primary">Search</button>
              </div>

              {/* Table for Larger Screens */}
              <div className="table-responsive d-none d-md-block">
                <table className="table table-striped table-bordered admin-table">
                  <thead>
                    <tr>
                      <th>Transaction_Id </th>
                      <th>Status </th>
                      <th>Amount</th>
                      <th>type</th>
                      <th>CreatedAt</th>
                    </tr>
                  </thead>
                  <tbody>
                  {transhistory.totalTransactions > 0 ? (
                      transhistory.paginatedTransactions.map((row) => (
                        <tr
                          key={row._id}
                          // onClick={() => handleRowClick(row.uid)}
                        >
                          <td>{row._id}</td>
                          <td>{row.status}</td>
                          <td>{row.amount}</td>
                          <td>{row.type}</td>
                          <td>{row.createdAt}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6">  No Transaction History Found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Cards for Small Screens */}

              <div className="row d-block d-md-none">
              {transhistory.totalTransactions > 0 ? (
                      transhistory.paginatedTransactions.map((row) => (
                    <div className="col-12 mb-4" key={row._id}>
                      <div
                        className="card p-3 h-100"
                        // onClick={() => handleRowClick(user.uid)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="mb-2">
                          {/* <strong>UID:</strong> <span>{user.uid}</span> */}
                          <strong>Transaction_Id:</strong> <span>{row._id}</span>
                        </div>
                        <div className="mb-2">
                          <strong>Status:</strong>{" "}
                          {/* <span>{user.phone}</span> */}
                          <span>{row.status}</span>
                        </div>
                        <div className="mb-2">
                          {/* <strong>Email:</strong> <span>{user.email}</span> */}
                          <strong>Amount:</strong> <span>{row.amount}</span>
                        </div>
                        <div className="mb-2">
                          <strong>Type:</strong>{" "}
                          {/* <span>{formatDate(user.createdAt)}</span> */}
                          <span>{row.type}</span>
                        </div>
                        <div>
                          <strong>CreatedAt:</strong>{" "}
                          {/* <span>{user.balance + user.withdrawableBalance}</span> */}
                          <span>{row.createdAt}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12">
                    <div className="alert alert-info text-center">
                      No Transaction History Found
                    </div>
                  </div>
                )}
              </div>

              <div className="d-flex justify-content-center pagination-container">
                <Pagination
                  totalPages={transhistory.totalPages}
                  paginate={transpaginate}
                  currentPage={transhistory.currentPage}
                />
              </div>
            </div>
          )}
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
                View Password
              </button>
              <button className="modal-btn yes" onClick={handleUpdtPassClick}>
                Update Password
              </button>
              <button className="modal-btn yes" onClick={userLoginHandle}>
                Login as User
              </button>
              <button className="modal-btn yes" onClick={betmodelHandle}>
                Bet History
              </button>
              <button className="modal-btn yes" onClick={TransmodelHandle}>
                Transaction History
              </button>

              <div className=" text-end absolute top-0 right-0">
                <button
                  className="modal-btn btn-secondary rounded"
                  onClick={handleModalClose}
                >
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
            <p>Password : {checkPassword(userData.password)}</p>
            <div className="text-end">
              <button
                className="btn btn-danger w-25"
                onClick={handleMoreOptionClose}
              >
                close
              </button>
            </div>
          </div>
        </div>
      )}

      {showUpdtPasModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p className="fw-semibold fs-5">Update Password</p>

            <div className="d-flex flex-column align-items-start">
              <p>existing password : {checkPassword(userData.password)} </p>
              <p>
                new Password :{" "}
                <input
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                  type="text"
                />{" "}
              </p>
            </div>

            <div className="">
              <button className="btn btn-primary w-25" onClick={updateUserPass}>
                Update
              </button>
              <button
                className="btn btn-danger w-25"
                onClick={handleMoreOptionClose}
              >
                close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* {showBetHisModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Betting history model</p>
            <div className="text-end">
              <button
                className="btn btn-danger w-25"
                onClick={handleMoreOptionClose}
              >
                close
              </button>
            </div>
          </div>
        </div>
      )} */}

      {showTranHisModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>transaction history model</p>
            <div className="text-end">
              <button
                className="btn btn-danger w-25"
                onClick={handleMoreOptionClose}
              >
                close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};