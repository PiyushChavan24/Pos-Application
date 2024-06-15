/** @format */

// import "antd/dist/antd.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Item from "./pages/Item";
function App() {
 return (
  <div className="App">
   <BrowserRouter>
    <Routes>
     <Route path="/home" element={<Homepage />} />
     <Route path="/items" element={<Item />} />
    </Routes>
   </BrowserRouter>
  </div>
 );
}

export default App;
