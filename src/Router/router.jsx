import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/User/Home";
import About from "../pages/User/About";
import Cart from "../pages/User/Cart";
import Contact from "../pages/User/Contact";
import OrderDetails from "../../src/pages/User/OrderDetails";

import Signup from "../pages/shared/Signup";

import UserLayout from "../layout/UserLayout";
import ErrorPage from "../pages/shared/ErrorPage";

import LoginPage from "../pages/shared/Login";
import CheckoutPage from "../pages/User/CheckoutPage/CheckoutPage";
import { ProtectedRoute } from "./ProtectedRoute";
import ProfilePage from "../pages/User/Profile/Profile";
import Invoice from "../pages/User/CheckoutPage/Invoice";
import ItemDetails from "../pages/ItemDetails";
import Pickles from "../pages/Pickles";
import TermsAndConditions from "../pages/User/termsAndCondition/TermsAndConditions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "loginPage",
        element: <LoginPage  />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "item-Details/:id",
        element: <ItemDetails />,
      },
      {
        path: "pickles",
        element: <Pickles />,
      },

      
      {
        element:<ProtectedRoute />,
        path:"/",
        children:[
          {
            path: "cart",
            element: <Cart />,
          },
          {
            path: "order",
            element: <OrderDetails />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
          },
          {
            path: "contact",
            element: <Contact />,
          },
          {
            path:"checkout",
            element:<CheckoutPage />
          },
          {
            path:"checkout/invoice/:orderId",
            element:<Invoice />
          },
          
         
        ]
      }
    ],
  },
 
  
]);

export default router;
