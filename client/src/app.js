const ws = new WebSocket("ws://localhost:8000/ws/your-client-id");

ws.onopen = () => {
    console.log("Connected to the server");
};

ws.onmessage = (event) => {
    const message = event.data;
    console.log("Received:", message);
    // Update your chat UI with the received message
};

ws.onclose = () => {
    console.log("Disconnected from the server");
};

function sendMessage(message) {
    ws.send(message);
}

export { sendMessage };







// import CryptoJS from 'crypto-js';

// // Replace this with the symmetric key printed in the server logs
// const symmetricKey = 'uFoSUlZlk59MFSrVqr4j_M7ZrO7C0CaLevGif03o5-g=';

// const ws = new WebSocket("ws://localhost:8000/ws/your-client-id");

// ws.onopen = () => {
//     console.log("Connected to the server");
// };

// ws.onmessage = (event) => {
//     const encryptedMessage = event.data.split(": ")[1];
//     console.log("Encrypted message received:", encryptedMessage);
//     try {
//         const bytes = CryptoJS.AES.decrypt(encryptedMessage, symmetricKey);
//         const originalMessage = bytes.toString(CryptoJS.enc.Utf8);
//         console.log("Decrypted message:", originalMessage);
//         // Update your chat UI with the received message
//     } catch (e) {
//         console.error("Error decrypting message:", e);
//     }
// };

// ws.onclose = () => {
//     console.log("Disconnected from the server");
// };

// function sendMessage(message) {
//     const encryptedMessage = CryptoJS.AES.encrypt(message, symmetricKey).toString();
//     const base64EncodedMessage = btoa(encryptedMessage);
//     ws.send(base64EncodedMessage);
// }

// export { sendMessage };

