import React from 'react'
import NavB from '../NavBar/NavB'
import ManageProducts from '../Manage_Products/ManageProducts'
import ImgCarousel from '../ImgCarousel/ImgCarousel'
import Contributer from '../Contributer/Contributer'
import ContactUs from '../ContactUs/ContactUs'
import DiscoverPlatform from '../Discover_Platform/DiscoverPlatform'

function HomePage() {
  return (
    <>
      <NavB />
      <ImgCarousel/>
      <DiscoverPlatform />
      <Contributer/>
      <ContactUs />
      {/* <ManageProducts /> */}
    </>
  )
}

export default HomePage