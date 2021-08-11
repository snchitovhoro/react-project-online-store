import React, {useContext, useState} from 'react';
import "./Login.css"
import axios from 'axios';
import {APIConfig} from "../../store/API-Config";
import {Link} from "react-router-dom";
import {APIHeader, UserInfo} from "../../store/AppContext";
import store from "../../store/store";
import {useDispatch} from "react-redux";
import {LOGIN_FETCH_SUCCESS, SET_USER} from "../../constants/constants";
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
export default function Login(props) {
    const APIs = useContext(APIConfig);
    const { userInfo, setUserInfo } = useContext(UserInfo);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const state = store.getState();
    const dispatch = useDispatch();

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();

        axios.post(APIs.loginAPI, {
            username:email,
            password:password
        }).then(response => {
            dispatch({
                type: LOGIN_FETCH_SUCCESS,
                payload: response.data.token
            })
            const headers = {
                 'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + response.data.token,
            }
            axios(APIs.userAPI + "/current",{headers})
                .then(response=>{
                    const info = JSON.stringify(response.data);
                    dispatch({
                        type: SET_USER,
                        payload: info
                    })
                    setUserInfo(state.userInfo);
                    document.location.href = '/';
                }).catch(error => {
                alert(error.message);
            })
        })
            .catch(error => {
                alert(error.message);
            })
    }

    return (
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <div>
                    <h1>Sign In</h1>
                </div>
                <div>
                    {/* <label htmlFor="email">Username</label> */}
                    <TextField
                    label="Username"
                        type="text"
                        id="email"
                        placeholder="Enter username"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        variant="outlined"
                    ></TextField>
                </div>
                <div>
                    {/* <label htmlFor="password">Password</label> */}
                    <TextField
                    label="Password"
                        type="password"
                        id="password"
                        placeholder="Enter password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        variant="outlined"
                    ></TextField>
                </div>
                <div>
                    <label />
                    <Button color="secondary" size="large" variant="contained" type="submit">
                        Sign In
                    </Button>
                </div>
                <div>
                    <label />
                    <div>
                        New customer?{' '}
                        <Link to={`/signup`}>
                            Create your account
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}