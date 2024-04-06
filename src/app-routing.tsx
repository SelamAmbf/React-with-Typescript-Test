import React from 'react';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import StoreView from "./components/Store/View";

const AppRoute: React.FC = () => {
    return (
            <Routes>
              <Route path="/" element={<StoreView />} />
            </Routes>
    );
  }
  
  export default AppRoute;