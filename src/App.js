import { BrowserRouter as Routers, Routes, Route } from "react-router-dom";
import AdminLogin from "./Components/Administrator2/AdminLogin";
import Dashboard from "./Components/Administrator2/Dashboard";
import Home from "./Components/UserInterface/Screen/Home";
import ProductsList from "./Components/UserInterface/Screen/ProductsList";
import Product from "./Components/UserInterface/Screen/Product";
import MyCart from "./Components/UserInterface/Screen/MyCart";
import HomeSubCategory from "./Components/UserInterface/Screen/HomeSubCategory";
import Login from "./Components/UserInterface/UserComponents/Login";

import GoogleMap from "./Components/UserInterface/UserComponents/GoogleMap";
import MakePayment from "./Components/UserInterface/Screen/MakePayment";

function App() {
  return (
    <div >
      <Routers>
        <Routes>          
          <Route element={<AdminLogin/>} path="adminlogin" />
          <Route element={<Dashboard/>} path="dashboard/*" />
          <Route element={<Home/>} path="home" />
          <Route element={<HomeSubCategory/>} path="homesubcategory" />
          <Route element={<ProductsList/>} path="productslist" />
          <Route element={<Product/>} path="product" />
          <Route element={<MyCart/>} path="mycart" />
          <Route element={<Login/>} path="login" />

          <Route element={<GoogleMap/>} path="googlemap" />
          <Route element={<MakePayment/>} path="makepayment" />

        </Routes>
      </Routers>
      
    </div>
  );
}

export default App;
