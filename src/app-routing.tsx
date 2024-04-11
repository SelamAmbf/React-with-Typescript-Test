import React from 'react';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import StoreView from "./components/Store/View";
import ProductView from "./components/Product/View"
const AppRoute: React.FC = () => {
    return (
            <Routes>
              <Route path="/viewProduct" element={<ProductView />} />
              <Route path="/" element={<StoreView />} />
            </Routes>
    );
  }
  
  export default AppRoute;