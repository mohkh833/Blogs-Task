import React, {useState, useEffect} from 'react'
import{ Box, Grid, Paper,
    TextField,
    Typography,
    Button,
    Alert,
    Stack
}from '@mui/material';
import {userRequest} from "../requestMethod"
import NavBar from '../components/Navbar';



const Register = () => {
    const [email, setEmail] =useState()
    const [name, setName] =useState()
    const [password, setPassword] = useState()
    const [imgUrl, setImgUrl] = useState()
    const [data, setData] = useState("")
    const [err, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    let id = +localStorage.getItem('userId')

    const handleClick = async () => {
        let body = {email, name, password,imgUrl}
        try{
            await userRequest.put("/users/updateUser/"+id, body)
            setSuccess(true)
            setError(false)
        } catch(err){
            setError(true)
        }
    }

    
    console.log(id)
    useEffect(()=> {
        let mounted = true
            const fetchUser = async() => {
                    if(mounted){
                    try{
                        let result = await userRequest.get("/users/getUser/"+id)
                        setData(result.data)
                        console.log(result.data)
                    }catch(err){
                        console.log(err)
                    }
                }
            }
            fetchUser()
        return ()=>(mounted=false)
    },[id])

    
    return (
        <React.Fragment>
        <NavBar/>
        <Grid container justifyContent="center">
            <Grid item>
                <Typography  variant="h4">Edit Profile Page</Typography>
                <Paper>
                    <Box m={2} p={5} alignItems="center">
                        <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        ></Box>
                        <Box>
                            <TextField
                                label={data.email}
                                type="text"
                                style={{ width: "400px" }}
                                onChange={(e)=> setEmail(e.target.value)}
                            ></TextField>
                            </Box>
                            <br/>
                            <Box>
                            <TextField
                                label={data.name}
                                type="text"
                                style={{ width: "400px" }}
                                onChange={(e)=> setName(e.target.value)}
                            ></TextField>
                            </Box>
                            <br/>
                            <Box>
                            <TextField
                                label={data.imgUrl}
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
                                Edit
                            </Button>
                        </Box>
                    </Box>
                </Paper>
                {err && (
                    <React.Fragment>
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert severity="error">Your Email is maybe used or you didn't updated your data</Alert>
                        </Stack>
                    </React.Fragment> 
                )}
                {success && (
                    <React.Fragment>
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert severity="success">Post is updated successfully</Alert>
                        </Stack>
                </React.Fragment> 
                )}
            </Grid>
            </Grid>
            </React.Fragment>
        )
}
export default Register;