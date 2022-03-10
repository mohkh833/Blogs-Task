import React, {useState, useEffect} from 'react'
import{ 
    Box, 
    Grid, 
    Paper,
    Typography,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Dialog,
    ListItemText,
    ListItem,
    List,
    DialogTitle,
    ListItemAvatar,
    Avatar,
    CircularProgress,
    DialogContentText,
    DialogContent,
    DialogActions,
    TextField,
} from '@mui/material';
import {Link} from "react-router-dom"
import {userRequest} from "../requestMethod"
import NavBar from '../components/Navbar';
const Home = () => {

    const [open, setOpen] =useState(false)
    const [posts, setPosts] = useState([])
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState("")
    const [report, setReports] = useState("")
    const [postId, setPostId] = useState(0)
    const [commentId, setCommentId] = useState(0)
    const [loading ,setLoading] = useState(false)
    const [openAddComments, setOpenAddComments] = useState(false)
    const [openEditComments, setOpenEditComments] = useState(false)
    const [openAddPostReports, setOpenAddPostReports] = useState(false)
    const [openAddCommentReports, setAddCommentReports] = useState(false)

    let userEmail = localStorage.getItem("email")
    let isAdmin = +localStorage.getItem("isAdmin")

    if(isAdmin===0) isAdmin= false
    else isAdmin=true

    // handle view comments
    const handleDialog = async (postId) => {
        setOpen(true)
        try{
            setLoading(true)
            await userRequest.get("/comments/getComentById/"+ postId).then((result) =>{
                setComments(result.data)
            }).then(()=>{
                setLoading(false)
            })
        } catch(err) {
            console.log(err)
        }
    }

    // handle close comments dialo
    const handleCloseDialog = () => {
        setOpen(false)
    }

    //handle submit comment
    const submitComment = async() => {
        const userId = localStorage.getItem("userId")
        try{
            await userRequest.post("/comments/createComment", {comment_content:comment, postId, userId})
        } catch(err) {
            console.log(err)
        }
        setOpenAddComments(false)
    }

    //handle submit comment
    const updateComment = async() => {
        
        try{
            await userRequest.put("/comments/updateComment/"+commentId, {comment_content:comment})
        } catch(err) {
            console.log(err)
        }
        
        setOpenAddComments(false)
        window.location.reload()
    }

    //handle submit report post
    const submitReportPost = async() => {
        const userId = localStorage.getItem("userId")
        try{
            await userRequest.post("/reports/reportPost", {report_content:report, postId, userId})
        } catch(err) {
            console.log(err)
        }
        setOpenAddPostReports(false)
    }

    //handle submit report comment
    const submitReportComment = async() => {
        const userId = localStorage.getItem("userId")
        try{
            await userRequest.post("/reports/reportComment", {report_content:report, commentId, userId})
        } catch(err) {
            console.log(err)
        }
        setAddCommentReports(false)
    }

    //handle add comment dialog open
    const handleAddComments = (id) => {
        setOpenAddComments(true)
        setPostId(id)
    }

    //handle add report post dialog open
    const handleAddPostReports = (id) => {
        setOpenAddPostReports(true)
        setPostId(id)
    }

    //handle add report comment dialog open
    const handleAddCommentReports = (id) => {
        setAddCommentReports(true)
        setCommentId(id)
    }

    //handle edit comment dialo open
    const handleEditComment = (id) => {
        setOpenEditComments(true)
        setCommentId(id)
    }

    //handle get post id to be edited
    const handleEdit =(id) => {
        localStorage.setItem("postId" ,id)
    }
    
    // handle delete post
    const handleDeletePost = async(id) => {
        try{
            await userRequest.delete("/posts/deletePost/"+id)
        } catch(err) {
            console.log(err)
        }
        window.location.reload()
    }

    // handle delete comment
    const handleDeleteComment = async(id) => {
        try{
            await userRequest.delete("/comments/deleteComment/"+id)
        } catch(err) {
            console.log(err)
        }
        window.location.reload()
    }

    // handle mounting  posts 
    useEffect(()=> {
        let mounted = true
        const fetchPosts = async() => {
            if(mounted){
                let result = await userRequest.get("/posts/")
                setPosts(result.data)
            }
        }
        fetchPosts()
        return () => (mounted = false)
    },[])

    //check log in
    let isLoggedIn = +localStorage.getItem('isLoggedIn')
    
    //Post Card code
    const PostCard = () => {
        return( 
            <Grid container justifyContent="center">
            <Grid item>
                <Typography  display="flex" alignItems="center" justifyContent="center"  variant="h4">Posts</Typography>
                {posts.map((post) => (
                <Box pt={3} key={post.id}>
                    <Paper>
                        <Card sx={{ maxWidth: 700, maxHeight:900 }}>
                            <CardMedia
                                component="img"
                                height="300"
                                image={post.post_img_url}
                                alt="green iguana"
                            />
                            <Box>
                                <CardContent>
                                    <Typography  variant="h2" component="div">
                                        {post.post_title}
                                        {((post.email === userEmail )|| isAdmin) &&  (
                                            <React.Fragment>
                                                <Button size="large" color="error" onClick={() => handleDeletePost(post.id)}>Delete</Button>
                                            </React.Fragment>
                                        )}
                                        {(post.email === userEmail ) && (
                                            <Link to="/editpost">
                                            <Button size="large" onClick={() => handleEdit(post.id)}>edit</Button>
                                            </Link>
                                        )}
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    <Typography  variant="h6" color="text.secondary">
                                        {post.post_content}
                                    </Typography>
                                </CardContent>
                            </Box>
                            <CardContent>
                                <CardActions>
                                    <Button  size="small">{post.name}</Button>
                                    <Button  size="small" onClick={() => handleDialog(post.id)} >View Comments</Button>
                                    {isLoggedIn === 1 && (
                                        <Button variant="text" size="small" onClick={() => handleAddComments(post.id)} >Add Comment</Button>
                                    )}
                                    {post.email !== userEmail && (
                                        <React.Fragment>
                                            {isLoggedIn === 1 && (
                                                <Button variant="outlined" color="error" size="small"  onClick={()=> handleAddPostReports(post.id)} >Report</Button>
                                            )}
                                        </React.Fragment>
                                    )}
                                </CardActions>
                            </CardContent>
                        </Card>
                    </Paper>
                </Box>
                ))}
            </Grid>
        </Grid>
        )
    }

    // Comments Dialog code
    const ViewCommentsDialog = () => {
        return (
            <Dialog open={open}  >
                <Box sx={{ width: 500 }}>
                    <DialogTitle>
                    Post Comments
                    </DialogTitle>
                    {comments.map((comment) => (
                    <List key={comment.id}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={comment.user.imgUrl} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={comment.user.name}
                                secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        color="text.primary">
                                    </Typography>
                                        {comment.comment_content}
                                </React.Fragment>
                                }
                            />
                            {comment.user.email !== userEmail && (
                                <React.Fragment>
                            {isLoggedIn === 1 && (
                            <Box pt={1} >
                            <Button variant="outlined" color="error" size="small" onClick={() =>handleAddCommentReports(comment.id)}>Report</Button>
                            </Box>
                            )}
                            </React.Fragment>
                            )}
                            {((comment.user.email === userEmail) || isAdmin) && (
                                <React.Fragment>
                                
                                    <Box p={1}>
                                    <Button variant="outlined" color="error" size="small" onClick={() =>handleDeleteComment(comment.id)}>Delete</Button>
                                    </Box>
                                </React.Fragment>
                            )}
                            {(comment.user.email === userEmail) && (
                                <Box p={1}>
                                <Button variant="outlined" size="small" onClick={() =>handleEditComment(comment.id)}>edit</Button>
                                </Box>
                            )}
                        </ListItem>
                        
                    </List>
                    ))}
                </Box>
            <Button  variant="outlined" color="error" size="large" onClick={handleCloseDialog}>Close</Button>
        </Dialog>
        )
    }


    // adding comment code
    const addCommentDialogs = () => {
        return(
            <React.Fragment>
                <Dialog open={openAddComments} >
                        <DialogTitle>Add Comment</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Comments will be added in the post you click on
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Write Your Comment"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={(e)=>setComment(e.target.value)}
                                />
                            </DialogContent>
                        <DialogActions>
                            <Button color="error" onClick={()=>setOpenAddComments(false)}>Close</Button>
                            <Button onClick={submitComment}>Add</Button>
                        </DialogActions>
                </Dialog>
            </React.Fragment>
        )
    }

    // editing comment code
    const editCommentDialog = () => {
        return(
            <React.Fragment>
                <Dialog open={openEditComments} >
                        <DialogTitle>Edit Comment</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Write Your Comment"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={(e)=>setComment(e.target.value)}
                                />
                            </DialogContent>
                        <DialogActions>
                            <Button color="error" onClick={()=>setOpenEditComments(false)}>Close</Button>
                            <Button onClick={updateComment}>Edit</Button>
                        </DialogActions>
                </Dialog>
            </React.Fragment>
        )
    }

    // adding report  post code
    const addReportPostDialogs = () => {
        return(
            <React.Fragment>
                <Dialog open={openAddPostReports} >
                        <DialogTitle>Add Report</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Reports will be added in the post you click on
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Write Your Report"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={(e)=>setReports(e.target.value)}
                                />
                            </DialogContent>
                        <DialogActions>
                            <Button color="error" onClick={()=>setOpenAddPostReports(false)}>Close</Button>
                            <Button onClick={submitReportPost}>Add</Button>
                        </DialogActions>
                </Dialog>
            </React.Fragment>
        )
    }

    //adding report comment code
    const addReportCommentDialogs = () => {
        return(
            <React.Fragment>
                <Dialog open={openAddCommentReports} >
                        <DialogTitle>Add Report</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Reports will be added in the post you click on
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Write Your Report"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={(e)=>setReports(e.target.value)}
                                />
                            </DialogContent>
                        <DialogActions>
                            <Button color="error" onClick={()=>setAddCommentReports(false)}>Close</Button>
                            <Button onClick={submitReportComment}>Add</Button>
                        </DialogActions>
                </Dialog>
            </React.Fragment>
        )
    }

    // main rendering code
        if(!loading){
            return (
                <React.Fragment>
                <NavBar/>
                    {PostCard()}
                    {ViewCommentsDialog()}
                    {addCommentDialogs()}
                    {addReportPostDialogs()}
                    {addReportCommentDialogs()}
                    {editCommentDialog()}
                </React.Fragment>
                
            )
        } 
        else {
            //loading commponent
            return(
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            )
        }
}

export default Home
