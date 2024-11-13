import React from "react"
import './studentprofile.css'
export default function Personalinfo({ formData, setFormData,profilepic, setProfilepic  }) {

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setProfilepic(file); 

   
   
  };


  return (
    <div className="sub-profile">
      <p>Name:</p>
      <input type="text" value={formData.fullname}
        onChange={(e) => {
          setFormData({ ...formData, fullname: e.target.value });
        }}
        required
        aria-required="true"
      ></input>


      <p>Gender:</p>
      <select value={formData.gender}
        onChange={(e) => {
          setFormData({ ...formData, gender: e.target.value });
        }}  required
        aria-required="true">
        <option value="Male">Male</option>

        <option value="Female">Female</option>

        <option value="Other">Other</option>
        
      </select>


      <p>Profile photo:</p>
      <input type="file" value={formData.profilepic}
        onChange={handleFileChange} required
      aria-required="true"></input>


      <p>Contact number:</p>
      <input type="text" value={formData.contactno}
       onChange={(e) => {
        setFormData({ ...formData, contactno: e.target.value });
      }}  required
      aria-required="true"></input>
    </div>
  )
};

