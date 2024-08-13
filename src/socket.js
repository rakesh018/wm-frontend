// socket.js
import io from 'socket.io-client';

const token = localStorage.getItem('token');

const socket = io('https://server.trademax1.com/user', {
  auth: {
    token: `Bearer ${token}`,
  },
});

socket.on('connect', () => {
  console.log('Connected to socket server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

export default socket;
