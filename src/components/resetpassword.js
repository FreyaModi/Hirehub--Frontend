import React, { useState } from "react";
import bgvid from "../assets/vid1.mp4";
import './signup.css';
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';

export default function Resetpassword() {

    const [Emailid, setEmailid] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [show, setShow] = useState('password');
  
    const [icon, setIcon] = useState(eyeOff);
    const navigate = useNavigate();

    const handleOnSubmit = async (e) => {
        e.preventDefault();
    console.log(sessionStorage.getItem("forgotpwd"));
        const formData = new FormData();
        formData.append('emailid', sessionStorage.getItem("forgotpwd"));
        formData.append('pwd', Password);
        formData.append('confirmpwd', ConfirmPassword);
    
        try {
            const response = await fetch(`https://localhost:44345/api/Hirehub/reset`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                },
            });
    
            if (response.ok) {
                console.log('Password reset successful');
                // Handle successful reset
            } else {
                const errorData = await response.json();
                console.error('Error:', response.status, response.statusText);
                console.error('Backend Error:', errorData.error);
                // Handle error
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };
    

    const userOnchange = (e) => {
        if (e.target.name === "emailid") {
            setEmailid(e.target.value)
        }
        if (e.target.name === "password") {
            setPassword(e.target.value)
        }
        if (e.target.name === "confirmpassword") {
            setConfirmPassword(e.target.value)
        }
      
    };

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
        <div className="signup-container">
            <div className="signup-main">
                <video className='videoTag' autoPlay muted playsInline onEnded={(e) => e.target.pause()}>
                    <source src={bgvid} type='video/mp4' />
                </video>
            </div>
            <div className="signup-form">
                <div className="logo-signup">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="submit">
                    <form onSubmit={handleOnSubmit}>
                      
                        <span>Password:  </span>
                        <span>At least 8 characters long </span>
                        <span>Should contain 1 digit</span>
                        <span>Should one uppercase </span>
                        <div className="password-input">
                            <input type={show} name="password" placeholder='Password' onChange={userOnchange} />

                        </div>

                        <div className="password-input" style={{ color: "white" }}>
                            <input type={show} name="confirmpassword" placeholder='Confirm Password' onChange={userOnchange} />
                            <span className="eye-icon" onClick={handleToggle} style={{ marginLeft: "-30px", color: "white" }}>
                                <Icon icon={icon} size={20} />
                            </span>
                        </div>

                     
                        <button className='btn' type="submit">Sign up</button>

                      
                    </form>
                </div>
            </div>
        </div>
    );
}
