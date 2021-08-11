import React, {useContext, useState} from 'react';
// import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from 'axios';
import {APIConfig} from "../../store/API-Config";
import store from "../../store/store";
import {useDispatch} from "react-redux";
import {REGISTER_SUCCESS} from "../../constants/constants";


const SignUp = (props)=>{

    const APIs = useContext(APIConfig);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userRole, setUserRole] = useState('');
    const [phNumber, setPhNumber] = useState('');

    function handleRegisterSubmit(event) {
        event.preventDefault();

        axios.post(APIs.registerAPI, {
            firstName:firstName,
            lastName:lastName,
            username:email,
            password:password,
            roles:[{id:userRole}],
            phoneNumber:phNumber

        }).then(response => {
            alert("Registered successfully");
            document.location.href = '/signin';
        })
            .catch(error => {
                alert(error.message);
            })
    }
    return (
        <div>

            <form className="form" onSubmit={handleRegisterSubmit}>
                <div>
                    <h1>Create Account</h1>
                </div>
                {/* {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>} */}
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        placeholder="Enter First name"
                        required
                        onChange={(e) => setFirstName(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="LastName">Last Name</label>
                    <input
                        type="text"
                        id="LastName"
                        placeholder="Enter Last name"
                        required
                        onChange={(e) => setLastName(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="phNumber">Phone Number</label>
                    <input
                        type="number"
                        id="phNumber"
                        placeholder="Enter Phone Number"
                        required
                        onChange={(e) => setPhNumber(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Enter confirm password"
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></input>
                </div>

                <div>
                    <label htmlFor="User type">User type</label>

                    <select name="user" id="user" onChange={(e) => setUserRole(e.target.value)}>
                        <option value=""> </option>
                        <option value="3">Buyer</option>
                        <option value="2">Seller</option>
                    </select>
                </div>

                <div>
                    <label />
                    <button className="primary" type="submit">
                        Register
                    </button>
                </div>
                <div>
                    <label />
                    <div>
                        Already have an account?{' '}
                        {/* <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link> */}
                        {/* replace the following line by the above */}
                        <Link to="/signin" >Sign-In</Link>
                    </div>
                </div>
            </form>


        </div>
    );
}
export  default SignUp;
