import React from "react"
import bgvid from "../assets/vid1.mp4"
import './login.css';
import logo from "../assets/logo.png"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';

import Popup from 'reactjs-popup';

export default function Forgotpwd() {
    const [Emailid, setEmailid] = useState('')
 

    let navigate = useNavigate();

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        sessionStorage.setItem("forgotpwd", Emailid);
    const formData = new FormData();
    formData.append('toEmail', Emailid);

    try {
        const response = await fetch(`https://localhost:44345/api/Hirehub/Send`, {
            method: 'POST',
            body: formData,
        });
        if (response.ok) {
         
            sessionStorage.setItem("forgotpwd", Emailid);
          console.log(sessionStorage.getItem("forgotpwd"))
        } 
        // Handle response...
    } catch (error) {
        console.error('Error:', error);
    }
    };
    const userOnchange = (e) => {
        if (e.target.name === "emailid") {
            setEmailid(e.target.value);
            console.log(e.target.value);
        }
    }
    
    return (
        <>
            <div className="login-container">
                <div className="login-main">
                    <video className='videoTag' autoPlay muted playsInline onEnded={(e) => e.target.pause()}>
                        <source src={bgvid} type='video/mp4' />
                    </video>
                </div>
                <div className="login-form" style={{height:"450px"}}>
                    <div className="logo-login">
                        <img src={logo}></img>
                    </div>
                    <div className="submit">
                        <form onSubmit={handleOnSubmit}>
                            <input type='text' name="emailid" placeholder='Email-id' onChange={userOnchange} />


                            <button className='btn' >Send Email</button>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}