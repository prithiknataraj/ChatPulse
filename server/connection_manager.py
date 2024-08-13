import base64
from typing import List, Dict
from fastapi import WebSocket

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, email: str):
        await websocket.accept()
        if email not in self.active_connections:
            self.active_connections[email] = []
        self.active_connections[email].append(websocket)

    def disconnect(self, websocket: WebSocket, email: str):
        if email in self.active_connections:
            self.active_connections[email].remove(websocket)
            if not self.active_connections[email]:  # Clean up if empty
                del self.active_connections[email]

    async def send_private_message(self, message: str, email: str):
        encoded_message = base64.b64encode(message.encode()).decode()
        connections = self.active_connections.get(email, [])
        for connection in connections:
            await connection.send_text(encoded_message)


