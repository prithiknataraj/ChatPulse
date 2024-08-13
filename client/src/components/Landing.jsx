import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LandingPageContainer = styled.div`
  background-color: #ffdd57; /* Yellow theme */
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #333;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const Description = styled(motion.p)`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled(motion.button)`
  padding: 0.75rem 2rem;
  font-size: 1rem;
  border: none;
  border-radius: 25px;
  background-color: #fff;
  color: #ffdd57;
  cursor: pointer;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #f0c040;
    color: #fff;
  }
`;

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <LandingPageContainer>
      <Title
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to ChatPulse
      </Title>
      <Description
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Connect with friends and family in an instant!
      </Description>
      <ButtonContainer>
        <Button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/login')}
        >
          Login
        </Button>
        <Button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </Button>
      </ButtonContainer>
    </LandingPageContainer>
  );
};

export default LandingPage;
