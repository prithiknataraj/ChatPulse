import React, { useState, useEffect } from 'react';
import { sendMessage } from '../app';
import './Home.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [yourEmail, setYourEmail] = useState('');

  useEffect(() => {
    const yourEmail = localStorage.getItem("user_email");
    setYourEmail(yourEmail);

    if (!recipientEmail) {
      const email = prompt("Enter the email of the user you want to chat with:");
      setRecipientEmail(email);
    }

    const ws = new WebSocket(`ws://localhost:8000/ws/${yourEmail}`);

    ws.onopen = () => {
      console.log(`Connected as ${yourEmail}`);
    };

    ws.onmessage = (event) => {
      const encodedMessage = event.data;
      const decodedMessage = decodeMessage(encodedMessage);

      // Assuming received messages are from the recipient
      setMessages((prevMessages) => [
        ...prevMessages, 
        { text: decodedMessage, sender: 'received' }
      ]);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("Disconnected from the server");
    };

    return () => {
      ws.close();
    };
  }, [yourEmail, recipientEmail]);

  const handleSend = () => {
    if (input.trim()) {
      // Add the sent message to the chat log
      setMessages((prevMessages) => [
        ...prevMessages, 
        { text: input, sender: 'sent' }
      ]);

      // Send the message to the server
      sendMessage(`${recipientEmail}:${input}`);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`chat-message ${msg.sender === 'sent' ? 'sent-message' : 'received-message'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}  // Handle Enter key press
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

function encodeMessage(message) {
  return btoa(unescape(encodeURIComponent(message)));
}

function decodeMessage(encodedMessage) {
  return decodeURIComponent(escape(atob(encodedMessage)));
}

export default Chat;






