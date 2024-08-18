import React, { useEffect, useState } from "react";
import { Navbar } from "../../Navbar";
import { Sidebar } from "../../Sidebar";
import { BetSlip } from "../../BetSlip";
import "./notification.css";
import del from "../../images/deleteIcon.png";

export const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    async function getNotifs() {
      const notifs = await fetch(
        "https://server.trademax1.com/profile/get-all-notifications",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const parsedNotifs = await notifs.json();
      const originalNotifs = parsedNotifs.notifications;
      //converting time into readable format
      originalNotifs.map((notif) => {
        const getdate = new Date(notif.createdAt);
        return (notif.createdAt = getdate.toLocaleString());
      });
      setNotifications(originalNotifs);
    }
    getNotifs();
  }, []);
  const handleDelete = async (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
    //mark seen in database
    const res=await fetch("https://server.trademax1.com/profile/mark-notification-seen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body:JSON.stringify({notificationId:id})
    });
    const parsedRes=await res.json();
    const originalNotifs=parsedRes.notifications;
    setNotifications(originalNotifs);
  };

  return (
    <div>
      <Navbar />
      <div className="container notificationBox mt-2">
        <button className="notificationBtn ms-3">NOTIFICATIONS</button>
        <div className="innerNotificationBox m-3 p-3 text-center "style={{  overflowY: 'auto' }}>
          {notifications?.length > 0 ? (
            notifications.map((notification) => (
              <div key={notification._id} className="loginNotification m-3 ">
                <div>
                  {notification.notificationType.toUpperCase()} NOTIFICATION
                </div>
                {notification.message} {notification.createdAt.toLocaleString()}
                <img
                  src={del}
                  className="deleteIcon"
                  alt="delete icon"
                  onClick={() => handleDelete(notification._id)}
                />
              </div>
            ))
          ) : (
            <div>No notifications</div>
          )}
        </div>
      </div>
      <Sidebar />
      <BetSlip />
    </div>
  );
};
