import React, { useState, useEffect, useRef } from "react";
import { AdminNavbar } from "../AdminHome/AdminNavbar";
import { AdminSidebar } from "../AdminHome/AdminSidebar";
import { FiUser } from "react-icons/fi";
import { alertToast } from "../../../alertToast";
import Base_Url from "../../../config";
import "./adminchat.css";

import { useNavigate } from "react-router-dom";
import socket from "../../../adminSocket";

// chat view functions

const data = [
  {
    message: "hello admin i am unable to deposit",
    time: "9:30 AM",
    user: "user",
  },
  {
    message: "we are working on your query",
    time: "9:35 AM",
    user: "admin",
  },
  {
    message: "how long does it take to resolve",
    time: "9:40 AM",
    user: "user",
  },
  {
    message: "it depends on the type of query",
    time: "9:45 AM",
    user: "admin",
  },
  {
    message: "please make it fast i need to deposite",
    time: "9:50 AM",
    user: "user",
  },
  {
    message: "it depends on the type of query",
    time: "9:45 AM",
    user: "admin",
  },
  {
    message: "please make it fast i need to deposite",
    time: "9:50 AM",
    user: "user",
  },
  {
    message: "we will make it as fast as we can",
    time: "9:55 AM",
    user: "admin",
  },
  {
    message: "thank you",
    time: "10:00 AM",
    user: "user",
  },
  {
    message: "any other queries feel free to reach us",
    time: "10:05 AM",
    user: "admin",
  },
];

