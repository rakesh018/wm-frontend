import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../Sidebar';
import { Navbar } from '../../Navbar';
import { BetSlip } from '../../BetSlip';
import QRCode from 'react-qr-code';
import './wallet.css';
import { useNavigate } from 'react-router-dom';

export const DepositManually = () => {
  const [upiId, setUpiId] = useState('');
  const [qrValue, setQrValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Static data for testing
  const mockDepositData = [
    {
      upiId: '9876543210',
      qrValue: 'HIII THIS IS KEERTHI',
    },
    // Add more mock data if needed
  ];

  useEffect(() => {
    // Simulate API call with static data
    const fetchDepositInfo = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Use mock data
        const data = mockDepositData[0];
        setUpiId(data.upiId);
        setQrValue(data.qrValue);
      } catch (error) {
        setError('Failed to load deposit information');
      } finally {
        setLoading(false);
      }
    };

    fetchDepositInfo();
  }, []);

  return (
    
    <div>
      <Navbar />
      <div className="container homeBox mt-2">
        <button className='featuredGames-btn'>
          DEPOSIT MANUALLY
        </button>
        <div className='innerNotificationBox mt-3 text-center'>
          <h2 className='m-3'><u>DEPOSIT MONEY MANUALLY</u></h2>
          {loading && <div>Loading...</div>}
          {error && <div className="error-text">{error}</div>}
          {!loading && !error && (
            <>
              <div>
                <h2>UPI ID: {upiId}</h2>
              </div>
              <div className='m-4'>
                <QRCode
                  size={150}
                  bgColor='white'
                  value={qrValue}
                />
                <div className='m-lg-2 m-sm-0'>
                  <h2>SCAN AND PAY</h2>
                  <button className='makeRequest p-2 p-sm-0m-sm-0' onClick={() => navigate('/depositAmount')}> MAKE PAYMENT REQUEST</button>
                </div>
              </div>
              
              <div>
              
            </div>
            </>
          )}
        </div>
      </div>
      <Sidebar />
      <BetSlip />
    </div>
  );
};