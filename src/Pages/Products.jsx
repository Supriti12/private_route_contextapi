import React, { useEffect, useState } from 'react';
import { Vortex } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { ProductFetch } from '../Redux/Slice/ProductSlice';
import './Products.css';

const Products = () => {
  const { prod } = useSelector(state => state.ProductSlice);
  const [visible, setVisible] = useState(4);
  const [totaldata, setTotaldata] = useState(20);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ProductFetch());
  }, [dispatch]);
  console.log(prod);

  const showMore = () => {
    setVisible(prevValue => prevValue + 4);
  };
  return (
    <div className="containerParent">
      <div className="rowItem">
        <div className="cards">
          {prod?.slice(0, visible)?.map((item, k) => {
            return (
              <>
                <div class="cardItem">
                  <div className="cardImage">
                    <img src={item.image} alt="Avatar" style={{ width: '100%', height: '100%' }} />
                  </div>
                  <div class="containerItem">
                    <h4>
                      <b>{item.title}</b>
                    </h4>
                    <h6>
                      <b>{item.category}</b>
                    </h6>
                    <p>{item.description}</p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        {totaldata !== visible ? (
          <div className="vortex">
            <span style={{ marginLeft: '120px' }} onClick={showMore}>
              {' '}
              <Vortex
                visible={true}
                height="50"
                width="600"
                ariaLabel="vortex-loading"
                align="center"
                wrapperStyle={{}}
                wrapperclassName="vortex-wrapper"
                colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
              />
            </span>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Products;
