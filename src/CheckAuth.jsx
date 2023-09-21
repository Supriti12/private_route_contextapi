import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from './Context/UserProvider';
import { useSelector } from 'react-redux';

function CheckAuth() {
  // const { loginStatus } = useAuth();
  const { LogoutToggle } = useSelector(state => state?.login);
  return LogoutToggle ? <Outlet /> : <Navigate to={'/login'} />;
  // return loginStatus ? <Outlet /> : <Navigate to={'/login'} />;
}

export default CheckAuth;
