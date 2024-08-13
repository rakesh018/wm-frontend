import React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import { Navbar } from '../../Navbar'
import { Sidebar } from '../../Sidebar'
import { BetSlip } from '../../BetSlip';
import { useNavigate } from 'react-router-dom';
import success from '../../images/success.png';
import failure from '../../images/failure.png';
import './wallet.css';

export const UTR = () => {

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

    const navigate = useNavigate();
    return (
        <div>
            <Navbar />

            <div className=" container notificationBox mt-2 col-12 ">

                <button className='notificationBtn ms-3'>DEPOSIT</button>
                <div className="innerNotificationBox m-3 p-3 text-center">
                    <div>
                        <div>PLEASE ENTER UTR NUMBER</div>
                        <input type="text" className='amountInput m-3' />
                        <div>PLEASE ENTER UTR NUMBER</div>
                        <input type="text" className='amountInput m-3' />
                        <div>
                            <button className='continueBtn m-4'>
                                <h3>CONTINUE</h3>
                            </button>
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
            </div>
            <Sidebar />
            <BetSlip />
        </div>
    )
}
