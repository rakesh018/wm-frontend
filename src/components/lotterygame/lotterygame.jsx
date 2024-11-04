import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Gamenav } from "../games/Gamenav";
import { Navbar } from "../../Navbar";
import { Sidebar } from "../../Sidebar";
import { BetSlip } from "../../BetSlip";

import "./lottery.css";

export const LotteryGame = () => {
  const navigate = useNavigate();
  const boxes = Array.from({ length: 100 }, (_, index) => index + 1);
  useEffect(() => {
    // Check if the script is already present; if not, create and load it
    if (!document.getElementById("tickcounter-sdk")) {
      const script = document.createElement("script");
      script.id = "tickcounter-sdk";
      script.src = "//www.tickcounter.com/static/js/loader.js";
      document.body.appendChild(script);
    }
  }, []);

  return (
    <>
      <Navbar />

      <div className="container-fluid lottery-main-bg-container">
        <div className="row">
          {/* <div className=""> */}
          <div className="col-12 timer-bg">
            <button
              onClick={() => navigate("/home")}
              className="lottery-btn-back"
            >
              Back
            </button>

            <a
              data-type="countdown"
              data-name="Lottery Ends In :"
              data-bg_color="#ffffff"
              data-name_color="#000000"
              data-border_width="0"
              data-dt="2024-11-03 17:00:00"
              data-timezone="Indian/Maldives"
              data-units="hms"
              style={{
                display: "block",
                fontWeight: "bold",
                width: "250px",
                position: "relative",
                paddingBottom: "8%",
              }}
              className="tickcounter"
              href="//www.tickcounter.com"
            >
              Countdown
            </a>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-8">
            <div className="grid-container">
              {boxes.map((id) => (
                <div key={id} className="grid-box">
                  {id}
                </div>
              ))}
            </div>
            <div className="text-center mt-3">
              <button className="lottery-btn">Get Ticket (100)</button>
            </div>
          </div>
          <div className="col-12 col-md-4 mb-3 mt-4 mt-md-0">
            <h1 className="betslips-heading">Bet Slips</h1>
            <div className="tickets-bg-container">
              <div className="ticket-bg">
                <div className="ticket-details">
                  <p className="ticket-uid">
                    UID : <span>2S31H4k</span>
                  </p>
                  <p className="ticket-amount">
                    Amount : <span>100</span>
                  </p>
                  <p className="ticket-status">
                    Status : <span>Pending</span>
                  </p>
                </div>

                <div className="barcode">
                  <div className="bar thin"></div>
                  <div className="bar thick"></div>
                  <div className="bar medium"></div>
                  <div className="bar thin"></div>
                  <div className="bar thick"></div>
                  <div className="bar medium"></div>
                  <div className="bar thick"></div>
                  <div className="bar thin"></div>
                  <div className="bar thick"></div>
                  <div className="bar medium"></div>
                  <div className="bar thin"></div>
                  <div className="bar thick"></div>
                </div>
              </div>
              <div className="ticket-bg">
                <div className="ticket-details">
                  <p className="ticket-uid">
                    UID : <span>2S31H4k</span>
                  </p>
                  <p className="ticket-amount">
                    Amount : <span>100</span>
                  </p>
                  <p className="ticket-status">
                    Status : <span className="status-2">Win</span>
                  </p>
                </div>

                <div className="barcode">
                  <div className="bar thin"></div>
                  <div className="bar thick"></div>
                  <div className="bar medium"></div>
                  <div className="bar thin"></div>
                  <div className="bar thick"></div>
                  <div className="bar medium"></div>
                  <div className="bar thick"></div>
                  <div className="bar thin"></div>
                  <div className="bar thick"></div>
                  <div className="bar medium"></div>
                  <div className="bar thin"></div>
                  <div className="bar thick"></div>
                </div>
              </div>
              <div className="ticket-bg">
                <div className="ticket-details">
                  <p className="ticket-uid">
                    UID : <span>2S31H4k</span>
                  </p>
                  <p className="ticket-amount">
                    Amount : <span>100</span>
                  </p>
                  <p className="ticket-status">
                    Status : <span className="status-3">Lost</span>
                  </p>
                </div>

                <div className="barcode">
                  <div className="bar thin"></div>
                  <div className="bar thick"></div>
                  <div className="bar medium"></div>
                  <div className="bar thin"></div>
                  <div className="bar thick"></div>
                  <div className="bar medium"></div>
                  <div className="bar thick"></div>
                  <div className="bar thin"></div>
                  <div className="bar thick"></div>
                  <div className="bar medium"></div>
                  <div className="bar thin"></div>
                  <div className="bar thick"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
