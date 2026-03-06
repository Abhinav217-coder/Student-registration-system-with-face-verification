import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState("");
  
  const navigate = useNavigate();

  const handleRegister = async () => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("age", age);
    formData.append("password", password);
    formData.append("profile_photo", photo);

    try {
      await API.post("accounts/register/", formData);
      setSuccess("Registered successfully! Please login.");
      navigate("/");
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <br />
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <br />
      <input type="value" placeholder="mobile" onChange={(e) => setMobile(e.target.value)} />
      <br />
      <input type="number" placeholder="age" onChange={(e) => setAge(e.target.value)} />
      <br />
      <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
      <br />
      <label>Profile Photo:</label>
      <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} />
      <br />
      <button onClick={handleRegister}>Register</button>
      <p>Already have account? <a href="/">Login here</a></p>
    </div>
  );
}

export default Register;