// socket.js
import io from 'socket.io-client';
import Base_Url from './config';

const token = localStorage.getItem('token');

const socket = io( `${Base_Url}/user`, {
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
