import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/users/Home';
import Login from "./pages/users/auth/Login";
import Register from "./pages/users/auth/Register";
import CartDetails from "./pages/users/CartDetails";
import ProductDetails from "./pages/users/ProductDetails";
import Users from "./pages/admin/Users";
import AdminHome from "./pages/admin/Home";
import Products from "./pages/admin/Products";
import Categories from './pages/admin/Categories';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* user */}
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/details/:id" element={<ProductDetails/>}/>
          <Route exact path="/cart" element={<CartDetails/>}/>
          
          {/* admin */}
          <Route exact path="/admin" element={<AdminHome/>}/>
          <Route exact path="/admin/users" element={<Users/>}/>
          <Route exact path="/admin/products" element={<Products/>}/>
          <Route exact path="/admin/categories" element={<Categories/>}/>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App