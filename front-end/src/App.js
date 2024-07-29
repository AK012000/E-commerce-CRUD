import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Componenets/Navbar";
import Footer from "./Componenets/Footer";
import SignUp from "./Componenets/SignUp";
import PrivateComponent from "./Componenets/PrivateComponent";
import Login from "./Componenets/Login";
import AddProduct from "./Componenets/AddProduct";
import ProductList from "./Componenets/ProductList";
import UpdateProduct from "./Componenets/UpdateProduct";

function App() {
  return (
    <>
      <BrowserRouter> 
        <Navbar />
        <Routes>
          <Route  element={<PrivateComponent />}>
            <Route path="/" element={<ProductList/>} />
            <Route path="add" element={<AddProduct />} />
            <Route path="update/:id" element={<UpdateProduct />} />
            <Route path="logout" element={<h1>logout component</h1>} />
            <Route path="profile" element={<h1>profile component</h1>} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
