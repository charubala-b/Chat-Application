import React, { useState } from 'react';
import io from 'socket.io-client';
import Chat from './Chat';
import './Em.css';

// Connect to the Socket.IO server
const socket = io.connect("http://localhost:3001");

const Em = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = async () => {
    if (username !== "" && room !== "") {
      // Emit event to join the room
      socket.emit("join_room", room);
      
      // Send request to save room data
      try {
        const response = await fetch('http://localhost:3001/add-Room', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ author: username, room: room }),
        });
        const result = await response.json();
        console.log('Room save result:', result);

        if (result.status === 'inserted successfully') {
          setShowChat(true);
        } else {
          console.error('Error saving room data:', result['error-occurrence']);
        }
      } catch (error) {
        console.error('Error saving room data:', error);
      }
    }
  };

  return (
    <div className='em-App'>
      {!showChat ? (
        <div className='em-joinChatContainer'>
          <h1>Join A Chat</h1>
          <input
            type='text'
            placeholder='John...'
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type='text'
            placeholder='RoomID..'
            onChange={(event) => setRoom(event.target.value)}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
};

export default Em;
