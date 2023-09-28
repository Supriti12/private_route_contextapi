import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
// import { useAuth } from '../Context/UserProvider';
import { useDispatch, useSelector } from 'react-redux';
import { loginStatus } from '../Redux/Slice/LoginSlice';
import LoginApi from '../Services/Auth';
import { get, post, put } from '../utils/HttpClient';
import './Login.css';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const initialValue = {
  email: '',
  password: '',
};
export const Login = () => {
  const { redirectTo } = useSelector(state => state?.LoginSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(initialValue);
  const [error, setError] = useState({});
  // const { setloginStatus } = useAuth();

  const validation = () => {
    let error = {};
    if (!user.email) {
      setError({ ...error, email: '@email is required' });
      return false;
    } else if (
      !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        user.email
      )
    ) {
      setError({ ...error, email: '@enter valid Email' });
      return false;
    }

    if (!user.password) {
      setError({ ...error, password: '@password is required' });
      return false;
    } else if (user.password.length < 3) {
      setError({ ...error, password: '@enter more than 3 digit password' });
      return false;
    }
    return true;
  };

  let name, value;
  const postUserData = e => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const submitInfo = async e => {
    e.preventDefault();
    let ErrorList = validation();

    if (!validation()) {
      return;
    }
    setError(ErrorList);
    let logindata = {
      email: user.email,
      password: user.password,
    };

    try {
      let path = 'v1/admin/login';

      let res = await post(path, logindata);
      console.log('hhhh', res);
      if (res.status) {
        localStorage.setItem('token', res?.data?.token);
        dispatch(loginStatus());
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
    // setloginStatus(true);
    // navigate('/');
  };

  // const redirectUser = () => {
  //   const token = JSON.parse(localStorage.getItem('token'));
  //   if (token !== null && token !== undefined && token !== '') {
  //     navigate('/');
  //   }
  // };
  // useEffect(() => {
  //   redirectUser();
  // }, [redirectTo]);

  // useEffect(() => {
  //   dispatch(loginStatus());
  // }, [dispatch]);

   const [inputType, setInputType] = useState('password');
   const [showHidebtnText, setShowHideBtnText] = useState(true);

   const toggleInput = () => {
     setInputType(inputType == 'password' ? 'text' : 'password');
    //  setShowHideBtnText(showHidebtnText ? <AiFillEyeInvisible /> : <AiFillEye />);

   };
  return (
    <div>
      <div style={{ marginLeft: '20rem', width: '100%', height: '100vh' }}>
        {/* <div className="col-md-6 p-5 "> */}
        <div className="login-container">
          <div className="login-card" style={{ margin: 'auto' }}>
            <div className="login-card-header">
              <h4>Login Form</h4>{' '}
            </div>
            <div className="login-card-body">
              <form onSubmit={e => submitInfo(e)}>
                <div className="login-form-group">
                  <label htmlFor="exampleInputEmail1" style={{ color: 'white', fontFamily: 'arial', fontSize: '18px' }}>
                    Email
                  </label>
                  <input
                    type="login-text"
                    name="email"
                    className="form-control"
                    onChange={e => postUserData(e)}
                    placeholder="Enter your email"
                  />
                  <span style={{ color: 'yellow' }}>{error.email}</span>
                </div>

                <div className="fieldset">
                  <label className="passwod" htmlFor="exampleInputEmail1">
                    Password
                  </label>

                  <span >
                    <div className="password-input">
                      <input
                        className="form-control"
                        type={inputType}
                        placeholder="Enter your password"
                        name="password"
                        onChange={e => postUserData(e)}
                      />
                      <div className="icon" type="button" style={{ color: 'black' }}>
                        {showHidebtnText ? (
                          <AiFillEyeInvisible
                            onClick={() => {
                              setShowHideBtnText(false), toggleInput();
                            }}
                          />
                        ) : (
                          <AiFillEye
                            onClick={() => {
                              setShowHideBtnText(true), toggleInput();
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </span>
                </div>

                <span style={{ color: 'yellow' }}>{error.password}</span>
                <div className="login-button-group">
                  <button type="submit" className="button">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
