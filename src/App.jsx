import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Login from './Pages/Login';
import Home from './Pages/Home';
import CheckAuth from './CheckAuth';
import { useEffect } from 'react';
import { check_token } from './Redux/Slice/LoginSlice';
import Products from './Pages/Products';
import DetailsForm from './Pages/DetailsForm';
import StudentDetails from './Pages/StudentDetails';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetails from './Pages/ProductDetails';
import Contact from './Pages/Contact';

function App() {
  useEffect(() => {
    check_token();
  }, []);
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<CheckAuth />}>
            <Route element={<Navbar />}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/detailsform" element={<DetailsForm />} />
              <Route path="/display" element={<StudentDetails />} />
              <Route path='/productdetails/:id' element={<ProductDetails/>}/>
              <Route path='/contact' element={<Contact/>}/>
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
