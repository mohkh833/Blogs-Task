import React, {useState} from 'react'
import{ Box, Grid, Paper,
    TextField,
    Typography,
    Button,
    Alert,
    Stack
}from '@mui/material';
import {publicRequest} from "../requestMethod"
import NavBar from '../components/Navbar';

const Login = () => {
    const [email, setEmail] =useState("")
    const [password, setPassword] = useState("")
    const [err, setError] = useState(false)

    const handleClick = async () => {
        try{
            const res = await publicRequest.post("/auth/login", {email, password})
            console.log(res.data)
            if(res.data.isAdmin == true)
            UseLocalStorage(res.data,1)
            else
            UseLocalStorage(res.data,0)
            setError(false)
        } catch(err){
            setError(true)
        }
        window.location.reload()
    }

    const UseLocalStorage = (data,flag) => {
        localStorage.setItem('userId', data.id)
        localStorage.setItem('Name', data.name)
        localStorage.setItem('email', data.email)
        localStorage.setItem('imgUrl', data.imgUrl)
        localStorage.setItem('token',data.accessToken)
        localStorage.setItem('isLoggedIn', 1)
        localStorage.setItem('isAdmin',flag)
    }

    
    return (
        <React.Fragment>
        <NavBar/>
        <Grid container justifyContent="center">
            <Grid item>
                <Typography  variant="h4">Login Page</Typography>
                <Paper>
                    <Box m={2} p={5} alignItems="center">
                        <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        ></Box>
                        <Box>
                            <TextField
                                label="Email"
                                type="text"
                                style={{ width: "400px" }}
                                onChange={(e)=> setEmail(e.target.value)}
                            ></TextField>
                            </Box>
                            <br/>
                            <Box>
                            <TextField
                                label="password"
                                type="password"
                                style={{ width: "400px" }}
                                onChange={(e)=> setPassword(e.target.value)}
                            ></TextField>
                        </Box>
                        <Box m={3}>
                        
                            <Button
                                variant="contained"
                                style={{ backgroundColor: "green", color: "floralwhite" }}
                                type="button"
                                onClick={handleClick}
                                >
                                Login
                            </Button>
                        </Box>
                    </Box>
                </Paper>
                {err && (
                    <>
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert severity="error">Email or Password is wrong</Alert>
                        </Stack>
                    </> 
                )}
            </Grid>
        </Grid>
        </React.Fragment>
        )
}
export default Login;