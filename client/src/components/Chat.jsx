import React, { useState, useEffect } from 'react';
import { sendMessage } from '../app';
import './Chat.css'; // Ensure you create and import a CSS file for styling

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/your-client-id");

    ws.onmessage = (event) => {
      const message = event.data;
      setMessages((prevMessages) => [...prevMessages, message]);
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
      sendMessage(input);
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

export default Chat;







// import React, { useState, useEffect } from 'react';
// import { sendMessage } from '../app';
// import './Chat.css'; // Ensure you create and import a CSS file for styling

// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');

//   useEffect(() => {
//     const ws = new WebSocket("ws://localhost:8000/ws/your-client-id");

//     ws.onmessage = (event) => {
//       const encryptedMessage = event.data.split(": ")[1];
//       console.log("Encrypted message received:", encryptedMessage);
//       try {
//         const bytes = CryptoJS.AES.decrypt(encryptedMessage, symmetricKey);
//         const originalMessage = bytes.toString(CryptoJS.enc.Utf8);
//         setMessages((prevMessages) => [...prevMessages, originalMessage]);
//       } catch (e) {
//         console.error("Error decrypting message:", e);
//       }
//     };

//     ws.onclose = () => {
//       console.log("Disconnected from the server");
//     };

//     return () => {
//       ws.close();
//     };
//   }, []);

//   const handleSend = () => {
//     if (input.trim()) {
//       sendMessage(input);
//       setInput('');
//     }
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-messages">
//         {messages.map((msg, index) => (
//           <div key={index} className="chat-message">{msg}</div>
//         ))}
//       </div>
//       <div className="chat-input">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type a message..."
//         />
//         <button onClick={handleSend}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default Chat;

