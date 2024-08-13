import React from 'react';
import { useParams } from 'react-router-dom';
import { AdminNavbar } from './AdminNavbar';
import { AdminSidebar } from './AdminSidebar';
import adminDeposit from '../../../images/adminTotalDeposit.png';
import adminWithdraw from '../../../images/adminTotalWithdraw.png';
import adminWallet from '../../../images/adminWallet.png';

const data = [
  { uid: '123456789', name: 'Lohith', phone: '9087564321', email: 'lohith@gmail.com', date: '10/12/2022', type: 'Regular', balance: '50000' },
  { uid: '123456799', name: 'Karthik', phone: '9087564331', email: 'karthik@gmail.com', date: '11/12/2022', type: 'Demo', balance: '50000' },
  { uid: '123456739', name: 'Rohith', phone: '9087563321', email: 'rohith@gmail.com', date: '10/12/2022', type: 'Regular', balance: '50000' },
  { uid: '123456239', name: 'Karthikeya', phone: '9087124331', email: 'karthikeya@gmail.com', date: '11/12/2022', type: 'Regular', balance: '50000' },
  // Add more data as needed
];

export const ViewUser = () => {
  const { uid } = useParams();
  const user = data.find((user) => user.uid === uid);

  return (
    <div>
      <AdminNavbar />
      <AdminSidebar />
      <div className="container-fluid adminBox">
        <div className="adminInnerBox d-flex flex-column align-items-center">
          {user ? (
            <div className="data-table">
              <table className="table">
                <thead>
                  <tr>
                    <th>UID</th>
                    <th>NAME</th>
                    <th>PHONE NUMBER</th>
                    <th>RECENT WITHDRAW</th>
                    <th>COMMISSION</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{user.uid}</td>
                    <td>{user.name}</td>
                    <td>{user.phone}</td>
                    <td>500</td>
                    <td>5% from referrals</td>
                  </tr>
                </tbody>
              </table>
              <div className="d-flex justify-content-end">
                <button className="userEditBtn m-2">EDIT</button>
                <button className="userEditBtn m-2">BALANCE UPDATE</button>
                <button className="userEditBtn m-2">BAN USER</button>
              </div>
            </div>
          ) : (
            <p>User not found</p>
          )}
          <div className="d-flex justify-content-evenly m-4 w-100">
            <div className="text-center">
              <img src={adminDeposit} alt="Total Amount Deposited" />
              <div className="mt-2">
                <strong>TOTAL AMOUNT DEPOSITED</strong>
                <div>10000</div>
              </div>
            </div>
            <div className="text-center">
              <img src={adminWithdraw} alt="Total Amount Withdrawn" />
              <div className="mt-2">
                <strong>TOTAL AMOUNT WITHDRAWN</strong>
                <div>10000</div>
              </div>
            </div>
            <div className="text-center">
              <img src={adminWallet} alt="Wallet Balance" />
              <div className="mt-2">
                <strong>WALLET BALANCE</strong>
                <div>10000</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
