import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import './dashboard.css';
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import City from './cities.json';

export default function Dashboard() {
    const [opp1, setOpp1] = useState([]);
    const [opp, setOpp] = useState([]);
    const [city, setCity] = useState('')
    const [id, setId] = useState(0);
    const [skill, setSkill] = useState('')
    const [lpa, setLpa] = useState(0);
    const navigate = useNavigate();
    const data = JSON.parse(JSON.stringify(City)).cityList

    const handlebuttonclick = () => {
        navigate('/studentprofile')
    }
    const handleinsubmit = async (e) => {
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
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://localhost:44345/api/Hirehub/upcoming?location=${city}&package=${lpa}&skillname=${skill}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setOpp(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [city, lpa, skill]);

    /////////////////////////////////////////
    useEffect(() => {
        const fetchData2 = async () => {
            try {
                const response = await fetch(`https://localhost:44345/api/Hirehub/ongoing?location=${city}&package=${lpa}&skillname=${skill}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setOpp1(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData2();
    }, [city, lpa, skill]);




    return (
        <div className="dashboard">
            <div><Sidebar /></div>
            <div className="navbar">
                <div className="message">Hello, Welcome to HireHub!</div>
                <div className="button">
                    <button onClick={handlebuttonclick}>
                        Complete your profile
                    </button>
                </div>
            </div>
            <div className="full">
                <div className="main">



                    <h2>Ongoing Opportunities</h2>
                    {opp1.map((item) => (
                        <div className="card" key={item.opp_id} >
                            <div className="content">
                                <div className="leftside">
                                    <div className="name">
                                        {item.company_name}
                                    </div>
                                    <div className="salary">
                                        <p>Package: {item.package} Lpa</p>
                                        <p>Stipend: Rs {item.stipend}</p>
                                    </div>
                                </div>
                                <div className="rightside">
                                    <div className="buttons">
                                        <button onClick={() => {
                                            const opportunityId = item.opp_id;
                                            console.log(opportunityId, '=opportunityId before navigation');
                                            sessionStorage.setItem("opportunity_id11", opportunityId);
                                            navigate('/opportunitydetails', { state: { opportunityId } });
                                        }}>Open</button>
                                    </div>
                                    <div className="deadline">
                                        {item.deadline && (
                                            <p>Deadline: {new Intl.DateTimeFormat('en-US', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                second: '2-digit'
                                            }).format(new Date(item.deadline))}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}




                    <h2>Upcoming Opportunities</h2>
                    {opp.map((item) => (
                        <div className="card" >
                            <div className="content">
                                <div className="leftside">
                                    <div className="name">
                                        {item.company_name}
                                    </div>
                                    <div className="salary">
                                        <p>Package: {item.package} Lpa</p>
                                        <p>Stipend: {item.stipend}</p>
                                    </div>
                                </div>
                                <div className="rightside">
                                    <div className="buttons">
                                        
                                        <button onClick={() => {
                                            const opportunityId = item.opp_id;
                                            console.log(opportunityId, '=opportunityId before navigation');
                                            sessionStorage.setItem("opportunity_id11", opportunityId);
                                            navigate('/opportunitydetails', { state: { opportunityId } });
                                        }}>Open</button>
                                        <div className="apply">
                                            {/* <button onClick={handleinsubmit}>Apply</button> */}
                                        </div>
                                    </div>
                                    <div className="deadline">
                                        {item.deadline && (
                                            <p>Deadline: {new Intl.DateTimeFormat('en-US', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                second: '2-digit'
                                            }).format(new Date(item.deadline))}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="right-navbar1">
                    <h3>Filters</h3>
                    <h4>Location</h4>
                    <div className="city">
                        <select
                            className='select-city'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        >
                            {data.map((cityOption) => (
                                <option key={cityOption.value} value={cityOption.value}>
                                    {cityOption.label}
                                </option>
                            ))}
                        </select>  </div>
                    <div className="inputs">
                        <h4>Minimum package(LPA)</h4>
                        <input
                            type="text"
                            className="text-input"
                            placeholder="(eg: 5)"
                            onChange={(e) => setLpa(e.target.value)}
                        />

                        <h4>Skills</h4>
                        <input
                            type="text"
                            className="text-input"
                            placeholder="Enter skill"
                            onChange={(e) => setSkill(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
