import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ContactUs from '../ContactUs/ContactUs'
import AboutMe from '../AboutMe/AboutMe'
import NavB from '../NavBar/NavB'

function RouteContact() {
  return (
    <BrowserRouter>
      <Routes>
         {/* <Route path="" element={<NavB />} /> */}
         <Route path="/contactUs" element={<ContactUs />} />
         <Route path="/aboutMe" element={<AboutMe />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RouteContact