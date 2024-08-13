import React from 'react';
import { AdminSidebar } from '../AdminHome/AdminSidebar';
import { AdminNavbar } from '../AdminHome/AdminNavbar';
import './transactions.css';
import {Bar} from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { Chart,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  plugins,
  Legend,
  Title,
  Tooltip} from 'chart.js';

Chart.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Title,
  Tooltip
)
 



const labels= ['Jan 2024','Feb 2024','March 2024','April 2024','May 2024','June 2024','July 2024','August 2024','Sp 2024','Oct 2024','Nov 2024','Dec 2024'];

const options={
  plugins:{
    Legend:{
      position:'top',

     }

  }

}


const data ={
  labels,
  datasets : [
    {
      label:'Withdraw',
      data:[100,200,300,400,500,600,700,800,900,1000,600,300],
      backgroundColor:'black' 
    },{
      label:'Deposited',
      data:[300, 100,400,100,100,600,700,800,900,1000,400,800],
      backgroundColor:'yellow' 

    }

  ]
}


export const TransactionalAnalytics = () => {
  return (
    <div>
          <AdminNavbar/>
          <AdminSidebar/>
          <div className="container-fluid adminBox">
  <div className="row adminInnerBox">
    <div className="analysisDiv col m-2">
      <div>
        TOTAL MONEY WITHDRAWN/DEPOSITED IN 12
      </div>
      
        <Bar options={options} data={data}/>
      
    </div>
    <div className="analysisDiv col  m-2">
    <div>
        TOTAL MONEY WITHDRAWN/DEPOSITED IN 12
      </div>
      <Line options={options} data={data}/>
    </div>
  </div>
</div>
</div>
  )
}
