import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function FaceVerify() {
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");
  const [confidence, setConfidence] = useState("");
  const [attempts, setAttempts] = useState(0);
  const MAX_ATTEMPTS = 3;
  const navigate = useNavigate();

  const handleVerify = async () => {

    if (attempts >= MAX_ATTEMPTS) return;

    if (!photo) {
      setError("Please select a photo first.");
      return;
    }

    const formData = new FormData();
    formData.append("photo", photo);

    try {
      const response = await API.post("face_verification/verify/", formData);

      setConfidence(response.data.confidence);

      if (response.data.status === true) {
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);

      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        if (newAttempts >= MAX_ATTEMPTS) {
          setError("3 attempts used! Please login again.");
        } else {
          setError(`Face does not match! Attempts left: ${MAX_ATTEMPTS - newAttempts}`);
        }
      }

    } catch (err) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setError(`Verification failed. Attempts left: ${MAX_ATTEMPTS - newAttempts}`);
    }
  };

  return (
    <div>
      <h2>Face Verification</h2>
      <p>Please upload a photo of your face to continue</p>

      <h2>Attempts used: {attempts} / {MAX_ATTEMPTS}</h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setPhoto(e.target.files[0])}
        disabled={attempts >= MAX_ATTEMPTS}
      />

      <br />

      {error && <p style={{ color: "red" }}>{error}</p>}

      {confidence && (
        <p style={{ color: parseFloat(confidence) > 50 ? "green" : "red" }}>
          Match Confidence: {confidence}
        </p>
      )}

      <button
        onClick={handleVerify}
        disabled={attempts >= MAX_ATTEMPTS}
        style={{
          backgroundColor: attempts >= MAX_ATTEMPTS ? "gray" : "#4f46e5",
          cursor: attempts >= MAX_ATTEMPTS ? "not-allowed" : "pointer"
        }}
      >
        {attempts >= MAX_ATTEMPTS ? "Blocked" : "Verify Face"}
      </button>

      {attempts >= MAX_ATTEMPTS && (
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
          style={{ backgroundColor: "#dc2626", marginTop: 10 }}
        >
          Login Again
        </button>
      )}

    </div>
  );
}

export default FaceVerify;