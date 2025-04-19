import React, { useDebugValue, useState } from 'react';
import NavBar from '../shared/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { USER_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import './Styles/signup.css'; // Import the CSS file
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import store from '@/redux/store';

function Signup() {
    const [input, setInput] = useState({
        fullname: "",
        phoneNumber: "",
        email: "",
        password: "",
        role: "",
        file: null
    });

    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };

    const changeFileHandler = (e) => {
        setInput({
            ...input,
            file: e.target.files[0]
        });
    };

    const navigate = useNavigate();
    const dispatch =useDispatch();
    const {loading} = useSelector(store=>store.auth)

    const submitHandler = async (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("fullname", input.fullname);
        formdata.append("email", input.email);
        formdata.append("phoneNumber", input.phoneNumber);
        formdata.append("role", input.role);
        formdata.append("password", input.password);
        if (input.file) {
            formdata.append("file", input.file);
        }

        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/register`, formdata, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            });

            if (res.data.success) {
                navigate("/login");
                alert(res.data.message);
            }

        } catch (error) {
            alert(error.response.data.message);
            console.log(error);
        }
        finally{
            dispatch(setLoading(false))
        }
    }

    return (
        <div>
            <NavBar />
            <div className="signup-container">
                <form onSubmit={submitHandler}>
                    <h1>Sign Up</h1>
                    <div>
                        <label htmlFor="fullname">Full Name</label>
                        <input
                            onChange={changeEventHandler}
                            value={input.fullname}
                            name='fullname'
                            type="text"
                            placeholder='John Doe'
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            value={input.email}
                            name='email'
                            onChange={changeEventHandler}
                            type="email"
                            placeholder='john.doe@example.com'
                        />
                    </div>
                    <div>
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                            value={input.phoneNumber}
                            name='phoneNumber'
                            onChange={changeEventHandler}
                            type="number"
                            placeholder='1234567890'
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
                        <label>Role</label>
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
                    <div>
                        <label htmlFor="file">Profile Picture</label>
                        <input
                            accept='image/*'
                            type="file"
                            name="file"
                            onChange={changeFileHandler}
                        />
                    </div>
                    {
  loading ?  <button> a</button>:
          <button type='submit'>SignUp</button>
}
                    <span>Already have an account? <Link to="/login">Log in</Link></span>
                </form>
            </div>
        </div>
    );
}

export default Signup;
