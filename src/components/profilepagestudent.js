import React, { useState, useEffect } from "react"
import './profilepagestudent.css'
import Sidebar from "./sidebar";
import { Link, useNavigate } from "react-router-dom";

import Popup from 'reactjs-popup';


export default function Profilepagestudent() {
  const navigate = useNavigate();

  const [details, setDetails] = useState([]);
  


  useEffect(() => {

    fetch(`https://localhost:44345/api/Hirehub/studentprofile?id=${sessionStorage.getItem("studentid")}`)
      .then(response => response.json())
      .then(data => setDetails(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);



  

  return (
    <div className="pr-details">

      <div><Sidebar /></div>
      <div className="pr-main-content">
        {details.map((item) => (
          <div key={item.opp_id}>
           
            <div className="pr-oppheader">

              <div className="pr-name">
              <img src={`data:image/png;base64,${item.profile_pic}`} />
              </div>

            </div>
            <div className="pr-row">
              <div className="pr-col1">
                <p><b>Name: </b>{item.student_name} </p>
                <p><b>Email id: </b>{item.student_emailid} </p>
                <p><b>Gender: </b>{item.student_gender} </p>
                <p><b>Contact no: </b>{item.student_contact} </p>
                <p><b>Passout Year: </b>{item.passout_year} </p>
              </div>
              <div className="pr-col2">
                <div className="pr-col2-2">
                  <h3>Eligibilities</h3>
                  <p><b>Tenth percentage: </b>{item.tenth_per} </p>
                  <p><b>Twelth percentage: </b>{item.twelth_Per} </p>
                  <p><b>Cgpa: </b>{item.cgpa} </p>
                 
                  <p><b>Branch: </b>{item.branch} </p>
                  <p><b>Majors: </b>{item.majors} </p>
                
                </div>
              </div>
            </div>
          </div>
        ))}


       </div>
      
    </div>

  )
}


