import React from 'react'
import "./Navbar.css";
import {Link} from "react-router-dom"
const NavBar = () => {

    let isLoggedIn = +localStorage.getItem('isLoggedIn')
    let email = localStorage.getItem('email')
    let isAdmin = +localStorage.getItem('isAdmin')
    if(isAdmin===0) isAdmin= false
    else isAdmin=true

    if(isLoggedIn===0) isLoggedIn= false
    else isLoggedIn=true

    const handleLogOut= () => {
        localStorage.setItem('userId', '')
        localStorage.setItem('Name', '')
        localStorage.setItem('email', '')
        localStorage.setItem('imgUrl', '')
        localStorage.setItem('token','')
        localStorage.setItem('isLoggedIn', 0)
        localStorage.setItem('isAdmin',0)
        window.location.reload()
    }

return (
    <div className="topbar">
        <div className="topbarWrapper">
        
        <div className="topLeft">
            <span className="logo">Blogs</span>
        </div>

        <div>
                {isLoggedIn && (
                    <span className="textEdit"> {email}</span>
                )} 
        </div> 

            
            {isLoggedIn && (
                <Link  className="textEdit" to="/post">Create Post</Link>
                
            )}
            {isLoggedIn && (
                <Link className="textEdit"  to="/editprofile">Edit Profile</Link>
                
            )}

            {!isLoggedIn && (
                <Link className="textEdit"  to="/register">Register</Link>
                
            )}

            {!isLoggedIn && (
                <Link className="textEdit"  to="/login">login</Link>
                
            )}

            <Link  className="textEdit"  to="/">
                    Home
            </Link>

            {isAdmin && (
                <Link className="textEdit" to='/review'>Review Reports</Link>
            )}

            {isLoggedIn && (
                <button className='buttonstyle' onClick={handleLogOut}>log out</button>
                
            )}

        </div>
        
  </div>
  )
}

export default NavBar