import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome! Face verification sucess!!!</p>

      <button onClick={() => navigate("/students")}>View All Students</button>
      <br /><br />

      <button onClick={() => navigate("/create")}>Create the student</button>
      <br /><br />

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;