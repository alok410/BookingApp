import React from 'react';
import "./styles/navBar.css";
import { Link, useNavigate } from 'react-router-dom';
import Jobs from '../Jobs';
import Home from '../Home';
import store from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
function NavBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logouthandler = async ()=>{
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials:true});
            if(res.data.success){
                    dispatch(setUser(null));
                    navigate("/")
                    alert(res.data.message)
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    // const user = true ;
    const{user} = useSelector(store =>store.auth)
    return (
        <div className="navbar-container">
            <div className="navbar-logo">
                <img src="./profile.png" alt="logo" />
            </div>
            <ul className="navbar-menu">
                <Link to="/">
                <li >Home</li>
                </Link>
                <Link to="/jobs">
                <li>Jobs</li>
                </Link>
                <Link to="/browse">
                <li> Browse</li>
                </Link>
                {user ? (
                    <div className="navbar-user-section">
                        <Link to="/profile">
                        <img style={{ borderRadius:"50%",height:"50px", width:"5  0px"}} src={user.profile.profilePhoto} alt="" />
                        </Link>
                        <Link>
                        <button onClick={logouthandler} className="navbar-button">Log out</button>
                        </Link>
                    </div>
                ) : (
                    <div className="navbar-auth-buttons">
                       <Link to="/login">
                        <button className="navbar-button">Log in</button>
                       </Link>
                       <Link to="/signup">
                        <button className="navbar-button signup-button">Sign up</button>
                       </Link>
                    </div>
                )}
            </ul>
        </div>
    );
}

export default NavBar;
