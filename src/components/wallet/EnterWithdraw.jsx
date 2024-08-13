import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../Navbar';
import { Sidebar } from '../../Sidebar';
import { BetSlip } from '../../BetSlip';
import { useState } from 'react';
import Modal from 'react-modal';
import success from '../../images/success.png';
import failure from '../../images/failure.png';



export const EnterWithdraw = () => {
    const navigate = useNavigate();
    
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ image: '', text: '' });

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
  return (
    <div>
        <Navbar/>

<div className=" container notificationBox mt-2 col-12 ">

<button className='notificationBtn ms-3'>WITHDRAW</button>
<div className="innerNotificationBox m-3 p-3 text-center">
    <div>
       <div>ENTER THE AMOUNT,PLEASE</div>
       <div className='mt-2'>(FROM 200-100000)</div>
       <div className='mt-2'>
        <input className='amountInput' type="text"  />
       </div>
       <div>
        <button className='continueBtn m-4'>
            <h3>CONTINUE</h3>
        </button>
       </div>
       <div className='d-flex flex-row justify-content-evenly text-center'>
        <div className='amount p-2'>200</div>
        <div className='amount p-2'>500</div>
        <div className='amount p-2'>1000</div>
        <div className='amount p-2'>2500</div>
       </div>
       <button onClick={openSuccessModal}>SUCCESS</button>
       <button onClick={openFailureModal}>FAILURE</button>
       <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={closeModal}
                                contentLabel="Example Modal"
                                className="Modal"
                                overlayClassName="Overlay"
                            >
                                <button className="close-button" onClick={closeModal}>X</button>
                                <img src={modalContent.image} alt={modalContent.text} />
                                <div>  <p className='popUp m-2'>{modalContent.text} </p></div>

                            </Modal>

    </div>
   


</div>
</div>
<Sidebar/>
<BetSlip/>
    </div>
  )
}
