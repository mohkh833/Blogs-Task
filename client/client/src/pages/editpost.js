import React, {useEffect, useState} from 'react'
import{ Box, Grid, Paper,
    TextField,
    Typography,
    Button,
    Alert,
    Stack
}from '@mui/material';
import {userRequest} from "../requestMethod"

const EditPost = () => {
    const [data, setdata] =useState("")
    const [post_title,setTitle] = useState()
    const [post_content, setContent] = useState()
    const [imgUrl, setImgUrl] = useState("")
    const [success, setSuccess] = useState(false)

    let id = localStorage.getItem("postId")

    //mount posts
    useEffect(()=> {
        let mounted = true
            const fetchPost = async() => {
                    if(mounted){
                    try{
                        let result = await userRequest.get("/posts/getpostByid/"+id)
                        setdata(result.data)
                    }catch(err){
                        console.log(err)
                    }
                }
            }
        fetchPost()
        return ()=>(mounted=false)
    },[id])
    
    // submit edit post
    const handleClick = async() => {
        let postId = localStorage.getItem("postId")
        let body = {post_title, post_content, imgUrl}
        try{
            await userRequest.put("/posts/editPost/"+postId ,body )
            setSuccess(true)
        } catch(err){
            console.log(err)
        }
    }

    // edit post form code
    return (
        <Grid container justifyContent="center">
            <Grid item>
                <Typography  ml={20}  variant="h4">Edit Post</Typography>
                <Paper>
                    <Box m={3} p={5} alignItems="center">
                        <Box display="flex" alignItems="center" justifyContent="center"/>
                            <Box>
                                <TextField
                                label={data.post_title}
                                type="text"
                                style={{ width: "400px" }}
                                onChange={(e) => setTitle(e.target.value)}
                                />
                                
                            </Box>
                            <br/>
                            <Box>
                                <TextField
                                label={data.post_content}
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
                                label={data.imgUrl}
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
                {success && (
                    <React.Fragment>
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert severity="success">Post is updated successfully</Alert>
                        </Stack>
                </React.Fragment> 
                )}
            </Grid>
        </Grid>
    )
}

export default EditPost;
