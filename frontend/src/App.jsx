import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/users/Home';
import Categories from './pages/admin/Categories';
import Products from "./pages/admin/Products";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          
          {/* admin */}
          <Route exact path="/admin/categories" element={<Categories/>}/>
          <Route exact path="/admin/products" element={<Products/>}/>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
