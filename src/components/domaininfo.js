import React from "react"
import './studentprofile.css'
export default function DomainInfo({ formData, setFormData }) {

  const years = Array.from({ length: 17 }, (_, index) => 2009 + index);

  return (
    <div className="sub-profile">
      <p>Enrollment number:</p>
      <input type="text" value={formData.rollno}
        onChange={(e) => {
          setFormData({ ...formData, rollno: e.target.value });
        }}
        required
        aria-required="true"
      ></input>

      <p>Branch:</p>
      <input type="text" value={formData.branch}
        onChange={(e) => {
          setFormData({ ...formData, branch: e.target.value });
        }}
        required
        aria-required="true"></input>

      <p>Majors:</p>
      <input type="text" value={formData.majors}
        onChange={(e) => {
          setFormData({ ...formData, majors: e.target.value });
        }}
        required
        aria-required="true"></input>

        <p>Passout Year:</p>
      <select id="yearDropdown" value={formData.passoutyear}
        onChange={(e) => {
          setFormData({ ...formData, passoutyear: e.target.value });
        }}
        required
        aria-required="true">
      
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  )
};

