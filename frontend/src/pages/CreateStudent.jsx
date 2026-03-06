import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";


function CreateStudent(){

    const navigate = useNavigate();
    const[username , setUsername] = useState("");
    const[name , setName] = useState("");
    const[email , setEmail] = useState("");
    const[password , setPassword] = useState("");
    const[photo , setPhoto] = useState(null);
    const[sucess , setSucess] = useState("");
    const[error , setError] = useState("");
    const [mobile, setMobile] = useState("");
    const [age, setAge] = useState("");


    const handlecreate = async () => {
        const formdata = new FormData();
        formdata.append("username",username)
        formdata.append("name" ,name)
        formdata.append("email" ,email)
        formdata.append("mobile", mobile);
        formdata.append("age", age);
        formdata.append("password" ,password)
        formdata.append("profile_photo" ,photo)
       

        try{
           const response = await API.post("students/create/" , formdata)
           console.log(response.data); 
             if (response.data.status === true) {
                setSucess("Student created sucessfully");
            navigate("/students")
                }
            else {

                setError(response.data.message);
            }}catch(err){

            setError("creation failed");
          
        }

    };


 return(
    <>

    <h2>Create Student</h2>

    <input placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
    <br /><br />

    <input placeholder="name" onChange={(e) => setName(e.target.value)}/>
    <br /><br />

    <input placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
    <br /><br />

    <input placeholder="Mobile Number" onChange={(e) => setMobile(e.target.value)} />
    <br /><br />

     <input type="number" placeholder="Age" onChange={(e) => setAge(e.target.value)} />
    <br /><br />

     <input placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
    <br /><br />

 


    <label>Profile Photo:</label>
      <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} />
      <br /><br />

    <button onClick={handlecreate}>Create</button>
    <button onClick={() => navigate("/dashboard")}>Cancel</button>


    </>

    );

}
   

export default CreateStudent;

