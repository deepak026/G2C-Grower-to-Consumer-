import React from 'react'
import NavB from '../NavBar/NavB'
import ManageProducts from '../Manage_Products/ManageProducts'
import OurServices from '../Our_services/OurServices'
import ImgCarousel from '../ImgCarousel/ImgCarousel'
import Contributer from '../Contributer/Contributer'
import ContactUs from '../ContactUs/ContactUs'

function HomePage() {
  return (
    <>
      <NavB />
      <ImgCarousel/>
      <OurServices/>
      <Contributer/>
      <ContactUs />
      {/* <ManageProducts /> */}
    </>
  )
}

export default HomePage