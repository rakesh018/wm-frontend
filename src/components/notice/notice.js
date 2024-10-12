import React, { useEffect, useState } from "react";
import { Navbar } from "../../Navbar";
import { Sidebar } from "../../Sidebar";
import { BetSlip } from "../../BetSlip";
import "./notice.css";
import { useNavigate } from "react-router-dom";
import Base_Url from "../../config";
import { IoIosNotificationsOutline } from "react-icons/io"

export const Notices = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/token");
  }
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    async function getNotices() {
      const notifs = await fetch(`${Base_Url}/profile/get-all-notices`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (notifs.status === 403) {
        navigate("/login");
      }
      const parsedNotifs = await notifs.json();
      console.log(parsedNotifs.Notices);
      const originalNotifs = parsedNotifs.Notices;
      //converting time into readable format

      setNotices(originalNotifs);
      console.log(originalNotifs);
    }
    getNotices();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container notificationBox mt-2">
        <p className="notificationBtn ms-3">Notice Board</p>
        <div
          className="innerNotificationBox m-3 p-3  all-client-notices"
          
        >
          {notices?.length > 0 ? (
            notices.map((notice) => (
                <div key={notice._id} className="notice-bg-container m-3 ">
                 {<IoIosNotificationsOutline className="notification-icon"/>} {notice.notice}
                </div>
            ))
          ) : (
            <div>No notices</div>
          )}
        </div>
      </div>
      <Sidebar />
      <div className="betslip-mobile-hidden">
        <BetSlip />
      </div>
    </div>
  );
};
