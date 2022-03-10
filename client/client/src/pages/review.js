import React,{useState, useEffect} from 'react'

import{ Box, Grid, Paper,
    Typography,
    ListItem,
    List,
}from '@mui/material';
import { userRequest } from '../requestMethod';

const Review = () => {

    const [posts, setPosts] = useState([])
    const [comments, setComments] = useState([])
    const [mostCommented, setMostCommented] = useState([])

    useEffect(()=> {
        let mounted = true
        const fetchReportedPosts = async() => {
                if(mounted){
                try{
                    let result = await userRequest.get("/reports/getAllPosts")
                    setPosts(result.data)
                }catch(err){
                    console.log(err)
                }
            }
        }
        fetchReportedPosts()
    return ()=>(mounted=false)
    },[])

    useEffect(()=> {
        let mounted = true
        const fetchReportedComments = async() => {
                if(mounted){
                try{
                    let result = await userRequest.get("/reports/getAllComments")
                    setComments(result.data)
                }catch(err){
                    console.log(err)
                }
            }
        }
        fetchReportedComments()
    return ()=>(mounted=false)
    },[])

    useEffect(()=>{ 
        let mounted = true
        const fetchMostCommentedPosts = async() => {
                if(mounted){
                try{
                    let result = await userRequest.get("/posts/mostCommented")
                    console.log(result.data)
                    setMostCommented(result.data)
                }catch(err){
                    console.log(err)
                }
            }
        }
        fetchMostCommentedPosts()
    return ()=>(mounted=false)
    },[])

    const GetReportedPosts = () => {
        return(
        <Box p={2}>
        <Paper>
                <Typography  display="flex" alignItems="center" justifyContent="center"  variant="h4">Reported Posts</Typography>
                {posts.map((post) => (
                <List key={post.id}>
                    <hr></hr>
                        <ListItem alignItems="flex-start">
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                color="text.primary">
                                Report Content :{post.report_content}
                            </Typography>
                        </ListItem>
                        <ListItem alignItems="flex-start">
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                color="text.primary">
                                Post Title: {post.post.post_title}
                            </Typography>
                        </ListItem>
                        <ListItem alignItems="flex-start"> 
                            <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            color="text.primary">
                            Post Id: {post.post.id}
                            </Typography>  
                        </ListItem> 
                </List>
            ))}
        </Paper>
    </Box>
        )
    }

    const GetReportedComments = () => {
        return (
            <Box  p={2}>
            <Paper>
                <Typography  display="flex" alignItems="center" justifyContent="center"  variant="h4">Reported Comments</Typography>
                    {comments.map((comment) => (
                    <List key={comment.id}>
                        <hr></hr>
                            <ListItem alignItems="flex-start">
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    color="text.primary">
                                    Report Content :{comment.report_content}
                                </Typography>
                            </ListItem>
                            <ListItem alignItems="flex-start">
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    color="text.primary">
                                    comment Content: {comment.comment.comment_content}
                                </Typography>
                            </ListItem>
                            <ListItem alignItems="flex-start"> 
                                <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                color="text.primary">
                                Comment Id: {comment.comment.id}
                                </Typography>  
                            </ListItem> 
                    </List>
                ))}
            </Paper>
        </Box>
        )
    }

    const GetMostCommentedPosts= () => {
        return(
            <Box  p={2}>
                <Paper>
                    <Typography  display="flex" alignItems="center" justifyContent="center"  variant="h4">Most Commented Post</Typography>
                        {mostCommented.map((comment) => (
                        <List key={comment.postId}>
                            <hr></hr>
                                <ListItem alignItems="flex-start">
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        color="text.primary">
                                        Post Title :{comment.post_title}
                                    </Typography>
                                </ListItem>
                                <ListItem alignItems="flex-start">
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        color="text.primary">
                                        Post Content :{comment.post_content}
                                    </Typography>
                                </ListItem>
                                <ListItem alignItems="flex-start"> 
                                    <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    color="text.primary">
                                    Comments Count: {comment.postCount}
                                    </Typography>  
                                </ListItem> 
                        </List>
                    ))}
                </Paper>
        </Box>
        )
    }

    let isAdmin = +localStorage.getItem("isAdmin")
    if(isAdmin){
    return (
        <React.Fragment>
            <Grid container justifyContent="center">
                {GetReportedPosts()}
                {GetReportedComments()}
                {GetMostCommentedPosts()}
            </Grid>
        </React.Fragment>
    )
    } else {
        return (
            <div>
            <Typography  display="flex" alignItems="center" justifyContent="center"  variant="h4">Your are not authorizated</Typography>
            </div>
        )
    }
}

export default Review