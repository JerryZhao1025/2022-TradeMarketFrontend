import React from 'react'
import { useState, useEffect } from "react";
import { Box, Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setUser } from '../../redux/userRedux';
import { useDispatch } from 'react-redux';
import { BACKEDN_API } from '../../constant';


export default function Login({ handleChange }) {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    let navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        // const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log(username, password);
        // axios.post(`${BACKEDN_API}/login`, {
        //     username: username,
        //     password: password
        // }).then(res => {
        //     debugger;
        //     const loginUser = res.data;
        //     dispatch(setUser(loginUser));
        //     localStorage.setItem('token', loginUser.accessToken);
        //     localStorage.setItem('userId', loginUser._id);
        //     localStorage.setItem('currentUser', loginUser.username);
        //     navigate("/")
        // }).catch(err => {
        //     window.alert(err.response.data)
        // })

        const data = {
            username: username,
            password: password,
        }

        const signin = (data) => {
            const signinUrl = "/signin";
        
            return fetch(signinUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }).then((response) => {
                if (response.status < 200 || response.status >= 300) {
                    throw Error("Fail to sign in");
                }
            });
        };

        signin(data)
        .then(() => {
            navigate("/");
        })
        .catch(() => {
            window.alert('Sign in failed');
        });
    };

    const paperStyle = { padding: 20, height: '73vh', width: 300, margin: "30px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }
    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 1 }}
                >
                    <TextField name='username' label='Username' placeholder='Enter username' fullWidth required value={username}
                            onChange={e => setUserName(e.target.value)} />
                    <TextField name='password' label='Password' placeholder='Enter password' type='password' fullWidth required value={password}
                            onChange={e => setPassword(e.target.value)}/>
                    {/* <FormControlLabel
                        control={
                            <Checkbox
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="Remember me"
                    /> */}
                    <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                    <Typography >
                        <Link href="tmp/TradeMarketFrontend/src/pages/login/Login#" >
                            Forgot password ?
                        </Link>
                    </Typography>
                    <Typography > Do you have an account ?
                        {/* <Link component = "button" onClick={()=>handleChange("event",1)} > */}
                        <Link component="button" onClick={() => navigate("/signup")} >
                            Sign Up
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Grid>
    )
}