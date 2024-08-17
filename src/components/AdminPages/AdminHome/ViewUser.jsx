import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AdminNavbar } from './AdminNavbar';
import { AdminSidebar } from './AdminSidebar';
import adminDeposit from '../../../images/adminTotalDeposit.png';
import adminWithdraw from '../../../images/adminTotalWithdraw.png';
import adminWallet from '../../../images/adminWallet.png';
import { alertToast } from '../../../alertToast';

export const ViewUser = () => {
  const { uid } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://server.trademax1.com/admin/users/details/${uid}`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (err) {
        alertToast('Error fetching user data', 'error');
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [uid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>User not found</div>;
  }

  const { user, totalDeposits, totalWithdrawals } = userData;
  const walletBalance = user.balance;

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
                  <strong>UID:</strong> <span>{user.uid}</span>
                </div>
                <div className="mb-3">
                  <strong>Email:</strong> <span>{user.email}</span>
                </div>
                <div className="mb-3">
                  <strong>Phone Number:</strong> <span>{user.phone}</span>
                </div>
                <div className="mb-3">
                  <strong>Referral Code:</strong> <span>{user.referralCode}</span>
                </div>
                <div className="mb-3">
                  <strong>Commission:</strong> <span>{`${user.referralCommission}% from referrals`}</span>
                </div>
                <div className="d-flex justify-content-end">
                  <button className="btn btn-primary m-2">Balance Update</button>
                  <button className="btn btn-danger m-2">Ban User</button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="row text-center">
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="p-3 border bg-light">
                <img src={adminDeposit} alt="Total Amount Deposited" className="img-fluid" />
                <div className="mt-2">
                  <strong>TOTAL AMOUNT DEPOSITED</strong>
                  <div>{totalDeposits}</div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="p-3 border bg-light">
                <img src={adminWithdraw} alt="Total Amount Withdrawn" className="img-fluid" />
                <div className="mt-2">
                  <strong>TOTAL AMOUNT WITHDRAWN</strong>
                  <div>{totalWithdrawals}</div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="p-3 border bg-light">
                <img src={adminWallet} alt="Wallet Balance" className="img-fluid" />
                <div className="mt-2">
                  <strong>WALLET BALANCE</strong>
                  <div>{walletBalance}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
