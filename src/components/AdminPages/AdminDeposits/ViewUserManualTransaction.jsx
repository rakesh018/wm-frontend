import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../AdminHome/AdminSidebar';
import { AdminNavbar } from '../AdminHome/AdminNavbar';
import { useParams } from 'react-router-dom';
import { alertToast } from '../../../alertToast';
import { useNavigate } from 'react-router-dom';

export const ViewUserManualTransaction = () => {
  const navigate=useNavigate();
  const adminToken=localStorage.getItem('adminToken');
  if(!adminToken){
    navigate('/adminLogin');
  }
  const { uid } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await fetch(`https://server.trademax1.com/admin/deposits/manual/details/${uid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          },
        });

        if(response.status===403){
          navigate('/adminLogin');
        }
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setTransaction(data);
      } catch (error) {
        console.error('Error fetching transaction:', error);
        setError('Transaction not found');
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [uid]);

  const handleClick = (image) => {
    setSelectedImage(image);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const markAsSuccess = async (depositId) => {
    console.log(depositId);
    try {
      const response = await fetch(`https://server.trademax1.com/admin/deposits/manual/action/mark-completed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ depositId }),
      });
      if (!response.ok) {
        alertToast('Error marking success','error');
      }

      const updatedTransaction = await response.json();
      alertToast('Payment marked as success','success');
      setTransaction(updatedTransaction);
    } catch (error) {
      console.error('Error updating transaction status:', error);
      alertToast('Unable to mark','error');
      setError('Failed to update transaction status');
    }
  };

  const markAsRejected = async (depositId) => {
    try {
      const response = await fetch(`https://server.trademax1.com/admin/deposits/manual/action/mark-rejected`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ depositId }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    
      const updatedTransaction = await response.json();
      console.log(updatedTransaction);
      alertToast('Payment marked rejected','success');
      setTransaction(updatedTransaction);
    } catch (error) {
      console.error('Error updating transaction status:', error);
      setError('Failed to update transaction status');
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) return <p>Loading...</p>;

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
                  <h2>Deposit {}</h2>
                  <p>User ID: {transaction.uid}</p>
                  <p>DATE: {formatDate(transaction.createdAt)}</p>
                  {/* <p>PHONE NUMBER: {transaction.phone}</p> */}
                  <p>AMOUNT: {transaction.amount}</p>
                  <p>UTR NUMBER: {transaction.utr}</p>
                  <div>
                    UPLOADED SCREENSHOT:
                    <button onClick={() => handleClick(transaction.url)}>Tap to View</button>
                  </div>
                  <p className='m-3'>
                    STATUS: <span className={`statusBtn ${transaction.status}`}>{transaction.status}</span>
                  </p>
                  {transaction.status === 'pending' && (
                    <>
                      <button onClick={()=>markAsSuccess(transaction.depositId)} className="btn btn-success m-2">Mark as Success</button>
                      <button onClick={()=>markAsRejected(transaction.depositId)} className="btn btn-danger m-2">Reject Deposit</button>
                    </>
                  )}
                </div>
              ) : (
                <p>{error || 'Transaction not found'}</p>
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
};
