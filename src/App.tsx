import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { NavBar } from "../src/components/index";
import { Home, Login, Register, Cart, UserProfile, Sell, ProductDetail, Orders } from "../src/pages/index";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </Router>
  );
}

export default App;