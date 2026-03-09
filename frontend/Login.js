import React, { useState } from "react";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    });

    const data = await response.json();
    setMessage(data.message);
  };


    const handleForgotPassword = async () => {

    const response = await fetch("http://127.0.0.1:8000/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email
      })
    });

    const data = await response.json();
    alert(data.message);
    setShowForgot(false);
  };


  return (
    <div style={{textAlign:"center", marginTop:"100px"}}>
      <h2>Login Page</h2>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e)=>setUsername(e.target.value)}
        />
        <br/><br/>

        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />
        <br/><br/>

        <button type="submit">Login</button>
      </form>

      <p>{message}</p>

            {/* Forgot Password Button */}
      <p>
        <button onClick={() => setShowForgot(true)}>
          Forgot Password?
        </button>
      </p>

      {/* Forgot Password Form */}
      {showForgot && (
        <div>
          <h3>Reset Password</h3>

          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e)=>setEmail(e.target.value)}
          />

          <br/><br/>

          <button onClick={handleForgotPassword}>
            Submit
          </button>

          <button onClick={()=>setShowForgot(false)}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;