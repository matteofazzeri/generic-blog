import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authcontext.js";
import Logo from "../img/logo.png";
import Hamburger from 'hamburger-react'


const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  const [isOpen, setOpen] = useState(false)

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <a href={`/`}>
            <img src={Logo} alt="logo" />
          </a>
        </div>

        <div className="hamburger">
          <Hamburger
            toggled={isOpen}
            toggle={setOpen}
            duration={0.5}
            color="#b9e7e7"
            onToggle={toggled => {
              if (toggled) {
                console.log("sidebar opened")
              } else {
                console.log("sidebar closed")
              }
            }}
            label="Show menu"
            hideOutline={false}
          />
        </div>

        <div className="links">
          <Link className="link" to="/?cat=art">
            <h6>ART</h6>
          </Link>
          <Link className="link" to="/?cat=science">
            <h6>SCIENCE</h6>
          </Link>
          <Link className="link" to="/?cat=technology">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className="link" to="/?cat=cinema">
            <h6>CINEMA</h6>
          </Link>
          <Link className="link" to="/?cat=design">
            <h6>DESIGN</h6>
          </Link>
          <Link className="link" to="/?cat=food">
            <h6>FOOD</h6>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <a href="/login">Login</a>
          )}
          {currentUser && currentUser.role.includes('admin') && <span className="write">
            <a className="link" href="/write" >
              Write
            </a>
          </span>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
