import React from 'react';
import HomePage from './components/Home_page/HomePage';
import AboutMe from './components/AboutMe/AboutMe';
import ContactUs from './components/ContactUs/ContactUs';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import DashboardGrower from './components/dashboard_grower/DashboardGrower';
import ProfileGrower from './components/Profile-grower/ProfileGrower';
import List_products from './components/List_Products/List_products';
import ManageProducts from './components/Manage_Products/ManageProducts';
import DashboardConsumer from './components/dashboard_consumer/DashboardConsumer';
import FindGrower from './components/Find_Grower/FindGrower';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: "/aboutMe",
      element: <AboutMe />
    },
    {
      path: "/contactUs",
      element: <ContactUs />
    },
    {
      path:"/grower/:email",
      element:<DashboardGrower />
    },
    {
      path:"/growerProfile/:email",
      element:<ProfileGrower />
    },
    {
      path:"/listProducts/:email",
      element:<List_products />
    },
    {
      path:"/manageProducts/:email",
      element:<ManageProducts />
    },
    {
      path:"/consumer/:email",
      element:<DashboardConsumer />
    },
    {
      path:"/findGrower/:email",
      element:<FindGrower />
    },
    
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
