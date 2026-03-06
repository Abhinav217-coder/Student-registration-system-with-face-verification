import { useState, useEffect } from "react";
import API from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";

function UpdateStudent(){

    const {id} = useParams();
     
    const navigate = useNavigate();
    const [name ,setName] = useState("");
    const[email , setEmail] = useState("");
    const[error , setError] = useState("");
    const[sucess , setSucess] = useState("");
    const [photo , setPhoto] = useState(null);
    const [mobile, setMobile] = useState("");
    const [age, setAge] = useState("");


useEffect(() => {
    const fetchStudent = async ()=> {
        try{

            const response = await API.get(`students/${id}/`);
            setName(response.data.data.name)
            setEmail(response.data.data.email)
            setMobile(response.data.data.mobile || "");
            setAge(response.data.data.age || "");
        }
        catch(err){
             
            setError("Failed to load student.");
        }

    };
    fetchStudent();
},[id]);


const Updatehandle = async ()=> {
    const formdata = new FormData();
    formdata.append("name" , name)
    formdata.append("email" , email)
    formdata.append("mobile", mobile);
    formdata.append("age", age);
    
    if (photo){
        formdata.append("profile_photo", photo);
    }
    try{
        const response = await API.put(`students/update/${id}/`,formdata)
        console.log(response.data)
        setSucess("updation is sucesss")
        navigate("/students")
    }
    catch(err){
      setError("Update failed.");
    }
    
}

    return(
        <>
        <h3>update the student</h3>
        <input placeholder="name" value={name} onChange={(e) => setName(e.target.value)}/>
         <br /><br />
        <input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
         <br /><br />

        <input placeholder="Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value)} />
            <br /><br />

        <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
            <br /><br />

         <label>Profile Photo (optional):</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setPhoto(e.target.files[0])}
      />

      <br /><br />

       <button onClick={Updatehandle}>Student Update</button>
      <br /><br />
      <button onClick={() => navigate("/students")}>Cancel</button>
        </>
    );
}
export default UpdateStudent;