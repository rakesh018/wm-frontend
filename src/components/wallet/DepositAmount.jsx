import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../Navbar';
import { Sidebar } from '../../Sidebar';
import { BetSlip } from '../../BetSlip';
import './wallet.css';
import { alertToast } from '../../alertToast';
import { Spinner } from '../../Spinner'; // Import Spinner component

export const DepositAmount = () => {
  const navigate = useNavigate();
  const token=localStorage.getItem('token');
  if(!token){
    navigate('/login');
  }
  const [selectedFile, setSelectedFile] = useState(null);
  const [amount, setAmount] = useState('');
  const [utrNumber, setUtrNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
    setError('');
  };

  const handlePredefinedAmountClick = (value) => {
    setAmount(value);
    setError('');
  };

  const handleUtrChange = (event) => {
    setUtrNumber(event.target.value);
  };

  const handleContinue = async () => {
    const numericAmount = parseFloat(amount);

    if (isNaN(numericAmount)) {
      setError('Please enter a valid number.');
    } else if (numericAmount < 200 || numericAmount > 100000) {
      setError('Amount must be between 200 and 100000.');
    } else if (!utrNumber) {
      setError('Please enter the UTR number.');
    } else if (!selectedFile) {
      setError('Please select a file to upload.');
    } else {
      setError('');
      setLoading(true); // Set loading to true when the upload starts
      try {
        const response = await fetch('https://server.trademax1.com/payments/manual-payment/generate-psu', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':` Bearer ${token}`
          },
          body: JSON.stringify({ fileName: selectedFile.name, fileType: selectedFile.type })
        });

        const data = await response.json();
        if(response.status===403){
          navigate('/login');
        }
        if (!response.ok) {
          console.error('Error generating presigned URL:', data);
          alertToast('Error uploading screenshot', 'error');
          setLoading(false);
          return;
        }

        const { url, key } = data;

        const uploadResponse = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': selectedFile.type
          },
          body: selectedFile
        });

        if (!uploadResponse.ok) {
          console.error('Error uploading file:', uploadResponse);
          alertToast('Error uploading file. Please try again later.', 'error');
          setLoading(false);
          return;
        }

        const saveResponse = await fetch('https://server.trademax1.com/payments/manual-payment/save-key', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`
          },
          body: JSON.stringify({ key, amount: numericAmount, utr: utrNumber })
        });

        const saveData = await saveResponse.json();
        if (!saveResponse.ok) {
          console.error('Error saving file key:', saveData);
          alertToast(`Error saving file key: ${saveData.error}`, 'error');
          setLoading(false);
          return;
        }

        alertToast('File uploaded successfully', 'success');
        setAmount('');
        setSelectedFile('');
        setUtrNumber('');
      } catch (error) {
        console.error('Network error:', error);
        alertToast('Network error. Please try again later.', 'error');
      } finally {
        setLoading(false); // Stop loading after completion
      }
    }
  };

  return (
    <div>
      {loading && <Spinner />} {/* Render spinner while loading */}
      <Navbar />
      <div className="container notificationBox mt-2 col-12">
        <button className='notificationBtn ms-3'>DEPOSIT</button>
        <div className="innerNotificationBox m-3 p-3 text-center">
          <div>
            <div>ENTER THE AMOUNT, PLEASE</div>
            <div className='mt-2'>(FROM 300-300000)</div>
            <div className='mt-2'>
              <input
                className='amountInput'
                type="text"
                placeholder="Enter amount"
                value={amount}
                onChange={handleAmountChange}
              />
            </div>
            {error && <div className="error-text mt-2">{error}</div>}

            <div className='d-flex flex-row justify-content-evenly text-center m-2'>
              <div className='amount p-2' onClick={() => handlePredefinedAmountClick('200')}>200</div>
              <div className='amount p-2' onClick={() => handlePredefinedAmountClick('500')}>500</div>
              <div className='amount p-2' onClick={() => handlePredefinedAmountClick('1000')}>1000</div>
              <div className='amount p-2' onClick={() => handlePredefinedAmountClick('2500')}>2500</div>
            </div>

            <div className="mt-3">
              <input
                type="text"
                className="utrInput"
                placeholder="Enter UTR Number"
                value={utrNumber}
                onChange={handleUtrChange}
              />
            </div>

            <div>
              <button className='utr mt-3' onClick={handleButtonClick}>
                UPLOAD PAYMENT UTR NUMBER AND SCREENSHOT
              </button>
              <input
                id="fileInput"
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              {selectedFile && (
                <div>
                  <p>Selected file: {selectedFile.name}</p>
                </div>
              )}
            </div>

            <div>
              <button className='continueBtn m-4' onClick={handleContinue}>
                <h3>CONTINUE</h3>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Sidebar />
      <div className="d-none d-lg-block">
     <BetSlip />
     </div>
    </div>
  );
};