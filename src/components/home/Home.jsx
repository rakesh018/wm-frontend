import React, { useEffect } from "react";
import { Navbar } from "../../Navbar";
import { Sidebar } from "../../Sidebar";
import { BetSlip } from "../../BetSlip";
import coinFlip from "../../images/coinFlipImg.png";
import traderImg from "../../images/traderImg.png";
import "./home.css";
import { useNavigate } from "react-router-dom";
import { profileAtom, betSlipsAtom } from "../../atoms";
import { useRecoilState } from "recoil";
import { CheckToken } from "../../checkToken";
import Base_Url from "../../config";

export const Home = () => {
  const navigate = useNavigate();
  const token=localStorage.getItem('token');
  if(!token){
    navigate('/login');
  }
  const [profile, setProfile] = useRecoilState(profileAtom);
  const [betSlips, setBetSlips] = useRecoilState(betSlipsAtom);
  //displaying updated balance
  useEffect(() => {
    async function setBalance() {
      const fetchedProfile = await fetch(
         `${Base_Url}/profile/getProfile`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if(fetchedProfile.status===403){
        navigate('/login');
      }
      const data = await fetchedProfile.json();
      setProfile(data);
    }
    async function getBetSlips() {
      const fetchedSlips = await fetch(
         `${Base_Url}/bets/get-bet-slips`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if(fetchedSlips.status===403){
        navigate('/login');
      }
      const data = await fetchedSlips.json();
      setBetSlips(data);
    }
    setBalance();
    getBetSlips();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="container homeBox mt-2 ">
        <button className="featuredGames-btn">FEATURED GAMES</button>
        <div className="d-flex justify-content-evenly mt-4">
          <div className="gameBox text-center">
            <div className="game1 m-2 ">
              <img src={coinFlip} alt="" />
            </div>
          </div>

          <div className="gameBox text-center">
            <div className="game2 m-2">
              <img src={traderImg} alt="" />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-evenly">
          <button
            className="game1-btn m-3"
            onClick={() => navigate("/coinSwitch")}
          >
            Coin flip
          </button>
          <button className="game2-btn m-3" onClick={() => navigate("/trader")}>
            Trader Game
          </button>
        </div>
      </div>

      <Sidebar />

     <div className="d-none d-lg-block">
     <BetSlip />
     </div>
    </div>
  );
};
