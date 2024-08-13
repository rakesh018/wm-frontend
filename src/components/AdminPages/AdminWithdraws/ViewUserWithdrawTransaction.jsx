import React from 'react'
import { AdminNavbar } from '../AdminHome/AdminNavbar'
import { AdminSidebar } from '../AdminHome/AdminSidebar';
import { useParams } from 'react-router-dom';
import './adminWithdraw.css'



const transactions = [
    { gateway: 'PHONE PE', transactionId: '123456789', initiated: '22/02/2024', phone: '9876543210', amount: 1000, status: 'SUCCESS' },
    { gateway: 'GOOGLE PAY', transactionId: '123456799', initiated: '22/02/2024', phone: '9876543910', amount: 1000, status: 'PENDING' },
];
export const ViewUserWithdrawTransaction = () => {
    const { uid } = useParams();
    const transaction = transactions.find((t) => t.transactionId === uid);
  return (
    <div>

        <AdminNavbar/>
        <AdminSidebar/>
        <div className="container-fluid adminBox">
                <div className="adminInnerBox col-12" style={{ height: '70vh' }}>
                    <div className='d-flex justify-content-evenly'>
                        <div className='adminWithdrawBox text-center mt-3 p-3'>
                    {transaction ? (
                        <div className='d-flex flex-column'>
                            <h2>Deposit via {transaction.gateway}</h2>
                            <p>Transaction ID: {transaction.transactionId}</p>
                            <p>DATE:{transaction.initiated}</p>
                            <p>PHONE NUMER: {transaction.phone}</p>
                            <p>AMOUNT: {transaction.amount}</p>


                            <p>STATUS: <button className='statusWithdrawBtn'>{transaction.status}</button></p>
                        </div>
                    ) : (
                        <p>Transaction not found</p>
                    )}
                    </div>
                    <div className='adminWithdrawBox text-center mt-3 p-3'>
                    {transaction ? (
                        <div className='d-flex justify-content-evenly'>
                            <div className='info'>
                            <h2>USER WITHDRAW INFORMATION</h2>
                            <p>ACCOUNT NUMBER:</p>
                            <p>IFSC CODE:</p>
                            <p>NAME ON CARD:</p>
                            <p>PHONE NUMBER:</p>
                           
                            </div>
                           
                        </div>
                    ) : (
                        <p>Transaction not found</p>
                    )}
                     <div className='d-flex justify-content-evenly'>
                           <button className='statusWithdrawBtn'>ACCEPT</button>
                           <button className='statusWithdrawBtn'>REJECT</button>
                           </div>
                    </div>
                    
                    </div>
                </div>
            </div>
            
    </div>
  )
}
