import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await API.post("accounts/login/", {
        username: username,
        password: password,
      });
      localStorage.setItem("token", response.data.access);
      navigate("/verify-face");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
     <div style={{ maxWidth: 600, margin: "0 auto", marginTop: 50, textAlign: "center" }}>
      <h2>Login</h2>
      <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} 
      style={{ width: "100%", padding: 8, marginBottom: 10 }}/>
      
      <br />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} 
      style={{ width: "100%", padding: 8, marginBottom: 10 }}/>
      <br />
      {error && <p style={{color:"red"}}>{error}</p>}
      <button onClick={handleLogin}>Login</button>
      <p>No account? <a href="/register">Register here</a></p>
    </div>
  );
}

export default Login;