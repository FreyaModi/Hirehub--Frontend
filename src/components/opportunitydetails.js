import React, { useState, useEffect } from "react"
import './opportunitydetails.css'
import Sidebar from "./sidebar";
import { Link, useNavigate } from "react-router-dom";

import Popup from 'reactjs-popup';


export default function OpportunityDetails() {
  const navigate = useNavigate();
  const [student, setStudent] = useState([]);
  const [details, setDetails] = useState([]);
  const [skills, setSkills] = useState([]);
  const [roles, setRoles] = useState([]);
  const [map, setMap] = useState([]);
  const [round, setRound] = useState(0);
  const [processtype, setProcessType] = useState('');
  const [processdesc, setProcessDesc] = useState('');
  const [processvenue, setprocessVenue] = useState('');
  const [processtime, setprocessTime] = useState('');
  const [textareaValues, setTextareaValues] = useState([{ student_name: '' }]);
  const dashboardPath = sessionStorage.getItem("employeeid");
  const handleOnChange = (e) => {
    if (e.target.name === "round") {
      setRound(e.target.value)
    }
    if (e.target.name === "type") {
      setProcessType(e.target.value)
    }
    if (e.target.name === "desc") {
      setProcessDesc(e.target.value)
    }
    if (e.target.name === "venue") {
      setprocessVenue(e.target.value)
    }
    if (e.target.name === "time") {
      setprocessTime(e.target.value)
    }
    if (e.target.name === "students") {
      //  setType(e.target.value)
    }
  }

  useEffect(() => {

    fetch(`https://localhost:44345/api/Hirehub/appliedstudents?id=${sessionStorage.getItem("opportunity_id11")}`)
      .then(response => response.json())
      .then(data => setStudent(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);
  const handleonsubmit = async (e) => {
    e.preventDefault();

    const data = {
      "Student_id": sessionStorage.getItem("studentid"),
      "Opportunity_id": sessionStorage.getItem("opportunity_id11")
    };

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(`https://localhost:44345/api/Hirehub/apply`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Posted application');


      } else {
        const errorData = await response.json();
        console.error('Error:', response.status, response.statusText);
        console.error('Backend Error:', errorData.error);
        alert(errorData.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  /////////////////////////////// MAP ROUNDS/////////////////////////////////////////////////////////////////////////
  useEffect(() => {

    fetch(`https://localhost:44345/api/Hirehub/rounds?id=${sessionStorage.getItem("opportunity_id11")}`)
      .then(response => response.json())
      .then(data => setMap(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);


  /////////////////////////////////////////////////////////////////////////////////////////////////////


  useEffect(() => {

    fetch(`https://localhost:44345/api/Hirehub/oppdetails?id=${sessionStorage.getItem("opportunity_id11")}`)
      .then(response => response.json())
      .then(data => setDetails(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);
  useEffect(() => {

    fetch(`https://localhost:44345/api/Hirehub/skills?id=${sessionStorage.getItem("opportunity_id11")}`)
      .then(response => response.json())
      .then(data => setSkills(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);
  useEffect(() => {

    fetch(`https://localhost:44345/api/Hirehub/roles?id=${sessionStorage.getItem("opportunity_id11")}`)
      .then(response => response.json())
      .then(data => setRoles(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const data = {
      "Opportunity_id": sessionStorage.getItem("opportunity_id11"),
      "Process_type": processtype,
      "Process_desc": processdesc,
      "Process_time": processtime,
      "Process_venue": processvenue,
      "Round_no": round,
      "StudentNameModel": transformedData
    };

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(`https://localhost:44345/api/Hirehub/postprocess`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      });

      if (response.ok) {

        const employeeid = await response.json();

      } else {
        const errorData = await response.json();
        console.error('Error:', response.status, response.statusText);
        console.error('Backend Error:', errorData.error);
        alert(errorData.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handlestudentChange = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
    const valuesArray = event.target.value.split('\n').map(value => ({ student_name: value.trim() })).filter(obj => obj.student_name !== '');

    // Update the state with the new array of objects
    setTextareaValues(valuesArray);
  };
  const transformedData = textareaValues.map(studentName => ({ student_name: studentName }));

  return (
    <div className="details">

      <div><Sidebar /></div>
      <div className="main-content">
        {details.map((item) => (
          <div key={item.opp_id}>
            <div className="website">
              <a href={item.website_link} target="_blank" rel="noopener noreferrer">
                {item.website_link}
              </a>
            </div>
            <div className="oppheader">

              <div className="name">
                <p>{item.company_name}</p>
              </div>

              <div className="desc">
                <p>{item.company_desc}</p>
              </div>
            </div>
            <div className="row">
              <div className="col1">
                <p><b>Job tiltle: </b>{item.job_title} </p>
                <p><b>Job type: </b>{item.job_type} </p>
                <p><b>Job location: </b>{item.job_location} </p>
                <div className="role">
                  <p><b>Roles offered: </b>   {roles.map((role) => (
                    <li key={role.id}>{role.role_name}</li>
                  ))}</p>
                </div>
                <div className="money">
                  <p><b>Stipend: </b>Rs {item.stipend} </p>
                  <p><b>Package:</b>{item.package} Lpa</p>
                </div>
                <p><b>Deadline: </b> {item.deadline && (
                  <p>Deadline: {new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  }).format(new Date(item.deadline))}</p>
                )}</p>
              </div>
              <div className="col2">
                <div className="col2-2">
                  <h3>Eligibilities</h3>
                  <p><b>Tenth percentage: </b>{item.eligible_tenth} </p>
                  <p><b>Twelth percentage: </b>{item.eligible_twelth} </p>
                  <p><b>Cgpa: </b>{item.eligible_cgpa} </p>
                  <p><b>Passout Year: </b>{item.opp_passyear} </p>
                  <p><b>Branch: </b>{item.opp_branch} </p>
                  <p><b>Majors: </b>{item.opp_majors} </p>
                  <div className="skills">
                    <p><b>Skills required: </b>  {skills.map((skill) => (
                      <li key={skill.id}>{skill.skill_name}</li>
                    ))}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}


        <div className="right-navbar">
          {sessionStorage.getItem("employeeid") !== null && (
            <Popup
              trigger={<button className="custom-button">Post rounds</button>}
              modal
              nested
              closeOnDocumentClick
              overlayStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent background
                backdropFilter: 'blur(5px)', // Apply blur effect
              }}
            >
              {/* Modal content */}
              {close => (
                <div className='modal'>
                  <div className='content'>
                    <form onSubmit={handleOnSubmit}>
                      <h3>Round details</h3>
                      <p>Round no:</p>
                      <input type="text" name="round"
                        onChange={handleOnChange}
                        required
                        aria-required="true"
                      />
                      <p>Process type:</p>
                      <input type="text" name="type"
                        onChange={handleOnChange}
                        required
                        aria-required="true"
                      />
                      <p>Process description:</p>
                      <textarea type="text" name="desc"
                        onChange={handleOnChange}
                        required
                        aria-required="true"
                      ></textarea>
                      <p>Process venue:</p>
                      <input type="text" name="venue"
                        onChange={handleOnChange}
                        required
                        aria-required="true"
                      />
                      <p>Process time:</p>
                      <input type="datetime-local" name="time"
                        onChange={handleOnChange}
                        required
                        aria-required="true"
                      />
                      <p>Shortlisted Students:</p>
                      <textarea type="text" name="desc"
                        onChange={handlestudentChange}
                        required
                        aria-required="true"
                      ></textarea>
                      <div className="btns">
                        <button>Submit</button>
                        <button onClick={close}>Close</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </Popup>
          )}
          <div className="rounds-map">
            {map.map((item) => (
              <div className="card3" key={item.process_id} onClick={() => {
                const processId = item.process_id;
                //console.log(opportunityId, '=opportunityId before navigation');
                sessionStorage.setItem("process_id", processId);
                navigate('/rounddetails', { state: { processId } });
              }}>

                <p> Round {item.round_no} </p>


              </div>
            ))}
          </div>
        </div>
      </div>
      {dashboardPath ? (
  <div className="section2">
  
    <h2 style={{marginTop:"-160px"}}><b>Applied Students:</b></h2>
    <ol>
      {student.map((item, index) => (
        <li style={{ margin: "15px" }} key={index}>
          {item.student_name} - {item.enrollment_no}
        </li>
      ))}
    </ol>
  </div>
) : (
  <div className="apply">
    <button onClick={handleonsubmit}>Apply</button>
  </div>
)}

   
    </div>

  )
}


