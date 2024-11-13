import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import bg2 from "../assets/processbg.jpg"

export default function EmployeeProfile() {
 
    const [fullname, setFullname] = useState(null);
    const [designation, setDesignation] = useState(null);
    const [contactno, setContactno] = useState(null);
    const [profilepic, setProfilepic] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        setProfilepic(file);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("Placecell_id", sessionStorage.getItem("employeeid"));
        data.append("Employee_name", fullname);
        data.append("Employee_designation", designation);
        data.append("Employee_contact", contactno);
        data.append("Employee_photo", profilepic);

        try {
            const response = await fetch(`https://localhost:44345/api/Hirehub/employeeinfo`, {
                method: 'POST',
                body: data,
            });

            if (response.ok) {
                // Check if the response is JSON
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const jsonData = await response.json();
                    console.log('JSON Response:', jsonData);
                } else {
                    // Handle non-JSON responses (e.g., file uploads)
                    console.log('Non-JSON Response:', response);
                }
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
        alert("FORM SUBMITTED");
        console.log(fullname,designation,contactno,profilepic);

    };


    return (
        <>

            <div className="profile" style={{ backgroundImage: `url(${bg2})`, backgroundSize: "cover", height: "730px" }}>
            <div><Sidebar /></div>
                <form onSubmit={handleSubmit} className="form">
                 
                    <div className="form-container">
                        <div className="header">
                            <h1>Placement Cell</h1>
                        </div>
                        <div className="sub-profile">
                            <p>Name:</p>
                            <input type="text" 
                                onChange={(e) => {
                                    setFullname(e.target.value );
                                }} required
                                aria-required="true"></input>


                            <p>Designation:</p>
                            <input type="text" 
                                onChange={(e) => {
                                    setDesignation(e.target.value );
                                }} required
                                aria-required="true"></input>


                            <p>Profile photo:</p>
                            <input type="file"
                                onChange={handleFileChange} required
                                aria-required="true"></input>


                            <p>Contact number:</p>
                            <input type="text" 
                                onChange={(e) => {
                                    setContactno(e.target.value );
                                }} required
                                aria-required="true"></input>

                        </div>
                        <div className="footer">

                            <button type="submit" className="btn-emp" style={{ width: "100px", height: "40px", marginLeft: "6vh" }}>
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
