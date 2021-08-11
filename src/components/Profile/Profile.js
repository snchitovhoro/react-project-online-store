import React, {useContext, useEffect, useState} from "react";
import store from "../../store/store";
import axios from "axios";
import {APIConfig} from "../../store/API-Config";
import {SET_USER} from "../../constants/constants";
import {useDispatch} from "react-redux";



const  Profile = () =>{
    const APIs = useContext(APIConfig);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phNumber, setPhNumber] = useState('');
    const [userInfo, setUserInfo ] = useState(null);
    const dispatch = useDispatch();
    const state = store.getState();
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + state.oAuthToken,
    }



const loadData = ()=>{
    axios(APIs.userAPI + "/current",{headers})
        .then(response=>{
            const info = JSON.stringify(response.data);
            dispatch({
                type: SET_USER,
                payload: info
            })
            setUserInfo(state.userInfo);
            setFirstName(state.userInfo.firstName);
            setLastName(state.userInfo.lastName);
            setPhNumber(state.userInfo.phoneNumber);

        }).catch(error => {
        alert(error.message);
    })
}

useEffect(()=>{
    loadData();

},[]);

    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch update profile
        if (password !== confirmPassword) {
            alert('Password and Confirm Password Are Not Matched');
        } else {

            axios.post(APIs.userAPI + "/update", {
                username:userInfo.username,
                firstName:firstName,
                lastName:lastName,
                password:password,
                phoneNumber:phNumber

            }, {headers}).then(response => {
                alert("Updated successfully");
                const info = JSON.stringify(response.data);
                dispatch({
                    type: SET_USER,
                    payload: info
                })
                document.location.href = '/';
            })
                .catch(error => {
                    alert(error.message);
                })

        }
    };

    return (

        <div>
            <form className="form" onSubmit={submitHandler}>

                <div>
                    <h1>User Profile</h1>
                </div>
                {userInfo && (
                <div className="form" >
                    <div>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            placeholder="Enter First name"
                            required
                            onChange={(e) => setFirstName(e.target.value)}
                            defaultValue={userInfo.firstName}/>
                    </div>
                    <div>
                    <label htmlFor="LastName">Last Name</label>
                    <input
                    type="text"
                    id="LastName"
                    placeholder="Enter Last name"
                    required
                    onChange={(e) => setLastName(e.target.value)}
                    defaultValue={userInfo.lastName}/>
                    </div>
                    <div>
                    <label htmlFor="phNumber">Phone Number</label>
                    <input
                    type="number"
                    id="phNumber"
                    placeholder="Enter Phone Number"
                    defaultValue={userInfo.phoneNumber}
                    required
                    onChange={(e) => setPhNumber(e.target.value)}>
                    </input>
                    </div>
                    <div>
                    <label htmlFor="password">Password</label>
                    <input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    </div>
                    <div>
                    <label htmlFor="confirmPassword">confirm Password</label>
                    <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Enter confirm password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    ></input>
                    </div>

                    <div>
                    <label />
                    <button className="primary" type="submit">
                    Update
                    </button>
                    </div>
                </div>
                )}


            </form>
        </div>

    );
}

export default  Profile;