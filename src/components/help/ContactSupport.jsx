import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "../../Navbar";
import { Sidebar } from "../../Sidebar";
import { BetSlip } from "../../BetSlip";
import { useNavigate } from "react-router-dom";
import { alertToast } from "../../alertToast";
import Base_Url from "../../config";
import socket from "../../socket";

export const ContactSupport = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
  }

  const [text, setText] = useState("");
  const [viewdata, setViewData] = useState([]);
  const wordLimit = 300;
  const [ChatPage, setChatPage] = useState(1);
  const [ChatLoading, setChatLoading] = useState(false);
  const [ChatHasMore, setChatHasMore] = useState(true);

  const chatContainerRef = useRef(null);
  const lastChatElementRef = useRef(null);
  const messagesEndRef = useRef(null);
  const observer = useRef();
  const preventScrollToBottomOnLoad = useRef(true);

  // Scroll to bottom function (used only when sending a new message)
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scroll to bottom on the first render only
  useEffect(() => {
    scrollToBottom();
    preventScrollToBottomOnLoad.current = false;
  }, []);

  // Fetch more messages on reaching the top
  useEffect(() => {
    if (ChatLoading) return;

    if (observer.current) observer.current.disconnect();
    const callback = (entries) => {
      if (entries[0].isIntersecting && ChatHasMore) {
        setChatPage((prev) => prev + 1);
      }
    };
    observer.current = new IntersectionObserver(callback);
    if (lastChatElementRef.current) {
      observer.current.observe(lastChatElementRef.current);
    }
  }, [ChatLoading, ChatHasMore]);

  // Fetch chat history when ChatPage changes
  const fetchChatHistory = async (page) => {
    setChatLoading(true);

    // Save the current scroll position
    const scrollHeightBeforeFetch = chatContainerRef.current.scrollHeight;

    try {
      const response = await fetch(
        `${Base_Url}/chat/fetch-chat-for-user?page=${page}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.ok) {
        const chatHistory = await response.json();

        // Update chat data without affecting scroll position
        setViewData((prevData) => [
          ...chatHistory.chats.reverse(),
          ...prevData,
        ]);
        setChatHasMore(page < chatHistory.totalPages);

        // Maintain scroll position after loading more messages
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight - scrollHeightBeforeFetch;
        }
      } else {
        alertToast("Failed to load chat history", "error");
      }
    } catch (error) {
      alertToast("Error loading chat history", "error");
    } finally {
      setChatLoading(false);
    }
  };

  // Fetch chat history on page load and page change
  useEffect(() => {
    if (token) {
      fetchChatHistory(ChatPage);
    } else {
      navigate("/login");
    }
  }, [token, ChatPage]);

  // Scroll to bottom only when a new message is received
  useEffect(() => {
    if (!preventScrollToBottomOnLoad.current) {
      scrollToBottom();
    }
  }, [viewdata]);

  // Listen to incoming socket messages
  useEffect(() => {
    const User_socket_response = (data) => {
      setViewData((prevdata) => [...prevdata, data.newChat]);
      scrollToBottom(); // Scroll to bottom on new messages only
    };

    socket.on("chatMessage", User_socket_response);

    return () => socket.off("chatMessage", User_socket_response);
  }, []);

  const handleTextChange = (e) => {
    const words = e.target.value.split(/\s+/);
    if (words.length <= wordLimit) {
      setText(e.target.value);
    }
  };

  function formatToDDMMHHMM(isoString) {
    const date = new Date(isoString);
    let day = date.getDate().toString().padStart(2, "0");
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let hours = date.getHours().toString().padStart(2, "0");
    let minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day}-${month}/ ${hours}:${minutes}`;
  }

  const handleSendQuery = async () => {
    if (!text.trim()) {
      alertToast("Please enter a message before sending", "warning");
      return;
    }

    try {
      const response = await fetch(`${Base_Url}/chat/send-msg-by-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: text }),
      });
      const msg_sent_response = await response.json();
      if (response.ok) {
        setViewData((prevdata) => [...prevdata, msg_sent_response]);
        setText("");
        alertToast("Your query has been sent successfully!", "success");

        // Scroll to the bottom after sending a message
        scrollToBottom();
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
        <button className="notificationBtn ms-3">HELP</button>

        <div className="innerNotificationBox m-3 p-3">
          <div className="messages-box-bg" ref={chatContainerRef}>
            {ChatLoading && <div className="text-center mt-4">Loading...</div>}
            <div ref={lastChatElementRef} /> {/* Trigger for Chat observer */}
            {viewdata.map((each, index) => {
              const { message, updatedAt, receiver } = each;
              const admin_class = receiver === "admin" ? "" : "admin-msg-bg";
              const is_admin_bg_change =
                receiver === "admin" ? "" : "admin_bg_change";

              return (
                <div key={index} className={`user-msg-bg ${admin_class}`}>
                 
                  <p className={`user-msg-bg-msg ${is_admin_bg_change}`}>
                    {message}
                  </p>
                  <p className="user-msg-bg-time">{formatToDDMMHHMM(updatedAt)}</p>
                </div>
              );
            })}
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
      <Sidebar />
      <div className="d-none d-lg-block">
        <BetSlip />
      </div>
    </div>
  );
};
