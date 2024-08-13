import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../Navbar'
import { Sidebar } from '../../Sidebar'
import { BetSlip } from '../../BetSlip';
import './wallet.css';



export const DepositAmount = () => {
   
  const navigate = useNavigate();

    const [selectedFile, setSelectedFile] = useState(null);
  
    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
  
    const handleButtonClick = () => {
      document.getElementById('fileInput').click();
    };

    const handleUpload = (file) => {
        // Handle the file upload logic here, e.g., sending it to the server
        console.log('Uploading file:', file);
    };
   
    return (
        <div>
            <Navbar />
            <div className=" container notificationBox mt-2 col-12 ">

                <button className='notificationBtn ms-3'>DEPOSIT</button>
                <div className="innerNotificationBox m-3 p-3 text-center">
                    <div>
                       <div>ENTER THE AMOUNT,PLEASE</div>
                       <div className='mt-2'>(FROM 200-100000)</div>
                       <div className='mt-2'>
                        <input className='amountInput' type="text"  />
                       </div>
                       <div>
                        <button className='continueBtn m-4' onClick={() => navigate('/depositManually')}>
                            <h3>CONTINUE</h3>
                        </button>
                       </div>
                       <div className='d-flex flex-row justify-content-evenly text-center'>
                        <div className='amount p-2'>200</div>
                        <div className='amount p-2'>500</div>
                        <div className='amount p-2'>1000</div>
                        <div className='amount p-2'>2500</div>
                       </div>

                       <div className='m-3'><u>MONEY HAS NOT ADDED AUTOMATICALLY?</u></div>
                       {/* <div><button className='utr' onClick={() => navigate('/utrNumber')}>UPLOAD PAYMENT UTR NUMBER AND SCREENSHOT</button></div> */}
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
          <button onClick={handleUpload}>Upload</button>
        </div>
      )}
    </div>

                    </div>
                   


                </div>
            </div>
            <Sidebar />
            <BetSlip />
        </div>
    )
}
