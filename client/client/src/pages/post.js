import React, {useState} from 'react'
import{ Box, Grid, Paper,
    TextField,
    Typography,
    Button,
    Alert,
    Stack
}from '@mui/material';
import {userRequest} from "../requestMethod"
import NavBar from '../components/Navbar';

const Post = () => {

    const [title, setTitle] =useState("")
    const [content, setContent] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const [err, setErr] = useState(false)
    const [success, setSuccess] = useState(false)
    
    //handle Submit Posts
    const handleClick = async() => {
        let userId = localStorage.getItem('userId')
        try{
            if(title.length ===0 || content.length ===0 || imgUrl.length ===0 ){
                setErr(true)
            } else {
                await userRequest.post("/posts/createPost", {post_title:title, post_content:content,imgUrl,userId})
                setErr(false)
                setSuccess(true)
            }
        } catch(err){
            console.log(err)
        }
    }

// Form Code
    return (
        <React.Fragment>
            <NavBar/>
            <Grid container justifyContent="center">
                <Grid item>
                    <Typography  ml={20}  variant="h4">Create Post</Typography>
                    <Paper>
                        <Box m={3} p={5} alignItems="center">
                            <Box display="flex" alignItems="center" justifyContent="center"/>
                                <Box>
                                    <TextField
                                    label="Post Title"
                                    type="text"
                                    style={{ width: "400px" }}
                                    onChange={(e) => setTitle(e.target.value)}
                                    />
                                    
                                </Box>
                                <br/>
                                <Box>
                                    <TextField
                                    label="Post Content"
                                    type="text"
                                    multiline
                                    rows={6}
                                    style={{ width: "400px" }}
                                    onChange={(e) => setContent(e.target.value)}
                                    />
                                </Box>
                                <br/>
                                <Box>
                                    <TextField
                                    label="Post Image URL"
                                    type="text"
                                    style={{ width: "400px" }}
                                    onChange={(e) => setImgUrl(e.target.value)}
                                    />
                                </Box>
                                <br/>
                                <Box m={1}  >
                                <Button
                                    variant="contained"
                                    style={{ backgroundColor: "black", color: "floralwhite" }}
                                    type="button"
                                    onClick={handleClick}
                                    >
                                    Post
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                    
                    {err && (
                        <>
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <Alert severity="error">Fill All Fields</Alert>
                            </Stack>
                        </> 
                    )}

                    {success && (
                        <>
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert severity="success">Post is uploaded successfully</Alert>
                        </Stack>
                    </> 
                    )}
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Post;
