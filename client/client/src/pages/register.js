import React, {useState} from 'react'
import{ Box, Grid, Paper,
    TextField,
    Typography,
    Button,
    Alert,
    Stack
}from '@mui/material';
import {publicRequest} from "../requestMethod"




const Register = () => {
    const [email, setEmail] =useState("")
    const [name, setName] =useState("")
    const [password, setPassword] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const [err, setError] = useState(false)

    //submit registeration

    const handleClick = async () => {
        try{
            await publicRequest.post("/auth/register", {email,name, imgUrl, password})
            setError(false)
        } catch (err) {
            setError(true)
        }
    }


    //register form code
    return (
        <Grid container justifyContent="center">
            <Grid item>
                <Typography  variant="h4">Register Page</Typography>
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
                                label="Name"
                                type="text"
                                style={{ width: "400px" }}
                                onChange={(e)=> setName(e.target.value)}
                            ></TextField>
                            </Box>
                            <br/>
                            <Box>
                            <TextField
                                label="ImgUrl"
                                type="text"
                                style={{ width: "400px" }}
                                onChange={(e)=> setImgUrl(e.target.value)}
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
                                Register
                            </Button>
                        </Box>
                    </Box>
                </Paper>
                {err && (
                    <>
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert severity="error">Your Email is used</Alert>
                        </Stack>
                    </> 
                )}
            </Grid>
            </Grid>
        )
}
export default Register;
