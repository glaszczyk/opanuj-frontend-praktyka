import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import SidebarProvider from './contexts/SidebarContext.tsx';

import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';

import Header from './components/Header';
import Sidebar from './components/Sidebar';

const App = () => {
  return (
    <SidebarProvider>
    <div className="overflow-hidden">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/product/:id" element={<ProductDetails />}></Route>
        </Routes>
        <Sidebar />
      </Router>
    </div></SidebarProvider>
  );
};

export default App;
