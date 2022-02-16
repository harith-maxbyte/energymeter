import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { AiOutlineUnlock } from "react-icons/ai";
import axios from "axios";
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ENDPOINT } from "../../Helpers/Constatnt";
// import Dashboard1 from '../Dashboard1';
// import { Redirect, Route, NavLink } from "react-router-dom";
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Logo from '../../assets/images/png/byte-Operations-logo.png';
import poster from '../../assets/poster.jpeg';

import { useForm } from 'react-hook-form';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props} style={{ fontSize: "15px", fontWeight: 500, color: "#4251A3" }}>
            {'Copyright © '}
            <Link color="inherit" href="https://maxbyte.co/">
                Maxbyte Technologies
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignInSide(props) {
    const { register, handleSubmit, formState: { errors, password }, } = useForm()
    const [msg, setMsg] = React.useState("")






    // React.useEffect(() => {

    //     const user = {
    //         Email: "a@a.a",
    //         password: "123",
    //     };
    //     // const options = {
    //     //     // method: 'POST',
    //     //     headers: {
    //     //         // 'Accept': 'application/json',
    //     //         // 'Content-Type': 'application/json;charset=UTF-8',
    //     //         "Access-Control-Allow-Origin": "*",
    //     //         // "Cross-Origin": "true",
    //     //     }
    //     // }

    //     // axios.post(`${ENDPOINT}/auth`, user)
    //     //     .then((res) => {
    //     //         console.log("RESPONSE RECEIVED: ", res);
    //     //     })
    //     //     .catch((err) => {
    //     //         console.log("AXIOS ERROR: ", err);
    //     //     })
    //     axios.post(`${ENDPOINT}/auth`, user, {
    //         headers: {
    //             // "Access-Control-Allow-Origin": "*",
    //             'content-type': 'text/json'
    //         }
    //     });

    // }, [])



    const submit = (event) => {
        // console.log(event)
        const user = {
            Email: event.email,
            password: event.password,
        };


        axios({
            method: 'post',
            // mode: 'no-cors',
            url: `${ENDPOINT}/auth`,
            data: user,
        })
            .then(res => {
                // console.log(res); //Total response
                localStorage.removeItem("auth-token")
                localStorage.setItem("auth-token", JSON.stringify(res.data.payload.jwt))
                localStorage.setItem("email", event.email)
                props.history.push("/1", event.email)
            })
            .catch(err => {
                // console.log(`Invalid Credentials->${err}`);
                setMsg('Invalid Credentials')
            });

    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${poster})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item
                    xs={12}
                    sm={8}
                    md={5}
                    // component={Paper} 
                    elevation={6}
                // square
                >
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                        style={{ width: "22rem", margin: "10rem 8rem" }}
                    >
                        <img src={Logo} alt="Byte-Operations" />
                        <Avatar sx={{ m: 1, bgcolor: '#223357' }}>
                            <AiOutlineUnlock />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        {msg ? <h4 style={{ color: "red" }}>{msg}</h4> : ""}
                        <Box component="form" noValidate onSubmit={handleSubmit(submit)} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,  // /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                                        message: "Invalid email address"
                                    }
                                })}
                                error={!!errors?.email}
                                helperText={errors?.email ? errors.email.message : null}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 3,
                                        message: "Password must have at least 3 characters"
                                    }
                                })}
                                error={!!errors?.password}
                                helperText={errors?.password ? errors.password.message : null}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>

                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}