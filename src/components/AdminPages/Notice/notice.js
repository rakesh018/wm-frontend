import React, { useState, useEffect } from "react";
import { AdminNavbar } from "../AdminHome/AdminNavbar";
import { AdminSidebar } from "../AdminHome/AdminSidebar";
import "../Demo/demo.css";
import { alertToast } from "../../../alertToast";
import { useNavigate } from "react-router-dom";
import Base_Url from "../../../config";
import "./notice.css";
import { MdOutlineDelete } from "react-icons/md";
import { Pagination } from "../AdminHome/Pagination";

const Notifications = (props) => {
  const {each,notificatonDeltHandle} = props;
  const { notice,uid} = each;
  const deletenotice=()=>{notificatonDeltHandle(uid)};
  return (
    <div className="notification-bg">
      <p>{notice}</p>
      <MdOutlineDelete onClick={deletenotice} className="notification-delte-btn" />
    </div>
  );
};

export const AdminNotice = () => {
  const navigate = useNavigate();
  const adminToken = localStorage.getItem("adminToken");
  if (!adminToken) {
    navigate("/adminLogin");
  }

  const [Notificationsdata, setNotificationsdata] = useState(null);
  const [totalNotificationspage, setTotalNotificationsPages] = useState(1);
  const [currentNotificationPage, setCurrentNotificationPage] = useState(1);

  const paginate = (pageNumber) => {
    setCurrentNotificationPage(pageNumber);
  };

  const [notificationMsg, setnotificationMsg] = useState("");

  const postNotice = async () => {
    try {
      const response = await fetch(`${Base_Url}/admin/notice/createnotice`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notice: notificationMsg }),
      });
      const data = await response.json();
      if (response.status === 403) {
        navigate("/adminLogin");
      }
      if (response.ok) {
        alertToast("Notice created successfully", "success");
        window.location.reload();
      } else {
        alertToast("Error while creating notice", "error");
      }
    } catch (error) {
      alertToast("Error while creating notice", "error");
    }
  };

  const notificatonDeltHandle=async(uid)=>{
    try {
        const response = await fetch(`${Base_Url}/admin/notice/${uid}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            "Content-Type": "application/json",
          }
        });
        const data = await response.json();
        if (response.status === 403) {
          navigate("/adminLogin");
        }
        if (response.ok) {
          alertToast("Notice Deleted Successfylly ", "success");
          window.location.reload();
        } else {
          alertToast("Error while deleting notice", "error");
        }
      } catch (error) {
        alertToast("Error while deleting notice", "error");
      }

  }

  useEffect(() => {
    const fetchNotifactionDAta = async () => {
      try {
        const response = await fetch(
          `${Base_Url}/admin/notice?page=${currentNotificationPage}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (response.status === 403) {
          navigate("/adminLogin");
        }
        if (response.ok) {
          setNotificationsdata(data.paginatedNotices);
          setTotalNotificationsPages(data.totalPages);
        } else {
          alertToast("Error fetching Notification details", "error");
        }
      } catch (error) {
        console.error(error);
        alertToast("Error fetching Notification details", "error");
      }
    };

    fetchNotifactionDAta();
  }, [currentNotificationPage]);

  return (
    <div>
      <AdminNavbar />
      <AdminSidebar />
      <div className="container-fluid ">
        <div className="row adminInnerBox ">
          <div className="col-12">
            <h1>Notice Board!</h1>

            <div className="notification-input-bg">
              <input
                type="text"
                onChange={(event) => setnotificationMsg(event.target.value)}
                placeholder="Enter Notification Here......"
              />
              <button onClick={postNotice}>Add</button>
            </div>

            <div className="all-notification-bg">
              {totalNotificationspage<=0?<div className="no-notification-msg">no notification</div>:Notificationsdata?.map((each) => (
                <Notifications key={each.uid} each={each} notificatonDeltHandle={notificatonDeltHandle} />
              ))}
            </div>

            <div className="d-flex justify-content-center pagination-container">
              <Pagination
                totalPages={totalNotificationspage}
                paginate={paginate}
                currentPage={currentNotificationPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
