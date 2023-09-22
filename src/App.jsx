import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Login from './Pages/Login';
import Home from './Pages/Home';
import CheckAuth from './CheckAuth';
import { useEffect } from 'react';
import { check_token } from './Redux/Slice/LoginSlice';
import Products from './Pages/Products';
function App() {
  useEffect(() => {
    check_token();
  }, []);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<CheckAuth />}>
            <Route element={<Navbar />}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
