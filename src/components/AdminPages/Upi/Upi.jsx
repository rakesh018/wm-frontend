import React, { useState, useEffect } from "react";
import { AdminNavbar } from "../AdminHome/AdminNavbar";
import { AdminSidebar } from "../AdminHome/AdminSidebar";
import "../Demo/demo.css";
import { alertToast } from "../../../alertToast";
import { useNavigate } from "react-router-dom";

export const UploadQR = () => {
  const navigate = useNavigate();
  const adminToken = localStorage.getItem("adminToken");
  if (!adminToken) {
    navigate("/adminLogin");
  }
  const [fileType, setFileType] = useState("");
  const [qrFile, setQrFile] = useState(null);
  const [upiId, setUpiId] = useState("");
  const [currentUpiId, setCurrentUpiId] = useState("");
  const [currentQr, setCurrentQr] = useState("");

  // Fetch existing UPI ID and QR Code from backend on component mount
  useEffect(() => {
    const fetchUpiData = async () => {
      try {
        const response = await fetch(
          "https://server.trademax1.com/admin/upi/get-upi-details",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        if(response.status===403){
          navigate('/adminLogin');
        }
        if (response.ok) {
          setCurrentUpiId(data.upiId);
          setCurrentQr(`${data.qrCode}?t=${new Date().getTime()}`);
          // setCurrentQr(data.qrCode); // Assuming the backend sends the URL of the existing QR code
        }
         else {
          alertToast("Error fetching UPI details", "error");
        }
      } catch (error) {
        console.error(error);
        alertToast("Error fetching UPI details", "error");
      }
    };

    fetchUpiData();
  }, []);

  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!qrFile) {
      alertToast("Please upload a QR code image", "error");
      return;
    }

    try {
      // Get presigned URL from backend for file upload
      const response = await fetch(
        "https://server.trademax1.com/admin/upi/get-psu-upi",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
          body: JSON.stringify({ fileType: qrFile.type }),
        }
      );
      const { url, key } = await response.json();
      if(response.status===403){
        navigate('/adminLogin');
      }

      if (response.ok && url) {
        // Upload file to AWS S3
        await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": qrFile.type,
          },
          body: qrFile,
        });
        console.log("uploaded to aws");
        // Once uploaded, send UPI ID and S3 key to backend
        const updateResponse = await fetch(
          "https://server.trademax1.com/admin/upi/update-upi-details",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
            body: JSON.stringify({ upiId, qrKey: key }),
          }
        );

        const updateData = await updateResponse.json();

        if (updateResponse.ok) {
          alertToast("UPI details updated successfully", "success");
          setCurrentUpiId(updateData.upiId);
          setCurrentQr(`${updateData.qrCode}?t=${new Date().getTime()}`);
          // setCurrentQr(updateData.qrCode); // Update displayed QR code
        } 
        else if(response.status===403){
          navigate('/adminLogin');
        }
        else {
          alertToast(updateData.error, "error");
        }
      } else {
        alertToast("Error getting presigned URL", "error");
      }
    } catch (error) {
      console.error(error);
      alertToast("Error uploading QR code", "error");
    }
  };

  return (
    <div>
      <AdminNavbar />
      <AdminSidebar />
      <div className="container-fluid adminBox">
        <div className="row adminInnerBox d-flex justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-12 d-flex flex-column justify-content-center m-5">
            <form onSubmit={handleSubmit} className="demoBox">
              {/* Display current UPI ID */}
              <div className="mb-3">
                <label>Current UPI ID: {currentUpiId || "Not set"}</label>
              </div>

              {/* Display current QR Code */}
              {currentQr && (
                <div className="mb-3">
                  <label>Current QR Code:</label>
                  <img
                    src={currentQr}
                    alt="QR Code"
                    style={{ width: "150px" }}
                  />
                </div>
              )}

              {/* Input for new UPI ID */}
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control demoInput"
                  placeholder="Enter new UPI ID"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  required
                />
              </div>

              {/* Input for QR Code file */}
              <div className="mb-3">
                <input
                  type="file"
                  className="form-control demoInput"
                  onChange={(e) => {
                    setQrFile(e.target.files[0]);
                    setFileType(e.target.files[0].type);
                  }}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary demoBtn m-3">
                UPDATE UPI DETAILS
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
