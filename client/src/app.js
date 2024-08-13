const ws = new WebSocket("ws://localhost:8000/ws/your-client-id");

ws.onopen = () => {
    console.log("Connected to the server");
};

ws.onmessage = (event) => {
    const encodedMessage = event.data;
    // console.log("Received encoded message:", encodedMessage);
    const decodedMessage = decodeMessage(encodedMessage);
    // console.log("Decoded message:", decodedMessage);
};

ws.onclose = () => {
    console.log("Disconnected from the server");
};

function encodeMessage(message) {
    return btoa(unescape(encodeURIComponent(message)));
}

function decodeMessage(encodedMessage) {
    return decodeURIComponent(escape(atob(encodedMessage)));
}

function sendMessage(message) {
    const encodedMessage = encodeMessage(message);
    // console.log("Sending encoded message:", encodedMessage);
    ws.send(encodedMessage);
}

export { sendMessage };
