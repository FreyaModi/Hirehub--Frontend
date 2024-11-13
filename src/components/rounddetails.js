import React, { useState, useEffect } from "react"
import Sidebar from "./sidebar";
import './rounddetails.css'

export default function Rounddetails() {
  const [detail, setDetail] = useState([]);
  const [student, setStudent] = useState([]);

  useEffect(() => {

    fetch(`https://localhost:44345/api/Hirehub/processdetails?id=${sessionStorage.getItem("process_id")}`)
      .then(response => response.json())
      .then(data => setDetail(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);


  useEffect(() => {

    fetch(`https://localhost:44345/api/Hirehub/shortlistedstudents?id=${sessionStorage.getItem("process_id")}`)
      .then(response => response.json())
      .then(data => setStudent(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <div><Sidebar /></div>
      <div className="main-container">

        <div className="main-section">
          {detail.map((item) => (
            <div className="section1">
              <h1><b>Company name: </b>  {item.company_name}</h1>
              <br></br>
              <p><b>Round number: </b>{item.round_no}</p>
              <p><b>Process type: </b>{item.process_type}</p>
              <p><b>Process description: </b>{item.process_desc}</p>
              <p><b>Process venue: </b>{item.process_venue}</p>
              <p><b>Process time: </b> {item.process_time && (
                <p><b style={{ color: "#acc424" }}>Process time: </b> {new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                }).format(new Date(item.process_time))}</p>
              )}</p>
            </div>))}
          <div className="section2">
            <br></br>
            <br></br>
            <br></br>           <br></br>
            <br></br>
            <h2><b>Shortlisted Students: </b></h2>
            <ol>
  {student.map((item, index) => (
    <li style={{margin:"15px"}} key={index}>{item.student_name} - {item.enrollment_no}</li>
  ))}
</ol>


          </div>
        </div>
      </div>
    </div>
  );
}
