import React from 'react';
import './logopage.css';
import logoImage from '../../images/logoImage.jpeg';
import { useNavigate } from 'react-router-dom';





export const Logopage = () => {
  const navigate = useNavigate();
  return (
    <div className='logo container-fluid d-flex justify-content-center col-sm-12'>
      <div className='box mt-5 text-center'>
        <div>
          <h1 className='logo-text'>WELCOME </h1>
        </div>
        <div className='logo-text'>

          <h1>  TO</h1>
        </div>

        <div><img src={logoImage} className='logoImage' alt="" /> </div>
        <div className='logo-text mt-3'>
          <h3>PLEASE LOGIN TO CONTINUE</h3>

        </div>
        <div>
          <button className='login-button' onClick={() => navigate('/login')}>
            LOGIN
          </button>
        </div>
        <h3 className='logo-text mt-2'>OR</h3>
        <div className='logo-text'>
          <h3>NEW TO WEBSITE</h3>

        </div>
        <div className='mt-3'>
          <button className='register-button' onClick={() => navigate('/register')}>
            REGISTER TO CONTINUE
          </button>
        </div>

      </div>



    </div>
  )
}
