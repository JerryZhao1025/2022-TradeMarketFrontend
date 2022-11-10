import React from 'react'
import { useState, useEffect } from "react";
import { Box, Link, Grid, Paper, Avatar, Typography, TextField, Button } from '@mui/material'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,24}$/;


export default function Signup() {

    const [user, setUser] = useState('');
    const [validUserName, setValidUserName] = useState(false);
    const [email, setEmail] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false); // check if pwd is matched with second time

    useEffect(() => {
        const result = USER_REGEX.test(user);
        setValidUserName(result);
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            username: user,
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: pwd,
        }

        console.log(data);

        const signup = (data) => {
            const signupUrl = "/signup";
        
            return fetch(signupUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }).then((response) => {
                if (response.status < 200 || response.status >= 300) {
                    throw Error("Fail to sign up");
                }
            });
        };

        signup(data)
        .then(() => {
            navigate("/login");
        })
        .catch(() => {
            window.alert('Sign up failed');
        });
    };

    const paperStyle = { padding: 20, width: 300, margin: "30px auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 3 }}
                >
                    <Grid>
                        <TextField fullWidth label='First Name' 
                            placeholder="Enter your First Name" 
                            value={firstname}
                            onChange={e => setFirstName(e.target.value)} 
                        />

                        <TextField fullWidth label='Last Name' 
                            placeholder="Enter your Last Name" 
                            value={lastname}
                            onChange={e => setLastName(e.target.value)} 
                        />

                        <TextField fullWidth label='Email Address' 
                            placeholder="Enter your Email Address" 
                            value={email}
                            onChange={e => setEmail(e.target.value)} 
                        />

                        <TextField fullWidth label='UserName' 
                            placeholder="Enter your username" 
                            id='username' name='username' 
                            value={user}
                            onChange={e => setUser(e.target.value)} 
                        />

                        <TextField type="password" fullWidth 
                            id='password' name='password' label='Password' 
                            placeholder="Enter your password" 
                            onChange={e => setPwd(e.target.value)} 
                        />

                        <TextField type="password" fullWidth 
                            label='Confirm Password' 
                            placeholder="Confirm your password" 
                            onChange={e => setMatchPwd(e.target.value)} 
                        />
                        
                        {/* <FormControlLabel
                            control={<Checkbox name="checkedA" />}
                            label="I accept the terms and conditions."
                        /> */}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                    </Grid>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link
                                component="button"
                                variant="body2"
                                onClick={() => navigate("/login")}
                            >
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Grid>
    )
}