// socket.js
import io from 'socket.io-client';

const adminToken = localStorage.getItem('adminToken');

const socket = io('https://server.trademax1.com/admin', {
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
