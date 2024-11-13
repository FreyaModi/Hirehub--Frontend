import React from "react"
import './studentprofile.css'
export default function Academic({ formData, setFormData,resume,setResume }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setResume(file); // Update the resume file state

   
  };
  return (
    <div className="sub-profile">
      <p>CGPA(out of 4):</p>
      <input type="text" value={formData.cgpa}
        onChange={(e) => {
          setFormData({ ...formData, cgpa: e.target.value });
        }}
        required
        aria-required="true"></input>


      <p>1Oth percentage:</p>
      <input type="text" value={formData.tenth}
        onChange={(e) => {
          setFormData({ ...formData, tenth: e.target.value });
        }}
        required
        aria-required="true"></input>

      <p>12th percentage:</p>
      <input type="text" value={formData.twelth}
        onChange={(e) => {
          setFormData({ ...formData, twelth: e.target.value });
        }} required
        aria-required="true"></input>

      <p>Resume:</p>
      <input type="file" value={formData.resume}
        onChange={handleFileChange} required
        aria-required="true"></input>
    </div>
  )
};

