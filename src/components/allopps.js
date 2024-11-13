import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import './alopps.css';
import { Link, useNavigate } from "react-router-dom";
import City from './cities.json';

export default function AllOpportunities() {
   
    const [allOpp, setallOpp] = useState([]);
    const [id, setId] = useState(0);
    const [lpa, setLpa] = useState(0);
    const [skill, setSkill] = useState('')
    const [city, setCity] = useState('')
    const data = JSON.parse(JSON.stringify(City)).cityList

    const navigate = useNavigate();
    const handlebuttonclick = () => {
        navigate('/studentprofile')
    }
    useEffect(() => {

        fetch("https://localhost:44345/api/Hirehub/allopps")
            .then(response => response.json())
            .then(data => setallOpp(data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);
 



    return (
        <div className="dashboardall">
            <div><Sidebar /></div>
            <div className="navbar2">
                <div className="message2">Hello, Welcome to HireHub!</div>
              
            </div>
            <div className="full1">
            <div className="main2">



                <h2>All Opportunities</h2>
                {allOpp.map((item) => (
                    <div className="card2" key={item.Opp_id}
                    >
                        <div className="content2">
                            <div className="leftside2">
                                <div className="name2">
                                    {item.company_name}
                                </div>
                                <div className="salary2">
                                    <p>Package: {item.package} Lpa</p>
                                    <p>Stipend:Rs {item.stipend}</p>
                                </div>
                            </div>
                            <div className="rightside2">
                                <div className="buttonss2">
                                <button onClick={() => {
                                        const opportunityId = item.opp_id;
                                        console.log(opportunityId, '=opportunityId before navigation');
                                        sessionStorage.setItem("opportunity_id11", opportunityId);
                                        navigate('/opportunitydetails', { state: { opportunityId } });
                                    }}>Open</button>
                                </div>
                                <div className="deadline2">
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
            <div className="right-navbar2">
                <h3>Filters</h3>
                <h4>Location</h4>
                <div className="city1">
                    <select
                        className='select-city1'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    >
                        {data.map((cityOption) => (
                            <option key={cityOption.value} value={cityOption.value}>
                                {cityOption.label}
                            </option>
                        ))}
                    </select>  </div>
                <div className="inputs1">
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
                        onChange={(e) =>setSkill(e.target.value)}
                    />
                </div>
            </div>
            </div>
        </div>
    );
}
