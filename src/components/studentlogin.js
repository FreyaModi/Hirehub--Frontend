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

export default function Studentlogin() {
    const [Emailid, setEmailid] = useState('')
    const [Password, setPassword] = useState('')
    const [show, setShow] = useState('password');
    const [icon, setIcon] = useState(eyeOff);

    let navigate = useNavigate();

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const data = {
            "Emailid": Emailid,
            "Password": Password
        };

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        try {
            const response = await fetch(`https://localhost:44345/api/Hirehub/login`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('User successfully loged in');
                const studentid = await response.json();
                sessionStorage.setItem("studentid", studentid);
                navigate('/dashboard');
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

    const userOnchange = (e) => {

        if (e.target.name === "emailid") {

            setEmailid(e.target.value)
            console.log(Emailid, 'emailid')

        }
        if (e.target.name === "Password") {
            setPassword(e.target.value)
            console.log(Password, 'Password')
        }

    }


    const handleToggle = () => {
        if (show === 'password') {
            setIcon(eye);
            setShow('text');
        } else {
            setIcon(eyeOff);
            setShow('password');
        }
    };
    return (
        <>
            <div className="login-container">
                <div className="login-main">
                    <video className='videoTag' autoPlay muted playsInline onEnded={(e) => e.target.pause()}>
                        <source src={bgvid} type='video/mp4' />
                    </video>
                </div>
                <div className="login-form">
                    <div className="logo-login">
                        <img src={logo}></img>
                    </div>
                    <div className="submit">
                        <form onSubmit={handleOnSubmit}>
                            <input type='text' name="emailid" placeholder='Email-id' onChange={userOnchange} />


                            <div className="password-input" style={{  color: "white" }}>
                                <input type={show} name="Password" placeholder='Password' onChange={userOnchange} />
                                <span className="eye-icon" onClick={handleToggle} style={{ marginLeft: "-30px", color: "white" }}>
                                    <Icon icon={icon} size={20} />
                                </span>
                            </div>
                            <button className='btn' >Log in</button>

                            <p >
                                New user?<Link className="this-link" to='/signup' >Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}