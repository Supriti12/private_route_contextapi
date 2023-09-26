import React, { useEffect, useMemo, useState } from 'react';
import { Vortex } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { ProductFetch } from '../Redux/Slice/ProductSlice';
import './Products.css';
import ReactPaginate from 'react-paginate';

const Products = () => {
  const { prod } = useSelector(state => state?.ProductSlice);
  const [visible, setVisible] = useState(0);
  const [showMore, setShowMore] = useState({ status: false, index: 0 });
  const [statusLoaders, setstatusLoaders] = useState([]);
  // const [totaldata, setTotaldata] = useState(20);
  const limit = 3;
  let pages = Math.ceil(prod.length / 3);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ProductFetch());
    setstatusLoaders(prod?.map(() => ({ loader: false })));
  }, [dispatch]);
  console.log(prod);

  const handleChange = e => {
    console.log('pagination', e);
    let currentPage = e.selected + 1;
    let index = (currentPage - 1) * limit;
    setVisible(index);
  };
  
  const handleShowMore = (event, index) => {
    setstatusLoaders(state => {
      console.log("state", state);
      if (state[index].loader) {
        state[index].loader = false;
      } else {
        state[index].loader = true;
      }

      return state;
    });
  };

  console.log('status', statusLoaders);


  const renderContent = (item, index) =>
    useMemo(() => {
      return;
    }, [statusLoaders]);

  return (
    <div className="containerParent">
      <div className="rowItem">
        <div className="cards">
          {prod?.slice(visible, visible + limit)?.map((item, k) => {
            return (
              <div class="cardItem" key={k}>
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
                  {statusLoaders[k]?.loader ? <>{item.description}</> : <>{item.description.slice(0, 10) + '...'}</>}
                  <button
                    className="button"
                    onClick={(event) => {
                      handleShowMore(event, k);
                    }}
                  >
                    {statusLoaders[k]?.loader ? '...Show less' : 'Show more...'}
                  </button>
                  {/* <p>{item.description}</p> */}
                </div>
              </div>
            );
          })}

          {/* {showMore ? (
            <>{prod.description}</>
          ) : (
            <>
              {prod.description}`${prod.description.slice(0, 20)}`
            </>
          )}
          <button className="btn" onClick={() => setShowMore(!showMore)}>
            {showMore ? 'Show more' : 'Show less'}
          </button> */}
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
        <div style={{ marginLeft: '30rem' }}>
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
    </div>
  );
};

export default Products;
