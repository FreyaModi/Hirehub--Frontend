import React, { useState } from 'react';
import { FaTh, FaBars, FaUserAlt, FaRegChartBar, FaCommentAlt, FaShoppingBag, FaThList } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import logo2 from "../assets/logo2.png";
import './sidebar.css';
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const dashboardPath = sessionStorage.getItem("employeeid");
    const menuItem = [
        {
            path: dashboardPath ? "/empdashboard" : "/dashboard",
            name: "Dashboard",
            icon: <FaTh />
        },

        {
            path: "/status",
            name: "Student Status",
            icon: <FaRegChartBar />
        },

        {
            path: "/allopps",
            name: "All opportunities",
            icon: <FaThList />
        },
        {
            path: "/profile",
            name: "My profile",
            icon: <FaUserAlt />
        }
    ]

    const navigate = useNavigate();

    return (
        <div className="container">
            <div style={{ width: isOpen ? "230px" : "50px" }} className="sidebar">
                <div className="top_section">
                    <div style={{ display: isOpen ? "block" : "none" }} className="logo"><img style={{ height: "55px", width: "55px" }} src={logo2} /></div>
                    <div style={{ marginLeft: isOpen ? "50px" : "0px", cursor: "pointer" }} className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                {
                    menuItem.map((item, index) => (
                        <div key={index} onClick={() => navigate(item.path)} className="link" activeclassName="active">
                            <div className="icon">{item.icon}</div>
                            <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                        </div>
                    ))
                }
            </div>

        </div>
    );
};
