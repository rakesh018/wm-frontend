import React from 'react';
import { AdminNavbar } from '../AdminHome/AdminNavbar';
import { AdminSidebar } from '../AdminHome/AdminSidebar';
import { useNavigate } from 'react-router-dom';



export const AdminDeposit = () => {
    const navigate = useNavigate();
  return (
 
 <div>
      <AdminNavbar />
      <AdminSidebar />

      <div className="container-fluid adminBox">
  <div className="adminInnerBox col-12" style={{ height: '70vh' }}>
    <div className='d-flex justify-content-center align-items-center' style={{ height: '100%' }}>
      <button className='automaticDepositBtn m-3' onClick={() => navigate('/automaticDeposit')} >AUTOMATIC DEPOSIT </button>
      <button className='manualDepositBtn m-3' onClick={() => navigate('/manualDeposit')}>MANUAL DEPOSIT</button>
     
    </div>
  </div>
</div>



    </div>

 
  )
}
