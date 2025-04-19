import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logout from './Logout';

const Header = () => {
  const { isLoggedIn, user } = useSelector(state => state.auth);

  const navStyle = {
    backgroundColor: '#333',
    padding: '10px 20px',
    color: '#fff'
  };

  const ulStyle = {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    gap: '20px',
    alignItems: 'center'
  };

  const liStyle = {
    color: '#fff'
  };

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none'
  };

  return (
    <header style={navStyle}>
      <nav>
        <ul style={ulStyle}>
          <li style={liStyle}><Link to="/" style={linkStyle}>Home</Link></li>

          {isLoggedIn ? (
            <>
              <li style={liStyle}>
                <Link to={`/bookings/${user?.id}`} style={linkStyle}>Bookings</Link>
              </li>
              <li style={liStyle}><Link to="/profile" style={linkStyle}>Profile</Link></li>
              <li style={liStyle}><Logout /></li>
            </>
          ) : (
            <>
              <li style={liStyle}><Link to="/login" style={linkStyle}>Login</Link></li>
              <li style={liStyle}><Link to="/signup" style={linkStyle}>Sign Up</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
