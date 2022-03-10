import Login from "./pages/login"
import Register from "./pages/register"
import PostPage from "./pages/post"
import HomePage from "./pages/home"
import ReviewPage from "./pages/review"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import EditPost from "./pages/editpost";
import EditProfile from "./pages/editprofile"

function App() {
  let isLoggedIn = +localStorage.getItem("isLoggedIn")
  if(isLoggedIn===0) isLoggedIn= false
  else isLoggedIn=true
  return (
    
    <Router>
      <Routes>
        <Route path="/login" element={!isLoggedIn ? <Login/> : <Navigate to="/" />}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/post" element={isLoggedIn ? <PostPage/> : <Navigate to="/login" />} />
        <Route path="/editpost" element={<EditPost/>} />
        <Route path="/editprofile" element={isLoggedIn ? <EditProfile/> : <Navigate to="/login" />} />
        <Route path="/" element={<HomePage/>} />
        <Route path="/review" element={isLoggedIn ? <ReviewPage/> : <Navigate to="/login" />} />
      </Routes>    
    </Router>
  );
}

export default App;
