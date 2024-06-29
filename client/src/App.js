/** @format */

// import "antd/dist/antd.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Item from "./pages/Item";
import CartPage from "./pages/CartPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
function App() {
 return (
  <div className="App">
   <BrowserRouter>
    <Routes>
     <Route path="/home" element={<Homepage />} />
     <Route path="/items" element={<Item />} />
     <Route path="/cart" element={<CartPage />} />
     <Route path="/register" element={<Register />} />
     <Route path="/login" element={<Login />} />
    </Routes>
   </BrowserRouter>
  </div>
 );
}

export default App;
