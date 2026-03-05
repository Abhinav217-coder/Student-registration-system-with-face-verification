import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import FaceVerify from "./pages/FaceVerify";
import Dashboard from "./pages/Dashboard";
import StudentList from "./pages/StudentList";
import PrivateRoute from "./components/PrivateRoute";
import CreateStudent from "./pages/CreateStudent";
import UpdateStudent from "./pages/UpdateStudent";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

            <Route path="/verify-face" element={
        <PrivateRoute><FaceVerify /></PrivateRoute>
      } />
        <Route path="/dashboard" element={
          <PrivateRoute><Dashboard /></PrivateRoute>
        } />
        <Route path="/students" element={
          <PrivateRoute><StudentList /></PrivateRoute>
        } />
        
        <Route path="/create" element={
          <PrivateRoute><CreateStudent/></PrivateRoute>
        } />

         <Route path="/update-student/:id" element={
          <PrivateRoute><UpdateStudent/></PrivateRoute>
        } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;