import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [first_name, setfirst_name] = useState('');
  const [last_name, setlast_name] = useState('');
  const [email, setEmail] = useState('');
  const [age, setage] = useState('');
  const [gender, setgender] = useState('');
  const [password, setPassword] = useState('');
  const [language, setlanguage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/signup/', {  // Ensure trailing slash matches backend
        first_name,
        last_name,
        email,
        age: parseInt(age),  // Convert to number if needed
        gender,
        password,
        language,
      });
      alert(response.data.message); // Display success message from backend
    } catch (error) {
      console.error("Sign-up error:", error.response ? error.response.data : error.message);
      alert("There was an error signing up. Please try again.");
    }
  };
  
  return (
    <form onSubmit={handleSignUp}>
      <input
        type="text"
        placeholder="First Name"
        value={first_name}
        onChange={(e) => setfirst_name(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Last Name"
        value={last_name}
        onChange={(e) => setlast_name(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="int"
        placeholder="Age"
        value={age}
        onChange={(e) => setage(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Gender"
        value={gender}
        onChange={(e) => setgender(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Language"
        value={language}
        onChange={(e) => setlanguage(e.target.value)}
        required
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
