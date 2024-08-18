import React from 'react';
import { Navbar } from '../../Navbar';
import { Sidebar } from '../../Sidebar';
import { BetSlip } from '../../BetSlip';
import helpImage from '../../images/helpImage.png';
import './help.css';
import { useNavigate } from 'react-router-dom';

export const Help = () => {
  const navigate = useNavigate();
  const token=localStorage.getItem('token');
  if(!token){
    navigate('/login');
  }
  return (
    <div>
      <Navbar />
      <div className="container notificationBox mt-2 col-12">
        <button className='notificationBtn ms-3'>HELP</button>
        <button className='supportBtn  ms-3 p-2 d-lg-none' onClick={() => navigate("/contactSupport")}>CONTACT SUPPORT</button>
       
        <div className="innerNotificationBox m-3 p-3 text-center"  >
          <div className="d-flex justify-content-center">
            <div>
              <img src={helpImage} alt="Help" />
            </div>
            <div className='mt-3'>
              <h5><u>CHOOSE YOUR PROBLEM FROM THE GIVEN</u></h5>
            </div>
          </div>
          <div className='text-center'>
            
            <div className="accordion" id="helpAccordion">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    WITHDRAW SUCCESS BUT MONEY HAVEN’T RECEIVED YET
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#helpAccordion">
                  <div className="accordion-body">
                    <p>PLEASE WAIT FOR 2-3 DAYS FOR MONEY TO BE DEPOSITED IN YOUR ACCOUNT</p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    MONEY NOT GETTING DEPOSITED MANUALLY
                  </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#helpAccordion">
                  <div className="accordion-body">
                    <p>PLEASE WAIT FOR 1-2 HOURS TO REFLECT IN YOUR ACCOUNT</p>
                  </div>
                </div>
              </div>
              <div className="accordion-item d-none d-sm-block">
                <h2 className="accordion-header" id="headingThree">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    NOTIFICATIONS ARE NOT GETTING
                  </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#helpAccordion">
                  <div className="accordion-body">
                    <p>PLEASE TRY EXITING THE WEB AND OPEN AGAIN</p>
                  </div>
                </div>
              </div>
              <div className="accordion-item d-none d-sm-block">
                <h2 className="accordion-header" id="headingFour">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                    DID YOU FIND ANY GLITCH IN THE WEBSITE
                  </button>
                </h2>
                <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#helpAccordion">
                  <div className="accordion-body">
                    <p>PLEASE REPORT THE ISSUE THROUGH OUR SUPPORT</p>
                    <button className='queryBtn' onClick={() => navigate("/contactSupport")}>CONTACT SUPPORT</button>

                  </div>
                </div>
              </div>
           
             
            </div>
         
          </div>
        </div>
      </div>
      <Sidebar />
  <div className="d-none d-lg-block">
  <BetSlip />
  </div>
    </div>
  )
}
