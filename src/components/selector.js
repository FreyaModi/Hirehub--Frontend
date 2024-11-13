import React from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Selector() {
    let navigate = useNavigate();
    const handlePlacecellclick=()=>{
        navigate('/login');
    }
    const handleStudentclick=()=>{
        navigate('/studentlogin');
    }
  return (
    <div>
      <div
        className="selection"
        style={{
          backgroundColor: "#acc424",
          height: "730px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>What is your role?</h1>
        <br></br> <br></br>
        <div style={{ display: "flex", gap: "200px" }}>
          <div className="col-1">
            <FaUser style={{ height: "200px", width: "200px",cursor:"pointer" }} onClick={handleStudentclick}/>
            <p style={{marginLeft:"70px"}}>Student</p>
          </div>
          <div className="col-2">
            <FaUser style={{ height: "200px", width: "200px" ,cursor:"pointer" }} onClick={handlePlacecellclick} />
            <p style={{marginLeft:"50px"}}>Placement Cell</p>
          </div>
        </div>
      </div>
    </div>
  );
}
