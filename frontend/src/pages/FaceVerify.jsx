import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function FaceVerify() {
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");
  const [confidence, setConfidence] = useState("");
  const navigate = useNavigate();

  const handleVerify = async () => {
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
    setError(response.data.message); 
  }

} catch (err) {
  setError("Verification failed. Please try again.");
}
  }

  return (
    <div>
      <h2>Face Verification</h2>
      <p>Please upload a photo of your face to continue</p>
      <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} />
      <br />
      {error && <p style={{color:"red"}}>{error}</p>}
      <button onClick={handleVerify}>Verify Face</button>

        {confidence && (
        <p style={{ color: confidence > "50%" ? "green" : "red" }}>
          Match Confidence: {confidence}
        </p>
      )}
    </div>
  );
}

export default FaceVerify;