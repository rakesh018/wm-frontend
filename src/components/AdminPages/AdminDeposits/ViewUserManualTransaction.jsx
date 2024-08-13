import React, { useState } from 'react';
import { AdminSidebar } from '../AdminHome/AdminSidebar';
import { AdminNavbar } from '../AdminHome/AdminNavbar';
import { useParams } from 'react-router-dom';
import transaction1 from '../../../images/transaction1.jpeg';
import transaction2 from '../../../images/transaction2.jpeg';

const transactions = [
  { gateway: 'PHONE PE', transactionId: '123456789', initiated: '22/02/2024', phone: '9876543210', amount: 1000, status: 'SUCCESS', UTR: '123456789098765432', image: transaction1 },
  { gateway: 'GOOGLE PAY', transactionId: '123456799', initiated: '22/02/2024', phone: '9876543910', amount: 1000, status: 'REJECTED', UTR: '12345678912345534', image: transaction2 },
  { gateway: 'GOOGLE PAY', transactionId: '123459799', initiated: '22/02/2024', phone: '9876593910', amount: 1000, status: 'SUCCESS', UTR: '1234567895673224', image: transaction1 },
];

export const ViewUserManualTransaction = () => {
  const { uid } = useParams();
  const transaction = transactions.find((t) => t.transactionId === uid);

  const [selectedImage, setSelectedImage] = useState(null);

  const handleClick = (image) => {
    setSelectedImage(image);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <AdminSidebar />
      <AdminNavbar />
      <div className="container-fluid adminBox">
        <div className="adminInnerBox col-12" style={{ height: '70vh' }}>
          <div className='d-flex justify-content-center'>
            <div className='adminDepositBox text-center mt-3 p-3'>
              {transaction ? (
                <div>
                  <h2>Deposit via {transaction.gateway}</h2>
                  <p>Transaction ID: {transaction.transactionId}</p>
                  <p>DATE: {transaction.initiated}</p>
                  <p>PHONE NUMBER: {transaction.phone}</p>
                  <p>AMOUNT: {transaction.amount}</p>
                  <p>UTR NUMBER: {transaction.UTR}</p>
                  <div>
                    UPLOADED SCREENSHOT:
                    <button onClick={() => handleClick(transaction.image)}>Tap to View</button>
                  </div>
                  <p className='m-3'>STATUS: <span className='statusBtn'>{transaction.status}</span></p>
                </div>
              ) : (
                <p>Transaction not found</p>
              )}

              {selectedImage && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div style={{ position: 'relative' }}>
                    <img src={selectedImage} alt="Selected" style={{ maxWidth: '90vw', maxHeight: '90vh' }} />
                    <button onClick={handleClose} style={{ position: 'absolute', top: 10, right: 10, background: 'white' }}>Close</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
