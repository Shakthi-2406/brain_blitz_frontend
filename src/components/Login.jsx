import React, { useState } from "react";
import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    // if (username === "validUsername" && password === "validPassword") {
      localStorage.setItem("username", username);
      window.open("/Communicate");
    // } else {
    //   alert("Invalid username or password!");
    // }
  }

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
