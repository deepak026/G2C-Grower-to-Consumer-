import React from 'react'

function Temp() {
  return (
    <div>Temp</div>
  )
}

export default Temp

// //TODO:
// /* 1. Add a way to logout the user */
// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';
// import { useState } from 'react';
// import "./style/NavBStyle.css"
// import LoginModal from './LoginModal';
// import SignUpModal from './SignUpModal';
// import { Link } from 'react-router-dom';
// import {Routes, Route } from 'react-router-dom';
// import ContactUs from '../ContactUs/ContactUs';
// import AboutMe from '../AboutMe/AboutMe';

// export default function NavigationBar() {
//   const [showLogin, setShowLogin] = useState(false);
//   const handleCloseLogin = () => setShowLogin(false);
//   const handleShowLogin = () => setShowLogin(true);
  
//   return (
//       <div className="navBackground">
//         <Navbar bg="dark" variant="dark" expand="lg">
//           <Container>
//             <Navbar.Brand as={Link} to="/home">
//               Home
//             </Navbar.Brand>
//             <Navbar.Toggle aria-controls="navbar-nav" />
//             <Navbar.Collapse id="navbar-nav">
//               <button type="button" class="btn btn-primary mx-3 my-2" onClick={handleShowLogin}>Log In</button>
//                 <button type="button" class="btn btn-primary mx-2 my-3" onClick={handleShowLogin}>Log In</button>
//                 <Navbar.Text>
//                     <SearchBar/>
//                 </Navbar.Text>
//               <Navbar.Nav me-auto>
//                 <Route path='/login' element={<Button onClick={handleShowLogin}>Log In</Button>}></Route>
//                 <Route path='/signup' element={<SignUpModal show={showLogin} onHide={handleCloseLogin}/>}></Route>
//               </Navbar.Nav>
//               </Navbar.Collapse>
//         </Container>
//         <LoginModal show={showLogin} onHide={handleCloseLogin}/>
//         </Navbar>
        
//         <Container fluid>
//           <Routes>
//             <Route path="aboutme" element={<AboutMe />} />
//             <Route path="contactus" element={<ContactUs />} />
//           </Routes>
//         </Container>
//       </div>
//   )
// }