export const AdminChat = () => {
  const navigate = useNavigate();
  const adminToken = localStorage.getItem("adminToken");

  const [text, setText] = useState("");
  const [viewdata, setViewData] = useState("");
  const [contactChats, setContactChats] = useState("");
  const [selectedContact, setSelectedContact] = useState(null); // Current selected contact
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

  const wordLimit = 300;


  // mark as read chat _______
  const MarkAsRead = async (contactId) => {
    try {
      console.log(contactId);
      const response = await fetch(
        `${Base_Url}/chat/mark-chat-seen`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify({ userId: contactId }),
        }
      );
      if (response.ok) {
        const markasread_res = await response.json();
        console.log(markasread_res)
      } else {
        alertToast("Failed mark as read chat", "error");
      }
    } catch (error) {
      console.log(error);
      alertToast("Error mark as read chat", "error");
    }
  };
  // Fetch chat history
  const fetchChatHistory = async (page) => {
    // setLoading(true);
    try {
      const response = await fetch(`${Base_Url}/chat/fetch-all-chats`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      console.log(response);
      if (response.ok) {
        const chatHistory = await response.json();
        setViewData(chatHistory.chats);
        console.log(chatHistory.chats);
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

  // Fetch chat history of selected contact
  const fetchPirticularChatHistory = async (contactId) => {
    try {
      console.log(contactId);
      const response = await fetch(
        `${Base_Url}/chat/fetch-chat-for-admin?page=${page}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify({ userId: contactId }),
        }
      );
      if (response.ok) {
        const chatHistory = await response.json();
        MarkAsRead(contactId)
        setContactChats([...chatHistory.chats.reverse()]);
        // setContactChats((prevData) => [...chatHistory.chats.reverse(), ...prevData]);
        console.log(chatHistory.chats)
        // setViewData(chatHistory.chats); // Set chat messages
      } else {
        alertToast("Failed to load pirticular chat", "error");
      }
    } catch (error) {
      console.log(error);
      alertToast("Error loading pirticular chat", "error");
    }
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

  // Automatically scroll to the bottom when viewData changes
  useEffect(() => {
    scrollToBottom();
  }, [contactChats]);

  const handleTextChange = (e) => {
    const words = e.target.value.split(/\s+/);
    if (words.length <= wordLimit) {
      setText(e.target.value);
    }
  };

  function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    const strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  const handleSendQuery = async () => {
    if (!text.trim()) {
      alertToast("Please enter a message before sending", "warning");
      return;
    }
    

    try {
      const response = await fetch(`${Base_Url}/chat/send-msg-by-admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ message: text, userId: selectedContact.sender }),
      });
      const msg_sent_response = await response.json();
      console.log(msg_sent_response);
      if (response.ok) {
        setContactChats((prevdata) => [...prevdata, msg_sent_response]);
        setText("");
        alertToast("Your query has been sent successfully!", "success");
      } else {
        alertToast("Failed to send your query. Please try again.", "error");
      }
    } catch (error) {
      alertToast("An error occurred while sending your query.", "error");
    }
  };

  // formating time
  function formatToHHMM(isoString) {
    const date = new Date(isoString);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    hours = hours.toString().padStart(2, "0");
    minutes = minutes.toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  // To show only the first 10 words of each recent message in the contact
  function getPreviewMessage(message) {
    const words = message.split(" ");
    return words.length > 6 ? words.slice(0, 6).join(" ") + "..." : message;
  }

  // Handle scroll to load more messages when scrolled to the top
  const handleScroll = () => {
    if (chatContainerRef.current.scrollTop === 0 && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Handle click on contact
  const handleContactClick = (contact) => {
    setSelectedContact(contact); // Set selected contact
    fetchPirticularChatHistory(contact.sender); // Fetch chat history
  };

useEffect(()=>{
  const User_socket_response=(data)=>{
    setContactChats((prevdata) => [...prevdata, data.newChat]);
  }

  socket.on("chatMessage", User_socket_response);

},[])



  return (
    <div>
      <AdminNavbar />
      <AdminSidebar />
      <div className="container-fluid adminBox">
        <div className="row adminInnerBox d-flex p-2  ">
          <div className=" p-2 col-3 contacts-bg-container">
            {viewdata == "" ? (
              <div>loading</div>
            ) : (
              viewdata.map((each) => (
                <div
                  className={`msg-user-contact-bg ${each.unseenCount!==0?"":"msg-user-contact-unread-bg"}`}
                  onClick={() => handleContactClick(each)}
                >
                  <div className="chat-img-name-msg-bg ">
                    <div className="chat-icon-bg">
                      <FiUser className="chat-user-icon" />
                    </div>
                    <div className="chat-name-mesage-bg">
                      <p className="chat-name-contact">Srinath</p>
                      <p className="chat-mesage-contact">
                        {getPreviewMessage(each.recentMessagePreview)}
                      </p>
                    </div>
                  </div>
                  <p className="chat-contact-time">
                    {formatToHHMM(each.lastMessageTime)}
                  </p>
                </div>
              ))
            )}
            {/* <div className="msg-user-contact-bg">
              <div className="chat-img-name-msg-bg">
                <div className="chat-icon-bg">
                  <FiUser className="chat-user-icon" />
                </div>
                <div className="chat-name-mesage-bg">
                  <p className="chat-name-contact">Srinath</p>
                  <p className="chat-mesage-contact">Hello i want.....</p>
                </div>
              </div>
              <p className="chat-contact-time">9:30 PM</p>
            </div>
            <div className="msg-user-contact-bg msg-user-contact-unread-bg">
              <div className="chat-img-name-msg-bg">
                <div className="chat-icon-bg">
                  <FiUser className="chat-user-icon" />
                </div>
                <div className="chat-name-mesage-bg">
                  <p p className="chat-name-contact">
                    Rakesh
                  </p>
                  <p className="chat-mesage-contact">Hello i want.....</p>
                </div>
              </div>
              <p className="chat-contact-time">9:30 PM</p>
            </div>
            <div className="msg-user-contact-bg">
              <div className="chat-img-name-msg-bg">
                <div className="chat-icon-bg">
                  <FiUser className="chat-user-icon" />
                </div>
                <div className="chat-name-mesage-bg">
                  <p className="chat-name-contact">Vinay Kumar</p>
                  <p className="chat-mesage-contact">Hello i want.....</p>
                </div>
              </div>
              <p className="chat-contact-time">9:30 PM</p>
            </div> */}
          </div>
          <div className=" p-2 col-9 admininnerchatbg ">
            {/* <div className="admininner"> */}
            <div
              className="messages-box-bg"
              ref={chatContainerRef}
              onScroll={handleScroll}
            >
              {contactChats == "" ? (
                <div className="text-center">
                  <p>Send And Recieve Messages</p>
                  <p>End to end encrypted</p>
                </div>
              ) : (
                contactChats.map((each) => {
                  const { message, createdAt, sender } = each;
                  const admin_class =
                    sender == "admin" ? "admin-msg-bg-admin" : "";
                  const is_user_bg_change =
                  sender !== "admin" ? "user_bg_change" : "";

                  return (
                    <div className={`user-msg-bg user-msg-bg-admin ${admin_class} `}>
                      <p className={`user-msg-bg-time `}>
                        {formatToHHMM(createdAt)}
                      </p>
                      <p className={`user-msg-bg-msg ${is_user_bg_change}`}>{message}</p>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef}></div>
            </div>

            <div className="search-box-bg">
              <input
                value={text}
                onChange={handleTextChange}
                type="text"
                placeholder="Enter message"
              />
              <button onClick={handleSendQuery} className="btn btn-primary">
                send
              </button>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};
