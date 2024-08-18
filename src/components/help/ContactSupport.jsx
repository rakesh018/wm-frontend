import React from 'react';
import { Navbar } from '../../Navbar';
import { Sidebar } from '../../Sidebar';
import { BetSlip } from '../../BetSlip';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const ContactSupport = () => {
    const navigate = useNavigate();
    const token=localStorage.getItem('token');
    if(!token){
        navigate('/login');
    }
    const [showTextArea, setShowTextArea] = useState(false);
    const [text, setText] = useState("");
    const wordLimit = 300;

    const handleButtonClick = () => {
        setShowTextArea(true);
    };

    const handleTextChange = (e) => {
        const words = e.target.value.split(/\s+/);
        if (words.length <= wordLimit) {
            setText(e.target.value);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container notificationBox mt-2 col-12">
                <button className='notificationBtn ms-3'>HELP</button>
                <button className='supportBtn ms-3 p-2 d-lg-none' onClick={() => navigate("/contactSupport")}>CONTACT SUPPORT</button>
                
                <div className="innerNotificationBox m-3 p-3 text-center">
                    <label>

                        <textarea
                            name="postContent"
                            rows={11} // Adjust this to fit around 300 words
                            cols={40}
                            value={text}
                            onChange={handleTextChange}
                            style={{ borderColor: 'darkgoldenrod', width: '100%' }} 
                        />
                    </label>
                    <button className="queryBtn mt-2" onClick={() => alert('Query Sent!')} >SEND</button>
                </div>
            </div>
            <Sidebar />
            <div className="d-none d-lg-block">
                <BetSlip />
            </div>
        </div>
    );
};
