import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../Navbar';
import { Sidebar } from '../../Sidebar';
import { BetSlip } from '../../BetSlip';
import './wallet.css';

export const DepositAmount = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Implement the file upload logic here
      console.log('Uploading file:', selectedFile);
    } else {
      alert('Please select a file first.');
    }
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
    setError('');
  };

  const handleContinue = () => {
    const numericAmount = parseFloat(amount);

    if (isNaN(numericAmount)) {
      setError('Please enter a valid number.');
    } else if (numericAmount < 200 || numericAmount > 100000) {
      setError('Amount must be between 200 and 100000.');
    } else {
      // Proceed to the next step
      navigate('');//for time being i have navigated

    }
  };

  const handlePredefinedAmountClick = (amountValue) => {
    setAmount(amountValue);
    setError('');
  };

  return (
    <div>
      <Navbar />
      <div className="container notificationBox mt-2 col-12">
        <button className='notificationBtn ms-3'>DEPOSIT</button>
        <div className="innerNotificationBox m-3 p-3 text-center">
          <div>
            <div>ENTER THE AMOUNT, PLEASE</div>
            <div className='mt-2'>(FROM 200-100000)</div>
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
            <div className='m-sm-1 m-lg-3'><u>MONEY HAS NOT ADDED AUTOMATICALLY?</u></div>
            <div>
              <button className='utr' onClick={handleButtonClick}>
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
                  <button className='uploadBtn' onClick={handleUpload}>Upload</button>
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
      <BetSlip />
    </div>
  );
};