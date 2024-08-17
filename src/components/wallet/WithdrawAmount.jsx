import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../Navbar';
import { Sidebar } from '../../Sidebar';
import { BetSlip } from '../../BetSlip';
import withdraw from '../../images/withdraw.png';
import Modal from 'react-modal';
import success from '../../images/success.png';
import failure from '../../images/failure.png';
import './wallet.css'; // Assuming you have a CSS file for styling

export const WithdrawAmount = () => {
  const navigate = useNavigate();
  
  // Static values for testing
  const [accountInfo, setAccountInfo] = useState({
    accountNumber: '1234567890',
    ifscCode: 'ABC1234',
    nameOnCard: 'John Doe',
    phoneNumber: '9876543210'
  });
  const [saveInfo, setSaveInfo] = useState(false);

  // Simulate API call for fetching account info
  // useEffect(() => {
  //   const fetchAccountInfo = async () => {
  //     try {
  //       // Simulate network delay
  //       await new Promise(resolve => setTimeout(resolve, 1000));
  //       // Set static values
  //       // You would replace this with an API call like:
  //       // const response = await fetch('/api/account-info');
  //       // const data = await response.json();
  //       // setAccountInfo(data);
  //     } catch (error) {
  //       console.error('Failed to fetch account information:', error);
  //     }
  //   };

  //   fetchAccountInfo();
  // }, []);

  const fetchAccountInfo = async () => {
    try {
      const response = await fetch('/api/account-info'); // Replace with your actual API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setAccountInfo(data);
    } catch (error) {
      console.error('Failed to fetch account information:', error);
    }
  };



  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ image: '', text: '' });
  const [amount, setAmount] = useState('');
  const [presetAmounts, setPresetAmounts] = useState([]);

  useEffect(() => {
      // Sample data for preset amounts
      const samplePresetAmounts = [200, 500, 1000, 2500];
      setPresetAmounts(samplePresetAmounts);
  }, []);
  const handleSaveInfoChange = (event) => {
    setSaveInfo(event.target.checked);
  };

  const openSuccessModal = () => {
    setModalContent({
        image: success,
        text: 'PAYMENT SUCCESS'
    });
    setModalIsOpen(true);
};

const openFailureModal = () => {
    setModalContent({
        image: failure,
        text: 'PAYMENT FAILURE'
    });
    setModalIsOpen(true);
};

const closeModal = () => {
    setModalIsOpen(false);
};

const handleAmountClick = (amount) => {
    setAmount(amount);
};

  return (
    <div>
      <Navbar />
      <div className="container notificationBox mt-2 col-12">
        <button className='notificationBtn ms-3'>DEPOSIT</button>
        <div className="innerNotificationBox m-3 p-3 text-center">
          <div className="row align-items-center mb-0">
            <div className="col-md-4 d-flex justify-content-end">
              <img src={withdraw} alt="Withdraw" className='withdrawImage'/>
            </div>
            <div className="col-md-6">
              <h1><u>TOTAL BALANCE: 0</u></h1>
            </div>
          </div>
          <div>
          <div className="row">
            <div className="col-md-6">
            <div className='accountDiv'>
            <div className='mb-2 d-none d-sm-block d-md-none'>
    <label htmlFor="amount"> ENTER AMOUNT: </label>
    <input id="accNumber" type="text" />
  </div>
     
            <div className='mb-2'>
    
    <input id="accNumber" placeholder='ACCOUNT NUMBER' type="text" />
  </div>
  <div className='mb-2'>
    
    <input id="bankName" placeholder='BANK NAME' type="text" />
  </div>
  <div className='mb-2'>
    
    <input id="ifscCode" placeholder='IFSC CODE' type="text" />
  </div>
  
           
            <div>
              <input
                type="checkbox"
                checked={saveInfo}
                onChange={handleSaveInfoChange}
              />
              <label> CLICK TO SAVE THE INFORMATION</label>
            </div>
            </div>
            </div>
            

           
            <div className="col-md-6">
            <div className='d-none d-sm-block'>
           
                        <div>ENTER THE AMOUNT,PLEASE</div>
                        <div className='mt-2'>(FROM 200-100000)</div>
                        <div className='mt-2'>
                            <input 
                                className='amountInput' 
                                type="text" 
                                value={amount} 
                                onChange={(e) => setAmount(e.target.value)} 
                            />
                        </div>
                        <div>
                            <button className='continueBtn m-2'>
                                <h3>CONTINUE</h3>
                            </button>
                        </div>
                        <div className='d-flex flex-row justify-content-evenly text-center'>
                            {presetAmounts.map((preset, index) => (
                                <div 
                                    key={index} 
                                    className='amount p-2' 
                                    onClick={() => handleAmountClick(preset)}
                                >
                                    {preset}
                                </div>
                            ))}
                        </div>
                        {/* <button onClick={openSuccessModal}>SUCCESS</button>
                        <button onClick={openFailureModal}>FAILURE</button> */}
                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            contentLabel="Example Modal"
                            className="Modal"
                            overlayClassName="Overlay"
                        >
                            <button className="close-button" onClick={closeModal}>X</button>
                            <img src={modalContent.image} alt={modalContent.text} />
                            <div><p className='popUp m-2'>{modalContent.text}</p></div>
                        </Modal>
                    </div>
            </div>
            </div>
          </div>
         
          <div>
            <button className='withdrawContinue' onClick={() => navigate('')}>
              SAVE
            </button>
          </div>
        </div>
      </div>
      <Sidebar />
      <BetSlip />
    </div>
  );
};