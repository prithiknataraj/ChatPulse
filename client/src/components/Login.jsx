import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/token`, {
                username,
                password
            });
            localStorage.setItem("access_token", response.data.access_token);
            navigate("/home");
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.detail || "There was an error logging in");
            } else {
                setErrorMessage("There was an error logging in.");
            }
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                type="email"
                placeholder='Email ID'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}

            <button type='submit'>Login</button>
        </form>
    );
}

export default Login;