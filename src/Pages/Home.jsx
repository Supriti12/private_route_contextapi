import React, { useEffect, useState } from 'react';
import { get } from '../utils/HttpClient';

const Home = () => {
  const [data, setdata] = useState([]);
  const AdminView = async () => {
    let path = 'v1/admin/viewProfile';
    let res = await get(path);
    if (res.status) {
      // return res?.data;
      setdata(res?.data);
      console.log(res.data);
    }
  };
  useEffect(() => {
    AdminView();
  }, []);
  return (
    <div>
      <h6>Home Page</h6>
      {/* <div className="container">
        <div className="row">
          {data?.map((user, k) => {
            return (
              <>
                <h4>
                  {user.firstName} {user.lastName}
                </h4>
                <h4>{user.email}</h4>
              </>
            );
          })}
        </div>
      </div> */}
      {data?.map((user, k) => {
        return (
          <>
            <div class="card" style={{ width: '18rem' }}>
              {/* <img src="..." class="card-img-top" alt="..." /> */}
              <div class="card-body">
                <h5 class="card-title">
                  {user.firstName} {user.lastName}
                </h5>
                <p class="card-text">{user.email}</p>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Home;
