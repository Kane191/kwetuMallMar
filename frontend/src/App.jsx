import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/users/Home";
import Login from "./pages/users/auth/Login";
import MyAccount from "./pages/users/MyAccount";
import Register from "./pages/users/auth/Register";
import CartDetails from "./pages/users/CartDetails";
import ProductDetails from "./pages/users/ProductDetails";

import Users from "./pages/admin/Users";
import Admins from "./pages/admin/Admins";
import AdminHome from "./pages/admin/Home";
import Products from "./pages/admin/Products";
import Categories from "./pages/admin/Categories";
import AdminLogin from "./pages/admin/auth/Login";
import MyAdminAccount from "./pages/admin/MyAccount";
import AdminRegister from "./pages/admin/auth/Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* user */}
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/cart" element={<CartDetails/>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/account" element={<MyAccount/>}/>
          <Route exact path="/details/:id" element={<ProductDetails/>}/>
          
          {/* admin */}
          <Route exact path="/admin" element={<AdminHome/>}/>
          <Route exact path="/admin/users" element={<Users/>}/>
          <Route exact path="/admin/admins" element={<Admins/>}/>
          <Route exact path="/admin/login" element={<AdminLogin/>}/>
          <Route exact path="/admin/products" element={<Products/>}/>
          <Route exact path="/admin/categories" element={<Categories/>}/>
          <Route exact path="/admin/account" element={<MyAdminAccount/>}/>
          <Route exact path="/admin/register" element={<AdminRegister/>}/>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App