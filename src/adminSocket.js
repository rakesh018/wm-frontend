// socket.js
import io from 'socket.io-client';
import Base_Url from './config';

const adminToken = localStorage.getItem('adminToken');

const socket = io( `${Base_Url}/admin`, {
  auth: {
    adminToken: `Bearer ${adminToken}`,
  },
});

socket.on('connect', () => {
  console.log('Connected to socket by admin');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

export default socket;
