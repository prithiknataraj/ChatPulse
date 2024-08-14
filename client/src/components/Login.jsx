import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { API_BASE_URL } from '../config';

const LoginContainer = styled.div`
  background-color: #ffdd57; /* Yellow theme */
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled(motion.form)`
  background-color: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
`;

const Input = styled(motion.input)`
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #ffdd57;
  }
`;

const Button = styled(motion.button)`
  padding: 1rem;
  background-color: #ffdd57;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0c040;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 1rem;
  text-align: center;
`;

const Title = styled(motion.h2)`
  text-align: center;
  margin-bottom: 1rem;
  color: #333;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);

      const response = await axios.post(`${API_BASE_URL}/token`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("user_email", username); // Store the email

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
    <LoginContainer>
      <FormContainer
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        onSubmit={handleLogin}
      >
        <Title
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Login to ChatPulse
        </Title>
        <Input
          type="email"
          placeholder="Email ID"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete='email'
          required
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          autoComplete='password'
          onChange={(e) => setPassword(e.target.value)}
          required
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
        />

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <Button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Login
        </Button>
      </FormContainer>
    </LoginContainer>
  );
};

export default Login;