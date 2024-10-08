import React, { useState } from 'react';
import { Navbar } from '../../Navbar';
import { Sidebar } from '../../Sidebar';
import { BetSlip } from '../../BetSlip';
import { useNavigate } from 'react-router-dom';
import { alertToast } from '../../alertToast';
import Base_Url from '../../config';

export const ContactSupport = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    if (!token) {
        navigate('/login');
    }

    const [text, setText] = useState("");
    const wordLimit = 300;

    const handleTextChange = (e) => {
        const words = e.target.value.split(/\s+/);
        if (words.length <= wordLimit) {
            setText(e.target.value);
        }
    };

    const handleSendQuery = async () => {
        if (!text.trim()) {
            alertToast("Please enter a message before sending", "warning");
            return;
        }

        try {
            const response = await fetch( `${Base_Url}/profile/make-query`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // Send token for authentication
                },
                body: JSON.stringify({ query: text }),
            });

            if (response.ok) {
                setText(""); // Clear the text area after successful submission
                alertToast("Your query has been sent successfully!", "success");
            } else {
                alertToast("Failed to send your query. Please try again.", "error");
            }
        } catch (error) {
            alertToast("An error occurred while sending your query.", "error");
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
                            rows={11}
                            cols={40}
                            value={text}
                            onChange={handleTextChange}
                            style={{ borderColor: 'darkgoldenrod', width: '100%' }}
                        />
                    </label>
                    <button className="queryBtn mt-2" onClick={handleSendQuery}>SEND</button>
                </div>
            </div>
            <Sidebar />
            <div className="d-none d-lg-block">
                <BetSlip />
            </div>
        </div>
    );
};
