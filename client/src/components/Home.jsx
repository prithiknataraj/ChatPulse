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

    const recipientEmail = prompt("Enter the email of the user you want to chat with:");
    setRecipientEmail(recipientEmail);

    const ws = new WebSocket(`ws://localhost:8000/ws/${yourEmail}`);

    ws.onopen = () => {
      console.log(`Connected as ${yourEmail}`);
    };

    ws.onmessage = (event) => {
      const encodedMessage = event.data;
      // console.log("Received encoded message:", encodedMessage);
      const decodedMessage = decodeMessage(encodedMessage);
      // console.log("Decoded message:", decodedMessage);
      setMessages((prevMessages) => [...prevMessages, decodedMessage]);
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
  }, []);

  const handleSend = () => {
    if (input.trim()) {
      const formattedMessage = `${yourEmail}: ${input}`;
      // console.log(`Sending message to ${recipientEmail}: ${input}`);
      
      setMessages((prevMessages) => [...prevMessages, formattedMessage]);

      sendMessage(`${recipientEmail}:${input}`);
      setInput('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">{msg}</div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
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
