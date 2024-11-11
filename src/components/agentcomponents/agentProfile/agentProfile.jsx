import React, { useState } from "react";
import "./agentprofile.css"
import { useNavigate } from "react-router-dom";
import { alertToast } from "../../../alertToast";
import { useEffect } from "react";
import Base_Url from "../../../config";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { AgentNavbar } from "../agentnav";


export const AgentProfile= () => {
  const navigate = useNavigate();
  const [data,setData]=useState()

  const token = localStorage.getItem("agentToken");
  if (!token) {
    navigate("/agenthome");
  }
  useEffect(() => {
    console.log("entered to fetch")
    const fetchAgentProfile=async()=>{
        const fetchedProfile = await fetch(
            `${Base_Url}/agent/agent-profile`,
           {
             method: "GET",
             headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
             },
           }
         );
    
         const responsedata=await fetchedProfile.json();
         setData(responsedata)
         console.log(responsedata)
         if(fetchedProfile.status===403){   
           navigate('/agentlogin');
         }
    }
    
    fetchAgentProfile()
  }, []);

//   logout funciton
  const handleLogout = () => {
    localStorage.removeItem("agentToken");
    navigate("/agentlogin");
    toast.success("Logged out successfully!");
  };

//   data format function
function formatDate(dateString) {
    const date = new Date(dateString);
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const monthShort = date.toLocaleString('en-US', { month: 'short' });
  
    return `(${day}-${monthShort.toLowerCase()})`;
  }



  return(
    <>
    <AgentNavbar/>
    <div className="agentprofile-main-bg">
        {/* <button onClick={()=>navigate("/agenthome")} className="agent-back-btn">Home</button> */}
        <div className="agent-profile-card-bg">
            <div className="agetn-card-top">
            <p className="agenttop-join">Joind on : {formatDate(data?.createdAt)}</p>
            <p className="dots-card">•••</p>
            </div>
           <div className="agent-card-icon-bg">
           <FaUser className="agent-card-icon"/>         
           </div>
           <p className="agent-tag-line">@agent</p>

           <div className="agent-label">
            <p className="agent-label-name">Email : </p>
            <p className="agent-label-value">{data?.email}</p>
           </div>

           <div className="agent-label">
            <p className="agent-label-name">Number : </p>
            <p className="agent-label-value">{data?.phone}</p>
           </div>

           <div className="agent-label">
            <p className="agent-label-name">ReferalCode : </p>
            <p className="agent-label-value">{data?.referralCode}</p>
           </div>

           <div className="agent-label">
            <p className="agent-label-name">UID : </p>
            <p className="agent-label-value">{data?.uid}</p>
           </div>

           {/* <div className="agent-label">
            <p className="agent-label-name">ReferralCommission : </p>
            <p className="agent-label-value">{data?.referralCommission}%</p>
           </div> */}
           
           <button onClick={()=>handleLogout()} className="agent-card-logout">LogOut</button>

      
        </div>
    </div>
    </>

  )






}