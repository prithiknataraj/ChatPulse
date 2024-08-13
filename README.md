# ChatPulse

ChatPulse is a real-time chat application built using the FARM stack (FastAPI, React, and MongoDB).

## Features

- *Real-time Messaging:* Instant messaging between clients with dynamic user authentication.
- *Private Chats:* One-on-one chat functionality where messages are sent and received by specific clients.
- *User Authentication:* Secure login with email verification, storing user information using MongoDB.

## Tech Stack

- *Frontend:* React.js
- *Backend:* FastAPI
- *Database:* MongoDB
- *Encryption:* Base64 encoding with UTF-8

## Project Structure

The project is structured as follows:

/src
/client
├── public/
├── src/
├── components/
├── pages/
├── App.js
├── index.js
├── package.json
/server
├── app/
├── main.py
├── requirements.txt
/tests
README.md

- */client:* Contains the React frontend code.
- */server:* Contains the FastAPI backend code.
- */tests:* Contains test cases for both frontend and backend.

## Installation

1. *Clone the repository:*

   ```bash
   git clone https://github.com/your-username/chatpulse.git
   cd chatpulse

2. *Install Required React Packages*
   ```bash
   cd client
   npm install
   npm install react-router-dom
   npm install framer-motion

4. *Install Required Python Packages*
   ```bash
   cd server
   pip install -r requirements.txt

6. *Run the application*
   ```bash
   cd client
   npm run dev

   cd server
   uvicorn main:app --reload
