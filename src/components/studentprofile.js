import React, { useState,useEffect } from "react";
import DomainInfo from "./domaininfo";
import PersonalInfo from "./persnolinfo";
import Academic from "./academic";
import './studentprofile.css'
import bg from "../assets/bg1.jpg"
import Sidebar from "./sidebar";

export default function StudentProfile() {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    fullname: "",
    gender: "",
    contactno: "",
    rollno: "",
    branch: "",
    majors: "",
    passoutyear: "",
    cgpa: "",
    tenth: "",
    twelth: "",
   
  });
  const [resume, setResume] = useState(null); 
  const [profilepic, setProfilepic] = useState(null); 

  const PageDisplay = () => {
    if (page === 0) {
      return <PersonalInfo formData={formData} setFormData={setFormData}  profilepic={profilepic}
            setProfilepic={setProfilepic} />;
    } else if (page === 1) {
      return <DomainInfo formData={formData} setFormData={setFormData} />;
    } else {
      return <Academic formData={formData} setFormData={setFormData} resume={resume} setResume={setResume}/>;
    }
  };

  const FormTitles = ["Personal Info", "Domain Info", "Academics"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("Student_id", sessionStorage.getItem("studentid"));
    data.append("Student_name", formData.fullname);
    data.append("Student_gender", formData.gender);
    data.append("Student_contact", formData.contactno);
    data.append("Enrollment_no", formData.rollno);
    data.append("Branch", formData.branch);
    data.append("Majors", formData.majors);
    data.append("Passout_year", formData.passoutyear);
    data.append("Cgpa", formData.cgpa);
    data.append("Tenth_per", formData.tenth);
    data.append("Twelth_per", formData.twelth);
    data.append("Resume", resume);
    data.append("Photograph", profilepic);

    try {
        const response = await fetch(`https://localhost:44345/api/Hirehub/studentinfo`, {
            method: 'POST',
            body: data,
        });

        if (response.ok) {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const jsonData = await response.json();
                console.log('JSON Response:', jsonData);
            } else {
                console.log('Non-JSON Response:', response);
            }
        } else {
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }

    if (page === FormTitles.length - 1) {
        alert("FORM SUBMITTED");
        console.log(formData);
        console.log(resume);
        console.log(profilepic);
    } else {
        setPage((currPage) => currPage + 1);
    }
};


  useEffect(() => {
    console.log("Page Updated:", page);
  }, [page]);



  return (
    <>
<div className="profile" style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", height: "100vh"}}>
  <div><Sidebar/></div>
 <form onSubmit={handleSubmit} className="form">
      <div className="progressbar">
        <div
          style={{
            width: page === 0 ? "33.3%" : page === 1 ? "66.6%" : "100%"
          }}
        ></div>
      </div>
      <div className="form-container">
        <div className="header">
          <h1>{FormTitles[page]}</h1>
        </div>
        <div className="body">{PageDisplay()}</div>
        <div className="footer">
          <button style={{marginRight:"4vh"}}
            disabled={page === 0}
            onClick={() => {
              setPage((prevPage) => {
                console.log("After: Page =", prevPage );
                 return Math.max(0, prevPage - 1);
              });
            }}
          >
            Prev
          </button>
          <button type="submit">
            {page === FormTitles.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </form>
    </div>
    </>
  );
}
