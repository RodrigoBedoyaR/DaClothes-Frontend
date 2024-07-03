import React, { useState, useEffect } from "react";
import "./App.css";
import ProductsList from "./components/ProductsList";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import PostProductForm from "./components/PostProductForm";
import AppHeader from "./components/Navbar";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import ProductInfo from "./components/ProductInfo";
import UserDetails from "./pages/UserDetails";
import UpdateProductForm from "./pages/UpdateProduct";
import UpdateUser from "./pages/UpdateUser";
import TokenManager from "./apiService/TokenManager";
import ProtectedView from "./components/ProtectedView";
import Inaccessible from "./pages/Inaccessible";
import { Navigate, Outlet } from "react-router-dom";
import { useSessionStorageState } from 'ahooks';
import ChatRoom from "./components/ChatRoom";
import Chatting from "./components/Chatting";
import OrderDetails from "./pages/OrderDetails";

function App() {
  const [claims, setToken] = useSessionStorageState('claims');
  const loginForm = <LogIn onLogin={(claimsNew) => setToken(claimsNew)} />;  

  const ProtectedRoute = ({
    isAllowed,
    redirectPath = "/inaccessible",
    children,
  }) => {
    if (!isAllowed) {
      return <Navigate to={redirectPath} replace />;
    }
    return children ? children : <Outlet />;
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={loginForm} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute isAllowed={!!claims} />}>
            <Route path="/postProduct" element={<PostProductForm />} />
            <Route path="/products" element={<ProductsList />} />
            <Route path="/product/:id" element={<ProductInfo />} />
            <Route path="/userDetails" element={<UserDetails />} />
            <Route path="/updateProduct/:id" element={<UpdateProductForm />} />
            <Route path="/updateUser" element={<UpdateUser />} />
            <Route path="/messages" element={<Chatting />} />
            <Route path="/order/:id" element={<OrderDetails />} />
          </Route>
          <Route path="/inaccessible" element={<Inaccessible />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
