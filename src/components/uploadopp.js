import React, { useState } from "react"
import "./uploadopp.css"
import logo from "../assets/logo.png";
import Sidebar from "./sidebar";

export default function UploadOpp() {

    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [link, setLink] = useState('');
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [jobtype, setType] = useState('');
    const [stipend, setStipend] = useState(0);
    const [pack, setPack] = useState(0);
    const [branch, setBranch] = useState('');
    const [majors, setMajors] = useState('');
    const [passyear, setPassyear] = useState('');
    const [process, setProcess] = useState('');
    const [cgpa, setCgpa] = useState(0);
    const [tenth, setTenth] = useState(0);
    const [twelth, setTwelth] = useState(0);
    const [deadline, setdeadline] = useState('');

    const years = Array.from({ length: 17 }, (_, index) => 2009 + index);
    //------------------------------------------------------------------------
    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const data = {
            "Placecell_id": sessionStorage.getItem("employeeid"),
            "Company_name": name,
            "Company_desc": desc,
            "Website_link": link,
            "Job_title": title,
            "Job_location": location,
            "Job_type": jobtype,
            "Stipend": stipend,
            "Package": pack,
            "Opp_branch": branch,
            "Opp_majors": majors,
            "Opp_passyear": passyear,
            "Process_desc": process,
            "Eligible_cgpa": cgpa,
            "Eligible_tenth": tenth,
            "Eligible_twelth": twelth,
            "Deadline": deadline,
            "SkillModels": skills,
            "RolesModel": role
        };

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        try {
            const response = await fetch(`https://localhost:44345/api/Hirehub/postopportunity`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            });

            if (response.ok) {
                console.log('Opportunity created!!');

            } else {
                const errorData = await response.json();
                console.error('Error:', response.status, response.statusText);
                console.error('Backend Error:', errorData.error);

            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    //---------------------------------------------------------------------------
    const handleOnChange = (e) => {
        if (e.target.name === "name") {
            setName(e.target.value)
        }
        if (e.target.name === "desc") {
            setDesc(e.target.value)
        }
        if (e.target.name === "link") {
            setLink(e.target.value)
        }
        if (e.target.name === "title") {
            setTitle(e.target.value)
        }
        if (e.target.name === "location") {
            setLocation(e.target.value)
        }
        if (e.target.name === "type") {
            setType(e.target.value)
        }
        if (e.target.name === "stipend") {
            setStipend(e.target.value)
        }
        if (e.target.name === "package") {
            setPack(e.target.value)
        }
        if (e.target.name === "branch") {
            setBranch(e.target.value)
        }
        if (e.target.name === "majors") {
            setMajors(e.target.value)
        }
        if (e.target.name === "passyear") {
            setPassyear(e.target.value)
        }
        if (e.target.name === "process") {
            setProcess(e.target.value)
        }
        if (e.target.name === "cgpa") {
            setCgpa(e.target.value)
        }
        if (e.target.name === "tenth") {
            setTenth(e.target.value)
        }
        if (e.target.name === "twelth") {
            setTwelth(e.target.value)
        }
        if (e.target.name === "deadline") {
            setdeadline(e.target.value)
        }
    }

    //------------------ADD MORE ROLES------------------------------------------------
    const [role, setRole] = useState([{ role_name: '' }]);
    const handleAdd = () => {
        const abc = [...role, { role_name: '' }]
        console.log(abc, "handle add")
        setRole(abc)
    }
    const handleChange = (onChangeValue, i) => {
        console.log(onChangeValue.target.value)
        const inputdata = [...role]
        inputdata[i].role_name = onChangeValue.target.value;

        setRole(inputdata)
    }
    const handleDelete = (i) => {
        const deletVal = [...role]
        deletVal.splice(i, 1)
        setRole(deletVal)
    }

    //---------------------------------------------------------------------------


    //------------------ADD MORE SKILLS------------------------------------------------
    const [skills, setSkills] = useState([{ skill_name: '' }]);

    const handleAddSkill = () => {
        const updatedSkills = [...skills, { skill_name: '' }];
        setSkills(updatedSkills);
    };

    const handleChangeSkill = (event, i) => {
        const updatedSkills = [...skills];
        updatedSkills[i].skill_name = event.target.value;
        setSkills(updatedSkills);
    };

    const handleDeleteSkill = (i) => {
        const updatedSkills = [...skills];
        updatedSkills.splice(i, 1);
        setSkills(updatedSkills);
    };

    //---------------------------------------------------------------------------

    return (
        <div>
            <div className="upload">
                <div><Sidebar/></div>
                <form className="upload-form" onSubmit={handleOnSubmit}>

                    <div className="opp-container">
                        <div className="opp-header">
                            <img src={logo}></img>
                        </div>
                        <div className="profile">
                            <p>Company Name:</p>
                            <input type="text" name="name"
                                onChange={
                                    handleOnChange
                                } required
                                aria-required="true"></input>


                            <p>Company description:</p>
                            <textarea type="text" rows="3" name="desc"
                                onChange={
                                    handleOnChange
                                } required
                                aria-required="true"></textarea>


                            <p>Website link:</p>
                            <input type="text" name="link" onChange={
                                handleOnChange
                            }
                                required
                                aria-required="true"></input>


                            <p>Job title:</p>
                            <input type="text" name="title"
                                onChange={
                                    handleOnChange
                                } required
                                aria-required="true"></input>
                            <div className="profile">


                                <p>Job location:</p>
                                <input type="text" name="location"
                                    onChange={
                                        handleOnChange
                                    } required
                                    aria-required="true"></input>


                                <p>Job type:</p>
                                <input type="text" name="type"
                                    onChange={
                                        handleOnChange
                                    } required
                                    aria-required="true"></input>


                                <p>Stipend:</p>
                                <input type="text" name="stipend" onChange={
                                    handleOnChange
                                }
                                    required
                                    aria-required="true"></input>


                                <p>Package in LPA:</p>
                                <input type="text" name="package"
                                    onChange={
                                        handleOnChange
                                    } required
                                    aria-required="true"></input>

                                <p>Branch:</p>
                                <input type="text" name="branch" onChange={
                                    handleOnChange
                                }
                                    required
                                    aria-required="true"></input>


                                <p>Majors:</p>
                                <input type="text" name="majors"
                                    onChange={
                                        handleOnChange
                                    } required
                                    aria-required="true"></input>
                                <div className="profile">


                                    <p>Passout year:</p>
                                    <select className="yearpicklist" name="passyear"
                                        onChange={
                                            handleOnChange
                                        }
                                        required
                                        aria-required="true">

                                        {years.map((year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>


                                    <p>Process Description:</p>
                                    <input type="text" name="process"
                                        onChange={
                                            handleOnChange
                                        } required
                                        aria-required="true"></input>


                                    <p>Eligible cgpa:</p>
                                    <input type="text" name="cgpa"
                                        onChange={
                                            handleOnChange
                                        }
                                        required
                                        aria-required="true"></input>


                                    <p>Eligible 10th percentage:</p>
                                    <input type="text" name="tenth"
                                        onChange={
                                            handleOnChange
                                        } required
                                        aria-required="true"></input>

                                    <p>Eligible 12th percentage:</p>
                                    <input type="text" name="twelth"
                                        onChange={
                                            handleOnChange
                                        } required
                                        aria-required="true"></input>

                                    <p>Roles offered:</p>
                                    <input type="text"
                                        value={skills[0].role_name}
                                        onChange={(e) => handleChange(e, 0)} required
                                        aria-required="true"></input>
                                    <button type="button" style={{ fontWeight: "800", marginLeft: "5px" }} className='btn' onClick={() => handleAdd()}>+</button>

                                    {role.slice(1).map((data, i) => (
                                        <div key={i} className='extras'>
                                            <input
                                                value={data.role_name}
                                                onChange={(e) => handleChange(e, i + 1)}
                                            />
                                            <button type="button" style={{ fontWeight: "800", marginLeft: "5px" }} className='btn' onClick={() => handleDelete(i)}>x</button>
                                        </div>
                                    )
                                    )}

                                    <p>Skills required:</p>
                                    <input type="text"
                                        value={skills[0].skill_name}
                                        onChange={(e) => handleChangeSkill(e, 0)} required
                                        aria-required="true"></input>
                                    <button type="button" className='btn+' style={{ fontWeight: "800", marginLeft: "5px" }} onClick={() => handleAddSkill()}>+</button>

                                    {skills.slice(1).map((data, i) => (
                                        <div key={i} className='extras'>
                                            <input
                                                value={data.skill_name}
                                                onChange={(e) => handleChangeSkill(e, i + 1)}
                                            />
                                            <button type="button" style={{ fontWeight: "800", marginLeft: "5px" }} onClick={() => handleDeleteSkill(i)}>x</button>
                                        </div>

                                    ))}


                                    <p>Application deadline:</p>
                                    <input type="datetime-local" name="deadline"
                                        onChange={
                                            handleOnChange
                                        } required
                                        aria-required="true"></input>

                                </div>
                                <div className="opp-footer">

                                    <button type="submit" className="btn-emp" style={{ width: "100px", height: "40px", marginLeft: "6vh" }}>
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
