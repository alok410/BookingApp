import React, { useState } from 'react';
import NavBar from '../shared/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import './Styles/login.css'; // Import the CSS file
import { useDispatch, useSelector } from 'react-redux';
 import { setLoading, setUser } from '@/redux/authSlice';

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const dispatch = useDispatch(); // Add this line to get dispatch
  const navigate = useNavigate();
  const {loading} = useSelector(store=>store.auth)

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        alert(res.data.message);
      }

    } catch (error) {
      console.log(error);
    }
    finally{
      dispatch(setLoading(false));
    }
  }

  return (
    <div>
      <NavBar />
      <div className="login-container">
        <form onSubmit={submitHandler}>
          <h1>Login</h1>
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={input.email}
              name='email'
              onChange={changeEventHandler}
              type="email"
              placeholder='patel@gmail.com'
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={input.password}
              name='password'
              onChange={changeEventHandler}
              type="password"
              placeholder='********'
            />
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="role"
                value="student"
                checked={input.role === "student"}
                onChange={changeEventHandler}
              />
              Student
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role === "recruiter"}
                onChange={changeEventHandler}
              />
              Recruiter
            </label>
          </div>
{
  loading ?  <button> Loading...</button>:
          <button type='submit'>Login</button>
}
          <span>Don't have an account? <Link to="/signup">Sign Up</Link></span>
        </form>
      </div>
    </div>
  );
}

export default Login;
