import React from 'react'
import { AdminNavbar } from '../AdminHome/AdminNavbar'
import { AdminSidebar } from '../AdminHome/AdminSidebar'
import './demo.css'

export const DemoAccount = () => {
  return (
    <div>
        <AdminNavbar/>
        <AdminSidebar/>
        <div className="container-fluid adminBox">
          <div className="adminInnerBox d-flex justify-content-center">
            <div className='demoBox d-flex flex-column justify-content-around m-5'>
              <div>
               <input type="text" className='demoInput' placeholder='EMAIL:' />
              </div>
              <div>
              <input type="text"  className='demoInput' placeholder='PASSWORD:'/>
              </div>
              <div>
                <input type="text"  className='demoInput' placeholder='AMOUNT:' />
              </div>
              <button className='demoBtn m-3'>
                CREATE DEMO ACCOUNT
              </button>
            </div>


            </div>
          </div>

    </div>
  )
}