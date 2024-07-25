import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const togalPasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/login", formData);
            if(response.data.message==="User loggedIn"){
                // toast.success("login successful");
                sessionStorage.setItem("userId" , response.data.userId);
                navigate("/home");
                return
            }
            toast.error(response.data.message);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='login-container'>
            <form onSubmit={handleSubmit} className="login-form">
                <h2 className='heading'>Login</h2>
                <div className='login-input'>
                    <label>Email:</label>
                    <input type='email' name='email' value={formData.email} onChange={handleChange} required></input>
                </div>

                <div className='login-input'>
                    <label>Password:</label>
                    <input type={showPassword ? "text" : "password"} name='password' value={formData.password} onChange={handleChange} required></input>
                </div>

                <button className='show-password-button' onClick={togalPasswordVisibility} type='button'> {showPassword ? "Hide-password" : "Show-Password"}</button>

                <button className='submit-button' type='submit' >Submit</button>


                <p className='link-button'  >Don't have an account?
                    <Link to={"/signup"}>Signup</Link>
                </p>

            </form>
            <ToastContainer />
        </div>
    )
}
