import React, { useEffect, useState } from 'react';
import { Vortex } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { ProductFetch } from '../Redux/Slice/ProductSlice';
import './Products.css';
import ReactPaginate from 'react-paginate';

const Products = () => {
  const { prod } = useSelector(state => state.ProductSlice);
  const [visible, setVisible] = useState(0);
  // const [totaldata, setTotaldata] = useState(20);
  const limit = 3;
  let pages = Math.ceil(prod.length / 3);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ProductFetch());
  }, [dispatch]);
  console.log(prod);

  const handleChange = e => {
    // console.log('pagination', e);
    let currentPage = e.selected + 1;
    let index = (currentPage - 1) * limit;
    setVisible(index);
  };
  return (
    <div className="containerParent">
      <div className="rowItem">
        <div className="cards">
          {prod?.slice(visible, visible + limit)?.map((item, k) => {
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
        {/* {totaldata !== visible ? (
          <div className="vortex">
            <span style={{ marginLeft: '120px' }} onClick={showMore}>
              {' '}
              <Vortex
                visible={true}
                height="65"
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
        )} */}
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handleChange}
          Displayed
          Page
          Range={5}
          pageCount={pages}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          containerClassName={'pagination'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          activeClassName={'active'}
        />
      </div>
    </div>
  );
};

export default Products;
