import React from 'react';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Store from "./components/Store/Create";

const AppRoute: React.FC = () => {
    return (
            <Routes>
              <Route path="/" element={<Store />} />
            </Routes>
    );
  }
  
  export default AppRoute;