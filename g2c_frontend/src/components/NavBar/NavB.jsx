import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';
import "./style/NavBStyle.css"
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import { Link } from 'react-router-dom';
import {Routes, Route } from 'react-router-dom';
import ContactUs from '../ContactUs/ContactUs';
import AboutMe from '../AboutMe/AboutMe';

function NavB() {

  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <div>
      <div>
        <Navbar className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="/">G2C(Grower 2 Cosumer)</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Link to="/contactUs">Contact Us</Link>
              <Link to="/aboutMe">About Me</Link>
              <button className="btn" onClick={()=>setShowSignUp(true)}>Sign-up</button>
              <button className="btn" onClick={()=>setShowLogin(true)}>Login</button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {showSignUp && <SignUpModal onClose={()=>setShowSignUp(false)}/>}
        {showLogin && <LoginModal onClose={()=>setShowLogin(false)}/>}
      </div>
      
    </div>
    

  );
}

export default NavB;