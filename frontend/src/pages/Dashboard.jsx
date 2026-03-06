import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <center><h2>Dashboard</h2></center>
      <h3>Welcome Face verification sucess!!!</h3>

      <button onClick={() => navigate("/students")}>View All Students</button>
      <br /><br />

      <button onClick={() => navigate("/create")}>Create the student</button>
      <br /><br />

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;