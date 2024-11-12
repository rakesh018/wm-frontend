import React, { useState, useEffect, useRef, useCallback } from "react";
import { AdminNavbar } from "../AdminHome/AdminNavbar";
import { AdminSidebar } from "../AdminHome/AdminSidebar";
import { FiUser } from "react-icons/fi";
import { alertToast } from "../../../alertToast";
import Base_Url from "../../../config";
import "./adminchat.css";
import { useNavigate, useLocation } from "react-router-dom";
import socket from "../../../adminSocket";
import { useParams } from "react-router-dom";

export const Openchat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const adminToken = localStorage.getItem("adminToken");
  const wordLimit = 300;
  const [text, setText] = useState("");
  const [contactChats, setContactChats] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const uid = queryParams.get("uid");

  const [ChatPage, setChatPage] = useState(1);
  const [ChatLoading, setChatLoading] = useState(false);
  const [ChatHasMore, setChatHasMore] = useState(true);
  const lastChatElementRef = useRef();

  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

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

  const fetchChatHistory = async () => {
    setChatLoading(true);
    try {
      const response = await fetch(
        `${Base_Url}/chat/fetch-chat-for-admin?page=${ChatPage}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify({ userId: id }),
        }
      );

      if (response.ok) {
        MarkAsRead(id)
        const chatHistory = await response.json();
        setContactChats((prevChats) => [
          ...chatHistory.chats.reverse(),
          ...prevChats,
        ]);
        setChatHasMore(ChatPage < chatHistory.totalPages);
      } else {
        alertToast("Failed to load chat history", "error");
      }
    } catch (error) {
      console.log(error);
      alertToast("Error loading chat history", "error");
    } finally {
      setChatLoading(false);
    }
  };

  useEffect(() => {
    fetchChatHistory();
  }, [ChatPage]);

  useEffect(() => {
    if (!ChatLoading && ChatHasMore) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setChatPage((prev) => prev + 1);
          }
        },
        { threshold: 1.0 }
      );

      if (lastChatElementRef.current) {
        observer.observe(lastChatElementRef.current);
      }

      return () => observer.disconnect();
    }
  }, [ChatLoading, ChatHasMore]);

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [contactChats, scrollToBottom]);

  useEffect(() => {
    const UserSocketResponse = (data) => {
      setContactChats((prevChats) => [...prevChats, data.newChat]);
      scrollToBottom();
    };

    socket.on("chatMessage", UserSocketResponse);

    return () => {
      socket.off("chatMessage", UserSocketResponse);
    };
  }, [scrollToBottom]);

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
        body: JSON.stringify({ message: text, userId: id }),
      });
      const msgSentResponse = await response.json();

      if (response.ok) {
        setContactChats((prevChats) => [...prevChats, msgSentResponse]);
        setText("");
        alertToast("Message sent successfully!", "success");
      } else {
        alertToast("Failed to send message. Please try again.", "error");
      }
    } catch (error) {
      console.log(error);
      alertToast("Error sending message", "error");
    }
  };

  const handleTextChange = (e) => {
    const words = e.target.value.split(/\s+/);
    if (words.length <= wordLimit) {
      setText(e.target.value);
    }
  };
  function formatToDDMMHHMM(isoString) {
    const date = new Date(isoString);
    
    let day = date.getDate().toString().padStart(2, "0");
    let month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-indexed
    let hours = date.getHours().toString().padStart(2, "0");
    let minutes = date.getMinutes().toString().padStart(2, "0");
    
    return `${day}-${month}/${hours}:${minutes}`;
  }

  return (
    <>
      <AdminNavbar />
      <AdminSidebar />
      <div className="container-fluid adminBox">
        <div className="row adminInnerBox d-flex pb-4 detail_row_admin_chat">
          <div className="col-12 contacts-bg-container_new">
            <div className="new_admin_detail_heading">
              <div className="chat-icon-bg">
                <FiUser className="chat-user-icon" />
              </div>
              <p>{uid}</p>
            </div>

            <div
              className="messages-box-bg"
              ref={chatContainerRef}
            >
              {ChatLoading && <div className="text-center mt-4">Loading...</div>}
              <div ref={lastChatElementRef} />
              {contactChats.length === 0 ? (
                <div className="text-center">
                  <p>Send and receive messages</p>
                  <p>End-to-end encrypted</p>
                </div>
              ) : (
                contactChats.map((each, index) => {
                  const { message, createdAt, sender } = each;
                  const isAdmin = sender === "admin";
                  return (
                    <div
                      key={index}
                      className={`user-msg-bg ${
                        isAdmin ? "admin-msg-bg-admin" : "user-msg-bg-admin"
                      }`}
                    >
                      
                      <p className={`user-msg-bg-msg ${isAdmin ? "" : "user_bg_change"}`}>
                        {message}
                      </p>
                      <p className="user-msg-bg-time">
                        {formatToDDMMHHMM(createdAt)}
                      </p>
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
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
