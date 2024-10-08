import React, { useEffect, useState } from "react";
import { AdminNavbar } from "../AdminHome/AdminNavbar";
import { AdminSidebar } from "../AdminHome/AdminSidebar";
import { useParams } from "react-router-dom";
import "./adminWithdraw.css";
import { alertToast } from "../../../alertToast";
import { useNavigate } from "react-router-dom";
import Base_Url from "../../../config";

export const ViewUserWithdrawTransaction = () => {
  const navigate = useNavigate();
  const adminToken = localStorage.getItem("adminToken");
  if (!adminToken) {
    navigate("/adminLogin");
  }
  const { uid } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const fetchTransaction = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${Base_Url}/admin/withdrawals/details/${uid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
          }
        );

        if(response.status===403){
            navigate('/adminLogin');
        }
        if (!response.ok) {
          alertToast('Failed to fetch transaction','error');
        }

        const data = await response.json();
        setTransaction(data.savedWithdrawal);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [uid]);

  const handleAccept = async (withdrawalId) => {
    const res = await fetch(
     `${Base_Url}/admin/withdrawals/action/mark-completed`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ withdrawalId }),
      }
    );
    if(res.status===403){
        navigate('/adminLogin');
    }
    const parsedRes = await res.json();
    setTransaction(parsedRes.savedWithdrawal);
    alertToast("Withdrawal accepted", "success");
  };

  const handleReject = async (withdrawalId) => {
    const res = await fetch(
      `${Base_Url}/admin/withdrawals/action/mark-rejected`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ withdrawalId }),
      }
    );
    if(res.status===403){
        navigate('/adminLogin');
    }
    const parsedRes = await res.json();
    setTransaction(parsedRes.savedWithdrawal);
    alertToast("Withdrawal rejected", "success");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <AdminNavbar />
      <AdminSidebar />
      <div className="container-fluid adminBox">
        <div className="adminInnerBox">
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="adminWithdrawBox text-center mt-3 p-3">
                {transaction ? (
                  <div className="d-flex flex-column">
                    <h2>Withdraw by {transaction.uid}</h2>
                    <p>Transaction ID: {transaction._id}</p>
                    <p>DATE: {formatDate(transaction.createdAt)}</p>
                    <p>PHONE NUMBER: {transaction.phone}</p>
                    <p>AMOUNT: {transaction.amount}</p>
                    <p>
                      STATUS:{" "}
                      <button className="statusWithdrawBtn">
                        {transaction.status}
                      </button>
                    </p>
                  </div>
                ) : (
                  <p>Transaction not found</p>
                )}
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="adminWithdrawBox text-center mt-3 p-3">
                {transaction ? (
                  <div className="info">
                    <h2>USER WITHDRAW INFORMATION</h2>
                    <p>ACCOUNT NUMBER: {transaction.accountNumber}</p>
                    <p>IFSC CODE: {transaction.ifscCode}</p>
                    <p>BANK NAME: {transaction.bankName}</p>
                    <p>NAME ON CARD: {transaction.name}</p>
                  </div>
                ) : (
                  <p>Transaction not found</p>
                )}
                {transaction && transaction.status === "pending" && (
                  <div className="d-flex justify-content-center mt-3">
                    <button
                      className="statusWithdrawBtn mx-2"
                      onClick={() => handleAccept(transaction._id)}
                    >
                      ACCEPT
                    </button>
                    <button
                      className="statusWithdrawBtn mx-2"
                      onClick={() => handleReject(transaction._id)}
                    >
                      REJECT
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
