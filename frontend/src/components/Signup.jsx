import React, { useState } from 'react'     //  ( rfc )
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


import { Link } from 'react-router-dom';

export default function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const [showPassword, setShowPassword] = useState(false);

    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });  //Destructuring (IT CHANGES THE NEW VALUE IN THE OLD VALUE)
    };

    const togalPasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords Do Not Matched");
            setFormData({ password: "", confirmPassword: "" });
            return
        }else{
            try{
            const response = await axios.post("http://localhost:5000/signup", formData);
            if(response.data.message==="User Saved"){
                // toast.success("Signup successfull");
                sessionStorage.setItem("userId" , response.data.userId);
                navigate("/home");
                return
            }
            toast.error(response.data.message);    
            
        }catch( error ){
        console.log(error);
    }
    };
}
    return (
        <div className='signup-container'>
            <form onSubmit={handleSubmit} className='signup-form'>
                <h2 className='heading'>Sign-Up</h2>
                <div className='form-input'>
                    <label>Username:</label>
                    <input type="text" name='name' value={formData.name} onChange={handleChange} required />
                </div>
                <div className='form-input'>
                    <label>Email :</label>
                    <input type="email" name='email' value={formData.email} onChange={handleChange} required />
                </div>
                <div className='form-input'>
                    <label>Password :</label>
                    <input type={showPassword ? "text" : "password"} name='password' value={formData.password} onChange={handleChange} required />
                </div>
                <div className='form-input'>
                    <label>Confirm Password :</label>
                    <input type={showPassword ? "text" : "password"} name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} required />
                </div>

                <button className='show-password-button' onClick={togalPasswordVisibility} type='button'>{showPassword ? "Hide-Password" : "Show-Password"}</button>

                <button className='submit-button' type='submit' >Submit</button>


                <p className='link-button'  >Already have an account?
                    <Link to={"/login"}>login</Link>
                </p>
            </form>
            <ToastContainer />
        </div>
    )
}
