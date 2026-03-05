import { useState, useEffect } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await API.get("students/list/");
        setStudents(response.data.data);
      } catch (err) {
        setError("Failed to load students.");
      }
    };
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await API.delete(`students/${id}/delete/`);
        setStudents(students.filter(student => student.id !== id));
      } catch (err) {
        setError("Failed to delete student.");
      }
    }
};

  return (
    <div>
      <h2>All Students</h2>
      {error && <p style={{color:"red"}}>{error}</p>}
      {students.map((student) => (
        <div key={student.id} style={{borderBottom:"1px solid #ddd", marginBottom:10}}>

          <img 
      src={`http://127.0.0.1:8000${student.profile_photo}`} 
      alt={student.name}
      style={{width:60, height:60, borderRadius:"50%", objectFit:"cover"}}
    />


           <div>
      <p>Name: {student.name}</p>
      <p>Email: {student.email}</p>
      <button onClick={() => navigate(`/update-student/${student.id}`)}>Update</button>
      <button onClick={() => handleDelete(student.id)}
    style={{ padding: "6px 12px", marginTop: 8, width: "100%", background: "red" }}>Delete</button>
       <button onClick={() => navigate("/dashboard") }>Cancel</button>
    </div>
        </div>
      ))}
    </div>
  );
}

export default StudentList;