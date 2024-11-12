import React, { useState, useEffect, useRef } from "react";
import { AdminNavbar } from "../AdminHome/AdminNavbar";
import { AdminSidebar } from "../AdminHome/AdminSidebar";
import { FiUser } from "react-icons/fi";
import { alertToast } from "../../../alertToast";
import Base_Url from "../../../config";
import "./adminchat.css";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../AdminHome/Pagination";

export const AdminChat = () => {
  const navigate = useNavigate();
  const adminToken = localStorage.getItem("adminToken");
  const [viewdata, setViewData] = useState("");
  const messagesEndRef = useRef(null);
  const [showchat, setshowchat] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // const transpaginate = (pageNumber) => setCurrentTransPage(pageNumber);

  // const [selectedContact, setSelectedContact] = useState(null); // Current selected contact
  // const [page, setPage] = useState(1);
  // const [loading, setLoading] = useState(false);
  // const chatContainerRef = useRef(null);

  // new_____


  // Fetch chat history
  const fetchChatHistory = async (page) => {
    // setLoading(true);
    try {
      const response = await fetch(`${Base_Url}/chat/fetch-all-chats`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (response.ok) {
        const chatHistory = await response.json();
        setViewData(chatHistory);
        console.log(chatHistory);
        // setViewData((prevData) => [...chatHistory.chats.reverse(), ...prevData]);
      } else {
        alertToast("Failed to load chat history", "error");
      }
    } catch (error) {
      alertToast("Error loading chat history", "error");
    }
    // finally {
    // setLoading(false);
    // }
  };

  useEffect(() => {
    fetchChatHistory();
  }, []);

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  function formatToDDMMHHMM(isoString) {
    const date = new Date(isoString);

    let day = date.getDate().toString().padStart(2, "0");
    let month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-indexed
    let hours = date.getHours().toString().padStart(2, "0");
    let minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day}-${month}/ ${hours}:${minutes}`;
  }

  // To show only the first 10 words of each recent message in the contact
  function getPreviewMessage(message) {
    const words = message.split(" ");
    return words.length > 6 ? words.slice(0, 6).join(" ") + "..." : message;
  }


  

  return (
    <div>
      <AdminNavbar />
      <AdminSidebar />
      <div className="container-fluid adminBox">
        <div className="row adminInnerBox d-flex p-2  ">
          <div className="col-12 contacts-bg-container">
            {viewdata.chats == "" ? (
              <div>loading</div>
            ) : (
              viewdata.chats?.map((each) => (
                <div
                  className={`msg-user-contact-bg ${
                    each.unseenCount !== 0 ? "" : "msg-user-contact-unread-bg"
                  }`}

                  onClick={() => navigate(`/adminchat_detail/${each.sender}?uid=${encodeURIComponent(each.uid)}`)}
                >
                  <div className="chat-img-name-msg-bg ">
                    <div className="chat-icon-bg">
                      <FiUser className="chat-user-icon" />
                    </div>
                    <div className="chat-name-mesage-bg">
                      <p className="chat-name-contact">{each.uid}</p>
                      <p className="chat-mesage-contact">
                        {getPreviewMessage(each.recentMessagePreview)}
                      </p>
                    </div>
                  </div>
                  <p className="chat-contact-time">
                    {formatToDDMMHHMM(each.lastMessageTime)}
                  </p>
                </div>
              ))
            )}

            <Pagination
              totalPages={viewdata.totalPages}
              paginate={paginate}
              currentPage={viewdata.currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
