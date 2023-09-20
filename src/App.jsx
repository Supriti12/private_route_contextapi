import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Login from './Pages/Login';
import Home from './Pages/Home';
import CheckAuth from './CheckAuth';
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route element={<CheckAuth />}>
            <Route index path="/" element={<h1>Home</h1>} />
          </Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
